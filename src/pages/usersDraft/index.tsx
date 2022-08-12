import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";
import ConfirmationModal from "../../components/confirmationModal";

import Header from "../../components/header";
import { api } from "../../utils/axios";
import { decodeToken } from "../../utils/decodeToken";
import { prisma } from "../../utils/prisma";

type Props = {
  users: User[];
};

const ListUsersPage: NextPage<Props> = ({ users }: Props) => {
  const [filterUsers, setFilterUsers] = useState(users);
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleDeleteUser = (id: number) => {
    setIsLoading(true);
    const data = {
      id,
    };

    api
      .post("/api/usersDraft/delete", data)
      .then(() => {
        setFilterUsers((oldState) => oldState.filter((user) => user.id !== id));
      })
      .catch(() =>
        toast({
          title: "Falha ao deletar usuario",
          description: "Falha ao deletar usuario",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCreateUsers = () => {
    setIsLoading(true);

    api
      .post("/api/users/create", {})
      .then(() => {
        router.push("/users");
      })
      .catch(() =>
        toast({
          title: "Falha ao incluir usuarios",
          description: "Falha ao incluir usuarios",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Header />
      <Center minH="100vh" paddingTop="100px" alignItems="flex-start">
        <Box
          background="white"
          minW={{ base: "90%", md: "750px", lg: "950px" }}
          justifyContent="center"
          justifyItems="center"
        >
          <Flex>
            <Heading as="h3" size="lg" marginBottom={6} p={4}>
              Inclusão de Beneficiario
            </Heading>
            <Spacer />
            <Box p="4">
              <ConfirmationModal
                buttonColor="orange"
                mr={4}
                buttonText="Enviar lista para inclusão"
                message="Deseja enviar beneficiarios para inclusão?"
                onClick={handleCreateUsers}
              />
              <Button
                type="button"
                colorScheme="teal"
                size="sm"
                onClick={() => router.push("/usersDraft/create")}
              >
                Incluir novo usuário
              </Button>
            </Box>
          </Flex>
          <TableContainer>
            <Table variant="simple" size="lg">
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>Matricula</Th>
                  <Th>Data Cadastro</Th>
                  <Th>Titular</Th>
                  <Th>Nome Tiular</Th>
                  <Th>Documentacao</Th>
                  <Th>Ação</Th>
                </Tr>
              </Thead>

              <Tbody>
                {filterUsers.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.nome}</Td>
                    <Td>{user.matricula}</Td>
                    <Td>{user.createdAt.toString()}</Td>
                    <Td>{user.titular}</Td>
                    <Td>{user.nomeTitular}</Td>
                    <Td>{user.cpf}</Td>
                    <Td>
                      <Flex>
                        <Box marginRight="4">
                          <Button
                            colorScheme="blue"
                            size="xs"
                            isLoading={loading}
                            onClick={() =>
                              router.push(`/usersDraft/${user.id}`)
                            }
                          >
                            Editar
                          </Button>
                        </Box>
                        <Box>
                          <ConfirmationModal
                            buttonColor="red"
                            mr={4}
                            size="xs"
                            buttonText="Excluir"
                            message="Deseja excluir beneficiario da lista de inclusão?"
                            isLoading={loading}
                            onClick={() => handleDeleteUser(user.id)}
                          />
                        </Box>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Center>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ["nextauth.token"]: token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const company = decodeToken({ authorization: token });

  let users = await prisma.userDraft.findMany({
    where: {
      companyId: company.id,
    },
  });

  users = users.map((user) => ({
    ...user,
  }));

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
};

export default ListUsersPage;

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
  const [isLoading, setIsLoading] = useState(false);
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
      .catch(() => {
        setIsLoading(false);
        toast({
          title: "Falha ao deletar usuario",
          description: "Falha ao deletar usuario",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleCreateUsers = () => {
    setIsLoading(true);

    api
      .post("/api/users/create", {})
      .then(() => {
        router.push("/users");
      })
      .catch(() => {
        setIsLoading(false);
        toast({
          title: "Falha ao incluir usuarios",
          description: "Falha ao incluir usuarios",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
                  <Th>Categoria</Th>
                  <Th>Nome Titular</Th>
                  <Th>Documentacao</Th>
                  <Th>Ação</Th>
                </Tr>
              </Thead>

              <Tbody>
                {filterUsers.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.nome}</Td>
                    <Td>{user.matricula}</Td>
                    <Td>
                      {new Date(user.createdAt).toLocaleDateString("pt-br")}
                    </Td>
                    <Td>{user.titular === "B" ? "Titular" : "Dependente"}</Td>
                    <Td>{user.nomeTitular}</Td>
                    <Td>{user.cpf}</Td>
                    <Td>
                      <Flex>
                        <Box marginRight="4">
                          <Button
                            colorScheme="blue"
                            size="xs"
                            isLoading={isLoading}
                            onClick={() => {
                              setIsLoading(true);
                              router.push(`/usersDraft/${user.id}`);
                            }}
                          >
                            Editar
                          </Button>
                        </Box>
                        <Box>
                          <ConfirmationModal
                            buttonColor="red"
                            mr={4}
                            size="xs"
                            buttonText="Remover"
                            message="Deseja Remover beneficiario da lista de inclusão?"
                            isLoading={isLoading}
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
    distinct: ["cpf"],
  });

  return {
    props: {
      users,
    },
  };
};

export default ListUsersPage;

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
import updateStatus from "../../utils/updateStatus";

type Props = {
  users: User[];
  canceledeUsers: User[];
};

const ListUsersPage: NextPage<Props> = ({ users, canceledeUsers }: Props) => {
  const router = useRouter();
  const toast = useToast();

  const [filterUsers, setFilterUsers] = useState(users);
  const [filterCanceldeUsers, setFilterCanceldeUsers] =
    useState(canceledeUsers);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteUser = (id: number) => {
    setIsLoading(true);
    const data = {
      id,
    };

    api
      .post("/api/users/delete", data)
      .then(() => {
        setFilterUsers((oldState) =>
          oldState.map((user) => {
            if (user.id == id) {
              return {
                ...user,
                status: "SE",
              };
            }
            return user;
          })
        );
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

  const parseDate = (date: string) => {
    if (new Date(date).toString() == "Invalid Date") {
      const splitedDate = date.split("/");
      const newDate = `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`;
      return new Date(newDate).toLocaleDateString("pt-br");
    }
    return new Date(date).toLocaleDateString("pt-br");
  };

  const handleActiveUser = (id: number) => {
    setIsLoading(true);
    const data = {
      id,
    };

    api
      .post("/api/users/active", data)
      .then(() => {
        setFilterCanceldeUsers((oldState) =>
          oldState.map((user) => {
            if (user.id == id) {
              return {
                ...user,
                status: "SR",
              };
            }
            return user;
          })
        );
      })
      .catch(() =>
        toast({
          title: "Falha ao ativar usuario",
          description: "Falha ao ativar usuario",
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
      <Center
        minH="100vh"
        paddingTop="100px"
        display="flex"
        flexDirection="column"
        maxW={{ base: "90%" }}
        justifyContent="flex-start"
        margin="auto"
      >
        <Box
          background="white"
          marginBottom={5}
          justifyContent="center"
          justifyItems="center"
          width="100%"
        >
          <Flex>
            <Heading as="h3" size="lg" marginBottom={6} p={4}>
              Beneficiários incluídos
            </Heading>
            <Spacer />
          </Flex>
          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Status</Th>
                  <Th>Nome</Th>
                  <Th>Matrícula</Th>
                  <Th>Data Cadastro</Th>
                  <Th>Categoria</Th>
                  <Th>Documentação</Th>
                  <Th>Ação</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filterUsers.map((user) => (
                  <Tr key={user.id}>
                    <Td>{updateStatus(user.status)}</Td>
                    <Td>{user.nome}</Td>
                    <Td>{user.matricula}</Td>
                    <Td>{parseDate(user.createdAt)}</Td>
                    <Td>{user.titular === "B" ? "Titular" : "Dependente"}</Td>
                    <Td>{user.cpf}</Td>
                    <Td>
                      <Flex>
                        {user.status !== "SA" && user.status !== "SE" && (
                          <>
                            <Box marginRight="4">
                              <Button
                                colorScheme="blue"
                                size="xs"
                                isLoading={isLoading}
                                onClick={() => {
                                  setIsLoading(true);
                                  router.push(`/users/${user.id}`);
                                }}
                              >
                                Alterar
                              </Button>
                            </Box>
                            <Box>
                              <ConfirmationModal
                                buttonColor="red"
                                mr={4}
                                size="xs"
                                buttonText="Cancelar"
                                message="Deseja CANCELAR beneficiário?"
                                isLoading={isLoading}
                                onClick={() => handleDeleteUser(user.id)}
                              />
                            </Box>
                          </>
                        )}
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          background="white"
          minW={{ base: "90%", md: "750px", lg: "950px" }}
          justifyContent="center"
          justifyItems="center"
          width="100%"
        >
          <Flex>
            <Heading as="h3" size="lg" marginBottom={6} p={4}>
              Beneficiários cancelados
            </Heading>
            <Spacer />
          </Flex>
          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Status</Th>
                  <Th>Nome</Th>
                  <Th>Matrícula</Th>
                  <Th>Data Cadastro</Th>
                  <Th>Categoria</Th>
                  <Th>Documentação</Th>
                  <Th>Ação</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filterCanceldeUsers.map((user) => (
                  <Tr key={user.id}>
                    <Td>{updateStatus(user.status)}</Td>
                    <Td>{user.nome}</Td>
                    <Td>{user.matricula}</Td>
                    <Td>
                      {new Date(user.createdAt).toLocaleDateString("pt-br")}
                    </Td>
                    <Td>{user.titular === "B" ? "Titular" : "Dependente"}</Td>
                    <Td>{user.cpf}</Td>
                    <Td>
                      <Flex>
                        {user.status !== "SR" && (
                          <>
                            <Box>
                              <ConfirmationModal
                                buttonColor="red"
                                mr={4}
                                size="xs"
                                buttonText="Ativar beneficiário"
                                message="Deseja ATIVAR beneficiário?"
                                isLoading={isLoading}
                                onClick={() => handleActiveUser(user.id)}
                              />
                            </Box>
                          </>
                        )}
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

  const users = await prisma.user.findMany({
    where: {
      companyId: company.id,
      AND: [{ status: { not: "E" } }, { status: { not: "SR" } }],
    },
    distinct: ["cpf"],
  });

  const canceledeUsers = await prisma.user.findMany({
    where: {
      companyId: company.id,
      OR: [{ status: { in: "E" } }, { status: { in: "SR" } }],
    },
    distinct: ["cpf"],
  });

  return {
    props: {
      users: users,
      canceledeUsers: canceledeUsers,
    },
  };
};

export default ListUsersPage;

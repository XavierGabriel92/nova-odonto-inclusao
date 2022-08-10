import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import Header from "../../components/header";
import { decodeToken } from "../../utils/decodeToken";
import { prisma } from "../../utils/prisma";

type Props = {
  users: User[];
};

const ListUsersPage: NextPage<Props> = ({ users }: Props) => {
  const router = useRouter();

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
            <Spacer />
            <Box p="4">
              <Button
                type="button"
                colorScheme="teal"
                size="xs"
                onClick={() => router.push("/users/create")}
              >
                Incluir novo usuário
              </Button>
            </Box>
          </Flex>
          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>Matricula</Th>
                  <Th>Data Cadastro</Th>
                  <Th>Dependente</Th>
                  <Th>Documentacao</Th>
                  <Th>Status</Th>
                  <Th>Ação</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.nome}</Td>
                    <Td>{user.matricula}</Td>
                    <Td>{user.createdAt.toString()}</Td>
                    <Td>{user.titular}</Td>
                    <Td>{user.cpf}</Td>
                    <Td>{user.status}</Td>
                    <Td>
                      <Flex>
                        <Box marginRight="4">
                          <Button colorScheme="blue" size="xs">
                            Editar
                          </Button>
                        </Box>
                        <Box>
                          <Button colorScheme="red" size="xs">
                            Excluir
                          </Button>
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

  let users = await prisma.user.findMany({
    where: {
      companyId: company.id,
    },
  });

  users = users.map((user) => ({
    ...user,
    status: user.status === "a" ? "Ativo" : "Inclusão",
  }));

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
};

export default ListUsersPage;

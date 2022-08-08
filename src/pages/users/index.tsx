import {
  Box,
  Center,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect } from "react";

const ListUsersPage: NextPage = () => {
  // useEffect(() => {
  //   fetch("/api/users/create")
  //     .then((res) => res.json())
  //     .then((res) => console.log(res));
  // }, []);

  return (
    <Center marginTop="50px">
      <Box
        background="white"
        minW={{ base: "90%", md: "750px", lg: "950px" }}
        justifyContent="center"
        justifyItems="center"
      >
        <TableContainer>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Titular</Th>
                <Th>Nascimento</Th>
                <Th>Matricula</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td>millimetres (mm)</Td>
                <Td>millimetres (mm)</Td>
                <Td>millimetres (mm)</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Center>
  );
};

export default ListUsersPage;

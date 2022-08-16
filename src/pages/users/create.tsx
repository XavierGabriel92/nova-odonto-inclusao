import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import { api } from "../../utils/axios";

import CreateUserForm from "../../components/createUserForm";
import Header from "../../components/header";
import { clean } from "../../utils/clean";

const CreateUsersPage: NextPage = () => {
  const toast = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch } =
    useForm<Omit<User, "companyId" | "status">>();

  const handleSignIn = (data: Omit<User, "companyId" | "status">) => {
    const filterData = clean(data);
    setLoading(true);

    api
      .post("/api/users/create", filterData)
      .then(() => {
        router.push("/users");
      })
      .catch(() =>
        toast({
          title: "Falha ao criar usuario",
          description: "Falha ao criar usuario",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      )
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Header />
      <Center paddingBottom={6} paddingTop="100px">
        <Box
          background="white"
          maxW={{ base: "90%", md: "750px", lg: "950px" }}
          maxH="100%"
          justifyContent="center"
          justifyItems="center"
          padding={4}
        >
          <Heading as="h3" size="lg" marginBottom={6}>
            Inclusão de Beneficiario
          </Heading>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <CreateUserForm
              register={register}
              loading={loading}
              watch={watch}
            ></CreateUserForm>
            <Flex marginTop={4}>
              <Box>
                <Button
                  type="button"
                  colorScheme="red"
                  size="sm"
                  isLoading={loading}
                  onClick={() => {
                    setLoading(true);
                    router.push("/users");
                  }}
                >
                  Cancelar
                </Button>
              </Box>
              <Spacer />
              <Box>
                <Button
                  type="submit"
                  colorScheme="teal"
                  size="sm"
                  isLoading={loading}
                >
                  Incluir usuário
                </Button>
              </Box>
            </Flex>
          </form>
        </Box>
      </Center>
    </>
  );
};

export default CreateUsersPage;

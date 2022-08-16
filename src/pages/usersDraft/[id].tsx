import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CreateUserForm from "../../components/createUserForm";
import Header from "../../components/header";
import { api } from "../../utils/axios";
import { clean } from "../../utils/clean";
import { decodeToken } from "../../utils/decodeToken";
import { prisma } from "../../utils/prisma";

type Props = {
  user: User;
};

const UpdateUserPage: NextPage<Props> = ({ user }: Props) => {
  const toast = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch } = useForm<
    Omit<User, "companyId" | "status">
  >({
    defaultValues: {
      ...user,
    },
  });

  const handleUpdateUser = (data: Omit<User, "companyId" | "status">) => {
    const filterData = clean(data);
    setLoading(true);

    api
      .post("/api/usersDraft/update", filterData)
      .then(() => {
        toast({
          title: "Usuario alterado com sucesso",
          description: "Usuario alterado com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push("/usersDraft");
      })
      .catch(() =>
        toast({
          title: "Falha ao atualizar usuario",
          description: "Falha ao atualizar usuario",
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
            Editar Beneficiario
          </Heading>
          <form onSubmit={handleSubmit(handleUpdateUser)}>
            <CreateUserForm
              register={register}
              loading={loading}
              watch={watch}
            />
            <Flex marginTop={4}>
              <Box>
                <Button
                  type="button"
                  colorScheme="red"
                  size="sm"
                  isLoading={loading}
                  onClick={() => {
                    setLoading(true);
                    router.push("/usersDraft");
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
                  Alterar usuário
                </Button>
              </Box>
            </Flex>
          </form>
        </Box>
      </Center>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ["nextauth.token"]: token } = parseCookies(context);
  const { id } = context.query;

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const company = decodeToken({ authorization: token });

  let user = await prisma.userDraft.findUniqueOrThrow({
    where: {
      id: Number(id),
    },
  });

  if (user.companyId !== company.id) {
    return {
      redirect: {
        destination: "/usersDraft",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default UpdateUserPage;

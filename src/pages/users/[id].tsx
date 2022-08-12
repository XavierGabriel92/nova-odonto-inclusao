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
import ConfirmationModal from "../../components/confirmationModal";
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

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm<
    Omit<User, "companyId" | "status">
  >({
    defaultValues: {
      ...user,
    },
  });

  const handleUpdateUser = (data: Omit<User, "companyId" | "status">) => {
    const filterData = clean(data);
    setIsLoading(true);

    api
      .post("/api/users/update", filterData)
      .then(() => {
        toast({
          title: "Usuario alterado com sucesso",
          description: "Usuario alterado com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push("/users");
      })
      .catch(() =>
        toast({
          title: "Falha ao alterar usuario",
          description: "Falha ao alterar usuario",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      )
      .finally(() => setIsLoading(false));
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
            Alterar Beneficiario
          </Heading>
          <form onSubmit={handleSubmit(handleUpdateUser)}>
            <CreateUserForm register={register} loading={isLoading} />
            <Flex marginTop={4}>
              <Box>
                <Button
                  type="button"
                  colorScheme="red"
                  size="sm"
                  isLoading={isLoading}
                  onClick={() => {
                    setIsLoading(true);
                    router.push("/users");
                  }}
                >
                  Cancelar
                </Button>
              </Box>
              <Spacer />
              <Box>
                <Button
                  mr={4}
                  size="sm"
                  type="submit"
                  colorScheme="teal"
                  isLoading={isLoading}
                >
                  Soliciar alteração de usuario
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

  let user = await prisma.user.findUniqueOrThrow({
    where: {
      id: Number(id),
    },
  });

  if (user.companyId !== company.id) {
    return {
      redirect: {
        destination: "/users",
        permanent: false,
      },
    };
  }

  let parseUser = JSON.parse(JSON.stringify(user));
  parseUser = {
    ...parseUser,
    nascimento: parseUser.nascimento.slice(0, 10),
    dataVigencia: parseUser.dataVigencia && parseUser.dataVigencia.slice(0, 10),
    dataCancelamento:
      parseUser.dataCancelamento && parseUser.dataCancelamento.slice(0, 10),
    dataObito: parseUser.dataObito && parseUser.dataObito.slice(0, 10),
    dataAposentadoria:
      parseUser.dataAposentadoria && parseUser.dataAposentadoria.slice(0, 10),
    rgExpedicao: parseUser.rgExpedicao && parseUser.rgExpedicao.slice(0, 10),
    dataAdimissao:
      parseUser.dataAdimissao && parseUser.dataAdimissao.slice(0, 10),
  };

  return {
    props: {
      user: parseUser,
    },
  };
};

export default UpdateUserPage;

import { useEffect } from "react";
import {
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormControl,
  Image,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/auth";
import { AuthBodyRequest } from "../context/auth/types";
import Router from "next/router";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Home: NextPage = () => {
  const { register, handleSubmit } = useForm<AuthBodyRequest>();
  const { singnIn, loading, isAuthenticated } = useAuthContext();

  const handleSignIn = (data: AuthBodyRequest) => {
    singnIn(data);
  };

  useEffect(() => {
    if (isAuthenticated) Router.replace("/users");
  }, [isAuthenticated]);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack flexDir="column" justifyContent="center" alignItems="center">
        <Box minW={{ base: "90%", md: "350px" }}>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <Flex
                justifyContent="center"
                alignContent="center"
                marginBottom="10"
              >
                <Image
                  w="20"
                  src="https://www.suanovaodonto.com.br/docs/Links/marca.png"
                  alt="Dan Abramov"
                />
              </Flex>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input
                    {...register("cnpj")}
                    type="text"
                    placeholder="CNPJ"
                    isRequired
                    isDisabled={loading}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <CFaLock color="gray.300" />
                  </InputLeftElement>
                  <Input
                    {...register("password")}
                    type="password"
                    placeholder="Senha"
                    isRequired
                    isDisabled={loading}
                  />
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                isLoading={loading}
              >
                Entrar
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Home;

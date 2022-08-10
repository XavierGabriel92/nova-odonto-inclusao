import type { AppProps } from "next/app";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { AuthProvider, AuthContext } from "../context/auth";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Flex flexDirection="column" width="100wh" backgroundColor="gray.200">
          <Component {...pageProps} />
        </Flex>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;

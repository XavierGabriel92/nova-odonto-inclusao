import type { AppProps } from "next/app";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { AuthProvider } from "../context/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Flex
          flexDirection="column"
          width="100wh"
          height="100vh"
          backgroundColor="gray.200"
        >
          <Component {...pageProps} />
        </Flex>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;

import type { AppProps } from "next/app";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { AuthProvider } from "../context/auth";

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

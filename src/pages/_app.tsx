import type { AppProps } from "next/app";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { AuthProvider, AuthContext } from "../context/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <AuthContext.Consumer>
          {(context) => (
            <>
              <Flex
                flexDirection="column"
                width="100wh"
                height="100vh"
                backgroundColor="gray.200"
              >
                {context?.isAuthenticated && (
                  <Box bg="teal.500" w="100%" p={4} color="white">
                    {context.company?.name}
                  </Box>
                )}
                <Component {...pageProps} />
              </Flex>
            </>
          )}
        </AuthContext.Consumer>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;

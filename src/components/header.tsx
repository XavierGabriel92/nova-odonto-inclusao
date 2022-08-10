import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { useAuthContext } from "../context/auth";

const Header = () => {
  const { isAuthenticated, company, singOut } = useAuthContext();

  return (
    <>
      {isAuthenticated && (
        <Box
          bg="teal.500"
          w="100%"
          p={4}
          color="white"
          position="fixed"
          zIndex={1}
          marginBottom={6}
        >
          <Flex alignItems="center">
            <Heading as="h5" size="sm">
              {company?.name}
            </Heading>
            <Spacer />
            <Button
              size="sm"
              onClick={singOut}
              colorScheme="white"
              variant="outline"
            >
              Sair
            </Button>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Header;

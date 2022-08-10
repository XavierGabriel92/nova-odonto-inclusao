import { Box } from "@chakra-ui/react";
import { useAuthContext } from "../context/auth";

const Header = () => {
  const { isAuthenticated, company } = useAuthContext();

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
          {company?.name}
        </Box>
      )}
    </>
  );
};

export default Header;

import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  useBreakpointValue,
  Text,
  Stack,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/auth";

const Header = () => {
  const router = useRouter();

  const { isAuthenticated, company, singOut } = useAuthContext();

  return (
    <>
      {isAuthenticated && (
        <Box>
          <Flex
            bg="teal.500"
            color="white"
            borderBottom={1}
            borderStyle={"solid"}
            borderColor="gray.200"
            align={"center"}
            minH={"60px"}
            py={{ base: 2 }}
            px={{ base: 4 }}
          >
            <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
              <Text
                textAlign={{ base: "center", md: "left" }}
                fontFamily="heading"
                color="white"
                fontSize="xl"
                fontWeight={1000}
              >
                {company?.name}
              </Text>

              <Flex display={{ base: "none", md: "flex" }} ml={10}>
                <Stack direction={"row"} spacing={4}>
                  <Box>
                    <Link
                      p={2}
                      href="/users"
                      fontSize="sm"
                      fontWeight={700}
                      color="white"
                    >
                      Beneficiarios incluidos
                    </Link>
                  </Box>
                  <Box>
                    <Link
                      p={2}
                      href="/usersDraft"
                      fontSize="sm"
                      fontWeight={700}
                      color="white"
                    >
                      Incluir beneficiarios
                    </Link>
                  </Box>
                </Stack>
              </Flex>
            </Flex>

            <Stack flex={{ base: 1, md: 0 }} justify="flex-end" direction="row">
              <Button
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                color="white"
                onClick={singOut}
              >
                Sair
              </Button>
            </Stack>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Header;

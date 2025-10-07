import {
  Box,
  Flex,
  Spacer,
  Avatar,
  Button,
  Link,
  HStack,
  useColorMode,
  useColorModeValue,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PipelineSearch from "./pipelineSearch/PipelineSearch";
import LoadingOverlay from "./Loader";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useSelector((state) => state.auth);

  const { colorMode, toggleColorMode } = useColorMode();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const bg = useColorModeValue("whiteAlpha.900", "gray.900");
  const shadow = useColorModeValue("md", "sm");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      setIsUserLoggedIn(true);
    }
  }, []);

 const handleLogout = () => {
    setLoading(true); // show loader
    localStorage.removeItem("userInfo"); 
    if (logout) dispatch(logout());
    
    setTimeout(() => {
      setLoading(false); 
      navigate("/login");
    }, 1500); 
  };

  return (
    <>
    <LoadingOverlay visible={loading}/>
    <Flex
      as="header"
      px={{ base: 4, md: 8 }}
      py={3}
      align="center"
      bg={bg}
      boxShadow={shadow}
      position="sticky"
      top="0"
      zIndex="1000"
      backdropFilter="blur(8px)"
      borderBottomWidth="1px"
    >
      {/* Logo */}
      <Box>
        <Link
          onClick={() => navigate("/dashboard")}
          _hover={{ textDecoration: "none" }}
        >
          <Text
            fontSize={useBreakpointValue({ base: "lg", md: "xl" })}
            fontWeight="bold"
            color="teal.500"
          >
            AWS <Text as="span" color={useColorModeValue("gray.700", "gray.200")}>
              CodePipeline
            </Text>
          </Text>
        </Link>
      </Box>

      <Spacer />

      {/* Search Bar (like YouTube) */}
      <Box
        flex="1"
        maxW={useBreakpointValue({ base: "60%", md: "40%" })}
        mx={4}
      >
        <PipelineSearch/>
      </Box>

      <Spacer />

      <HStack spacing={4}>
        {/* Color Mode Toggle */}
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          size="sm"
          variant="ghost"
          colorScheme="teal"
        />

        {/* Avatar */}
        <Avatar
          size="sm"
          name="User"
          src="https://avatars.githubusercontent.com/u/9919?v=4"
          cursor="pointer"
          _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
          transition="0.2s"
          onClick={() => navigate("/profile")}
        />

        {/* Auth Buttons */}
        {isUserLoggedIn ? (
          <Button
            variant="outline"
            onClick={handleLogout}
            colorScheme="teal"
            size="sm"
            borderRadius="full"
          >
            Sign Out
          </Button>
        ) : (
          <Button
            variant="solid"
            onClick={() => navigate("/login")}
            colorScheme="teal"
            size="sm"
            borderRadius="full"
          >
            Sign In
          </Button>
        )}
      </HStack>
    </Flex>
    </>
  );
};

export default Header;

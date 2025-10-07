import {
  Box,
  Flex,
  Spacer,
  Avatar,
  Button,
  Link,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { logout } = useSelector((state) => state.auth);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      setIsUserLoggedIn(true);
    }
  }, []);

  return (
    <Flex
      as="header"
      px={6}
      py={4}
      align="center"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      {/* Logo */}
      <Box>
        <Link href="/">
          <Text
            fontSize="xl"
            fontWeight="bold"
            textDecor={"none"}
            _hover={{ color: "teal.500", textDecor: "none" }}
          >
            <span style={{ color: "teal" }}>UrbanEdge</span> Constructions
          </Text>
        </Link>
      </Box>

      <Spacer />

      {/* Navigation */}
      <HStack
        as="nav"
        spacing={6}
        display={{ base: "none", md: "flex" }}
        fontWeight="medium"
      >
        <Link
          href="/"
          _hover={{ textDecoration: "underline", color: "teal.500" }}
        >
          Home
        </Link>
        <Link
          href="/about"
          _hover={{ textDecoration: "underline", color: "teal.500" }}
        >
          About Us
        </Link>
        <Link
          href="/services"
          _hover={{ textDecoration: "underline", color: "teal.500" }}
        >
          Services
        </Link>
        <Link
          href="/projects"
          _hover={{ textDecoration: "underline", color: "teal.500" }}
        >
          Projects
        </Link>
        <Link
          href="/blogs"
          _hover={{ textDecoration: "underline", color: "teal.500" }}
        >
          Blogs
        </Link>
        <Link
          href="/contact"
          _hover={{ textDecoration: "underline", color: "teal.500" }}
        >
          Contact
        </Link>
      </HStack>

      <Spacer />

      {/* Actions */}
      <HStack spacing={4}>
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          size="sm"
          variant="ghost"
        />

        <Avatar
          size="sm"
          name="User Name"
          src="/path/to/avatar.jpg"
          cursor="pointer"
          _hover={{ boxShadow: "md" }}
        />

        {isUserLoggedIn ? (
          <Button variant="outline" onClick={logout} colorScheme="teal" size="sm">
            Sign Out
          </Button>
        ) : (
          <Button variant="solid" onClick={() => navigate("/admin/login")} colorScheme="teal" size="sm">
            Sign In
          </Button>
        )}
      </HStack>
    </Flex>
  );
};

export default Header;

import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Heading,
  Text,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true); // show loader while API is processing
      try {
        const response = await fetch("http://localhost:8000/api/authenticate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log(data);

        if (data.status === true) {
          toast.success("Login successful! Redirecting...");
          // Keep loading true until redirected
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500); // small delay for smooth UX

          const userInfo ={
            id: data.id,
            token: data.token,
          }
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        } else {
          toast.error(data.message || "Login failed. Please try again.");
          setLoading(false);
        }
      } catch (error) {
        toast.error("Something went wrong!");
        console.error("Login error:", error);
        setLoading(false);
      }
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.100" px={4}>
      <Box w="full" maxW="md" bg="white" p={8} rounded="2xl" boxShadow="lg">
        <Heading size="lg" textAlign="center" mb={6} color="teal.500">
          Login Here
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl id="email" mb={4} isInvalid={!!errors.email}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl id="password" mb={6} isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            w="full"
            size="lg"
            rounded="xl"
            isLoading={loading} // Chakra built-in loader
            loadingText="Signing in..."
          >
            Sign In
          </Button>
        </form>

        <Text mt={4} fontSize="sm" textAlign="center">
          Don’t have an account?{" "}
          <Link color="teal.500" href="#">
            Sign up
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;

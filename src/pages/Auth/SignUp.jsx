// src/pages/Signup.jsx
import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, registerUser } from "../../store/slices/authSlice";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Clear Redux errors when component unmounts or on dependency change
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Show error toast if there's a Redux error
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const validate = () => {
    const newErrors = {};
    let valid = true;

    if (!name.trim()) {
      newErrors.name = "Full name is required";
      valid = false;
    }

    if (!email.trim()) {
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

    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then((result) => {
        if (result.status === true) {
          toast.success("Account created successfully!");
          if (result.token) {
            setTimeout(() => {
              navigate("/dashboard");
            }, 1500);
          } else {
            setTimeout(() => {
              navigate("/login");
            }, 1500);
          }
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
      });
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.100" px={4}>
      <Box w="full" maxW="md" bg="white" p={8} rounded="2xl" boxShadow="lg">
        <Heading size="lg" textAlign="center" mb={6} color="teal.500">
          Create an Account
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl id="name" mb={4} isInvalid={!!errors.name}>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl id="email" mb={4} isInvalid={!!errors.email}>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl id="password" mb={4} isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          <FormControl id="confirmPassword" mb={6} isInvalid={!!errors.confirmPassword}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            w="full"
            size="lg"
            rounded="xl"
            isLoading={loading}
            loadingText="Signing up..."
          >
            Sign Up
          </Button>
        </form>

        <Text mt={4} fontSize="sm" textAlign="center">
          Already have an account?{" "}
          <Link 
            color="teal.500" 
            onClick={() => navigate("/login")}
            style={{ cursor: 'pointer' }}
          >
            Login here
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Signup;
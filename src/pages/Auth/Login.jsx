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
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loginUser } from "../../store/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const from = location.state?.from?.pathname || "/dashboard";

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Clear Redux errors when component unmounts
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
    if (!validate()) return;

    dispatch(loginUser({ username:email, password }))
      .unwrap()
      .then((result) => {
        if (result.status === true) {
          toast.success("Login successful! Redirecting...");
          // The navigation will be handled by the useEffect above
          // when isAuthenticated becomes true
        }
      })
      .catch((error) => {
        // Error is handled by the useEffect above
        console.error("Login error:", error);
      });
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
            isLoading={loading}
            loadingText="Signing in..."
          >
            Sign In
          </Button>
        </form>

        <Text mt={4} fontSize="sm" textAlign="center">
          Don't have an account?{" "}
          <Link 
            color="teal.500" 
            onClick={() => navigate("/signup")}
            style={{ cursor: 'pointer' }}
          >
            Sign up
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;
// src/layouts/MainLayout.jsx
import Header from "../components/Header";
import { Box } from "@chakra-ui/react";

const MainLayout = ({ children }) => (
  <Box minH="100vh" bg="gray.50" _dark={{ bg: "gray.900" }}>
    <Header />
    <Box p={6}>{children}</Box>
  </Box>
);

export default MainLayout;

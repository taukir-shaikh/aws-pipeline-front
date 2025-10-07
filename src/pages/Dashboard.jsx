import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import NewDashboard from "../components/Dashboard";
import Chart from "../components/chart";
import ContentSection from "../ui/components/DataDisplay/ContentSection";
import ContentTitle from "../ui/components/DataDisplay/ContentTitle";
import UsedPipelines from "../components/UsedPipelines";

const Dashboard = () => {
  return (
    <Box className="dashboard">
      <ContentTitle>Dashboard</ContentTitle>
      <ContentSection>
        <Text fontSize={"2xl"} fontWeight={500}>
          Pipleines
        </Text>
        <Divider />
        <Flex justifyContent={"space-between"} w={"100%"} alignItems="stretch">
          <Box width={"60%"} height="100%">
            <NewDashboard />
          </Box>
          <Divider
            orientation="vertical"
            height="400px"
            m={"auto"}
            color="black"
            border="1px solid gray.300"
          />
          <Box width={"40%"} height="100%">
            <Chart />
          </Box>
        </Flex>
      </ContentSection>

      <Text fontSize={"2xl"} fontWeight={500}>
        Currently Used Pipelines
      </Text>
      <ContentSection>
        <UsedPipelines />
      </ContentSection>
    </Box>
  );
};

export default Dashboard;

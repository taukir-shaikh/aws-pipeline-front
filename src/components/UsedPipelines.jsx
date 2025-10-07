import React, { useState, useEffect } from "react";
import { Box, Text, Progress, Stack } from "@chakra-ui/react";

const pipelines = [
  { id: 1, name: "agent-uat1-pipeline", username: "Ganesh", branch: "ODS-0000", createdAt: "2025-10-07T13:40:00", duration: 240 },
  { id: 2, name: "agent-prod-pipeline", username: "Ganesh", branch: "ODS-0000", createdAt: "2025-10-07T12:00:00", duration: 160 },
  { id: 3, name: "agent-dev-pipeline", username: "Ganesh", branch: "ODS-0000", createdAt: "2025-10-07T13:43:00", duration: 60 },
];

const UsedPipelines = () => {
  const [progressList, setProgressList] = useState({});

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const newProgress = {};

      pipelines.forEach((pipeline) => {
        const start = new Date(pipeline.createdAt);
        const end = new Date(start.getTime() + pipeline.duration * 60 * 1000); // duration in minutes
        const total = end - start;
        const remaining = Math.max(end - now, 0);
        const percentage = remaining > 0 ? (remaining / total) * 100 : 0;
        newProgress[pipeline.id] = { percentage, expired: remaining <= 0, remainingMs: remaining };
      });

      setProgressList(newProgress);
    };

    updateProgress(); // initial call
    const interval = setInterval(updateProgress, 1000); // update every second
    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  // Filter out expired pipelines
  const activePipelines = pipelines.filter(p => !(progressList[p.id]?.expired));

  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4}>
        Used Pipelines
      </Text>
      <Stack spacing={4}>
        {activePipelines.map((pipeline) => {
          const { percentage = 0, remainingMs = 0 } = progressList[pipeline.id] || {};

          return (
            <Box
              key={pipeline.id}
              border="1px solid #ccc"
              borderRadius="md"
              p={4}
              boxShadow="sm"
              bg="white"
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Text fontWeight="bold">{pipeline.name}</Text>
                <Text color="blue.500" fontWeight="bold">
                  In Progress
                </Text>
              </Box>
              <Text>User: {pipeline.username}</Text>
              <Text>Branch: {pipeline.branch}</Text>

              {/* Increased height of progress bar */}
              <Progress
                mt={3}
                value={percentage}
                size="lg"  // larger height
                colorScheme={percentage < 20 ? "red" : percentage < 50 ? "orange" : "green"}
                borderRadius="md"
                hasStripe
                isAnimated
              />
              <Text mt={1} fontSize="sm" color="gray.600">
                {formatTime(remainingMs)}
              </Text>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default UsedPipelines;

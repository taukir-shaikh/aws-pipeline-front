import React from 'react';
import { Box } from '@chakra-ui/react';
import PieComparisonChart from './PieComparsion';

const Chart = () => {
  // Dummy data
  const pipelineData = [
    { label: 'Available', value: 70 }, // e.g., 70 pipelines available
    { label: 'Occupied', value: 30 },  // e.g., 30 pipelines occupied
  ];

  const colors = ['#38A169', '#E53E3E']; // green for available, red for occupied

  // Formatter for inside labels (show percentage)
  const insideFormatter = (params: { value: number; percent: number }) => {
    return `${params.percent.toFixed(1)}%`;
  };

  // Formatter for outside labels (show name)
  const outsideFormatter = (params: { name: string; value: number }) => {
    return params.name;
  };

  return (
    <Box p={6} bg="gray.50" minH="400px">
      <PieComparisonChart
        data={pipelineData}
        colors={colors}
        title="Pipeline Status"
        showInside={true}
        insideFormatter={insideFormatter}
        outsideFormatter={outsideFormatter}
      />
    </Box>
  );
};

export default Chart;

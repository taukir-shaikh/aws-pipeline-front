import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  Badge,
  Box,
  Button,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import {
  ModuleRegistry,
  ClientSideRowModelModule,
  PaginationModule,
} from "ag-grid-community";
import { FaArrowAltCircleRight } from "react-icons/fa";
import PipelineModal from "./pipelineSearch/PipelineModal";

ModuleRegistry.registerModules([ClientSideRowModelModule, PaginationModule]);

const headerStyle = `
  /* Teal 500 header */
  .ag-theme-alpine .ag-header {
    background-color:  #a0edebff !important;
    color: #fff; 
    font-weight: bold;
    font-size: 14px;
  }

  .ag-theme-alpine .ag-floating-filter-input {
    background-color: #B2F5EA !important; 
  }

  .ag-theme-alpine {
    border-radius: 16px !important;
    overflow: hidden;
  }

  .ag-theme-alpine .ag-root-wrapper {
    border-radius: 16px !important;
    overflow: hidden;
    border: 1px solid #d1d5db;
  }

  .ag-theme-alpine .ag-cell {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Dashboard = () => {
  const { onOpen, onClose } = useDisclosure();
  const [selectedPipeline, setSelectedPipeline] = useState(null);

  const handleModalClose = () => {
    setSelectedPipeline(null);
    onClose();
  };
  const handleReserveClick = (pipeline) => {
    setSelectedPipeline(pipeline);
    onOpen();
  };
  const columnDefs = [
    { headerName: "Name", field: "name", filter: "agTextColumnFilter" },
    {
      headerName: "Branch",
      field: "branch",
    },
    {
      headerName: "Status",
      field: "status",
      filter: "agTextColumnFilter",
      cellRenderer: (params) => {
        if (params.value === "Available") {
          return (
            <Badge colorScheme="green" variant="solid">
              {params.value}
            </Badge>
          );
        } else if (params.value === "Used") {
          return (
            <Badge colorScheme="red" variant="solid">
              {params.value}
            </Badge>
          );
        } else if (params.value === "Pending") {
          return (
            <Badge colorScheme="orange" variant="solid">
              {params.value}
            </Badge>
          );
        }
      },
    },
    {
      headerName: "Action",
      field: "action",
      cellRenderer: (params) => {
        if (params.data.status === "Available") {
          return (
            <Button
              leftIcon={<FaArrowAltCircleRight />}
              colorScheme={"teal"}
              size={"sm"}
              onClick={() => handleReserveClick(params.data)}
            >
              Reserve
            </Button>
          );
        } else {
          return (
            <>
            <Text fontStyle={"italic"} color={"red.500"}>Used by {params.data.usedBy || "Someone"}</Text>
            </>
          )
        }
      },
    },
  ];

  const rowData = [
    {
      id: 1,
      name: "John Doe",
      age: 28,
      email: "john.doe@example.com",
      branch: "2025-01-15",
      status: "Used",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 34,
      email: "jane.smith@example.com",
      branch: "2024-11-20",
      status: "Available",
    },
    {
      id: 3,
      name: "Michael Johnson",
      age: 41,
      email: "michael.johnson@example.com",
      branch: "2023-07-10",
      status: "Used",
    },
    {
      id: 4,
      name: "Emily Davis",
      age: 25,
      email: "emily.davis@example.com",
      branch: "2025-03-05",
      status: "Available",
    },
    {
      id: 5,
      name: "William Brown",
      age: 30,
      email: "william.brown@example.com",
      branch: "2022-12-12",
      status: "Used",
    },
  ];

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <style>{headerStyle}</style>
       <PipelineModal 
        pipeline={selectedPipeline} 
        onClose={handleModalClose} 
      />
      <Box
        className="ag-theme-alpine"
        boxShadow="lg"
        bg="white"
        p={2}
        height="500px"
        width="100%"
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
            minWidth: 150,
            floatingFilter: true,
          }}
          rowHeight={50} // still controls row height
          headerHeight={60}
          animateRows={true}
        />
      </Box>

      <Text mt={4} textAlign="right" fontSize="sm" color="gray.500">
        Showing {rowData.length} users
      </Text>
    </Box>
  );
};

export default Dashboard;

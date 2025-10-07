import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Box, Heading, Text } from "@chakra-ui/react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { ModuleRegistry, ClientSideRowModelModule, PaginationModule } from "ag-grid-community";

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
  const columnDefs = [
    { headerName: "ID", field: "id", filter: "agNumberColumnFilter" },
    { headerName: "Name", field: "name", filter: "agTextColumnFilter" },
    { headerName: "Age", field: "age", filter: "agNumberColumnFilter" },
    { headerName: "Email", field: "email", filter: "agTextColumnFilter" },
    {
      headerName: "Join Date",
      field: "joinDate",
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          if (!cellValue) return -1;
          const cellDate = new Date(cellValue);
          if (cellDate < filterLocalDateAtMidnight) return -1;
          if (cellDate > filterLocalDateAtMidnight) return 1;
          return 0;
        },
        browserDatePicker: true,
      },
    },
    { headerName: "Status", field: "status", filter: "agTextColumnFilter" },
  ];

  const rowData = [
    { id: 1, name: "John Doe", age: 28, email: "john.doe@example.com", joinDate: "2025-01-15", status: "Active" },
    { id: 2, name: "Jane Smith", age: 34, email: "jane.smith@example.com", joinDate: "2024-11-20", status: "Inactive" },
    { id: 3, name: "Michael Johnson", age: 41, email: "michael.johnson@example.com", joinDate: "2023-07-10", status: "Active" },
    { id: 4, name: "Emily Davis", age: 25, email: "emily.davis@example.com", joinDate: "2025-03-05", status: "Pending" },
    { id: 5, name: "William Brown", age: 30, email: "william.brown@example.com", joinDate: "2022-12-12", status: "Active" },
  ];

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <style>{headerStyle}</style>
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

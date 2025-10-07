import { useMemo, useRef, useState } from 'react';
import { AdvancedGridTable, Box, Button, Text } from '../src/ui/components'

const App = () => {
  const gridRef = useRef(null);
  const [actionList, setActionList] = useState([]);
    const columnDefs = [
    {
      headerName: 'Action Code',
      filter: 'agTextColumnFilter',
      field: 's_PATranTypeCode',
      minWidth: 250,
    },
    {
      headerName: 'Action Name',
      filter: 'agTextColumnFilter',
      field: 's_TranTypeScreenName',
      minWidth: 250,
    },
  ];
    const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      floatingFilter: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      wrapText: true,
      autoHeight: true,
      flex: 1,
    }),
    []
  );
  return (
    <Box bg={'gray.100'} textAlign="center">
      <Text fontSize="3xl" color={'blue.500'}>Hello World form Taukir Shaikh</Text>
      <Button size={'md'}>Click Me</Button>
      <Box w={'100%'} className="ag-theme-alpine" overflow={'hidden'}>
              <AdvancedGridTable
                gridRef={gridRef}
                rowData={actionList}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                suppressMultiSort={true}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 25, 50]}
                enableCellTextSelection={true}
              />
            </Box>
    </Box>
  )
}

export default App
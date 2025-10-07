import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import { ColDef } from 'ag-grid-community';
import { LicenseManager } from 'ag-grid-enterprise';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import React, { useMemo } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (import.meta.env.VITE_APP_AGGRID_LICENSEKEY) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  LicenseManager.setLicenseKey(import.meta.env.VITE_APP_AGGRID_LICENSEKEY);
}

interface AdvancedGridTableProps<TData> extends AgGridReactProps<TData> {
  gridRef: React.RefObject<AgGridReact<TData>>;
}

function AdvancedGridTable<TData>({
  gridRef,
  ...baseProps
}: AdvancedGridTableProps<TData>) {
  const ColDefToOverride = Object.prototype.hasOwnProperty.call(
    baseProps,
    'defaultColDef'
  )
    ? baseProps.defaultColDef
    : {};
  const defaultColDef: ColDef = useMemo(
    () => ({
      resizable: true,
      wrapText: true,
      autoHeight: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      suppressMenu: true,
      ...ColDefToOverride,
    }),
    []
  );

  return (
    <AgGridReact<TData>
      ref={gridRef}
      domLayout="autoHeight"
      defaultColDef={defaultColDef}
      enableCellTextSelection={true}
      suppressMultiSort={true}
      {...baseProps}
    />
  );
}

export default AdvancedGridTable;

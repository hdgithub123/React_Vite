
// cần cài đặt 
// npm install ag-grid-react
// mau co checkbox

import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const GridExample = () => {
  const [rowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
    { make: "Vauxhall", model: "Corsa", price: 18460, electric: false },
    { make: "Volvo", model: "EX30", price: 33795, electric: true },
    { make: "Mercedes", model: "Maybach", price: 175720, electric: false },
    { make: "Vauxhall", model: "Astra", price: 25795, electric: false },
    { make: "Fiat", model: "Panda", price: 13724, electric: false },
    { make: "Jaguar", model: "I-PACE", price: 69425, electric: true },
  ]);

  const gridApiRef = useRef(null);

  const onGridReady = useCallback((params) => {
    gridApiRef.current = params.api;
  }, []);

  const checkboxRenderer = useCallback((params) => {
    return (
      <div style={{ display: 'none' }}>
      </div>
    );
  }, []);

  const columnDefs = useMemo(
    () => [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        field: "checkboxColumn",
        headerName: "",
        width: 2,
        sortable: false,
        filter: true,
        cellDataType: 'boolean',
        cellRenderer: checkboxRenderer,
        headerCheckboxSelectionFilteredOnly: true,
        floatingFilter: false,
      },
      { field: "make" },
      { field: "model" },
      { field: "price", filter: "agNumberColumnFilter" },
      {
        field: "electric",
        filter: true,
      },
    ],
    [checkboxRenderer]
  );

  const defaultColDef = useMemo(
    () => ({
      filter: "agTextColumnFilter",
      floatingFilter: true,
      flex: 1,
    }),
    []
  );

  return (
    <div className="ag-theme-quartz-dark" style={{ height: "100vh", width: "100vh" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        rowSelection="multiple"
      />
    </div>
  );
};

export default GridExample;

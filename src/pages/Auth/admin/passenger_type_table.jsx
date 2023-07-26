import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { AgGridReact, AgGridColumn, defaultColDef } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
const Passengertypetable = () => {
  const rowData = [
    { OrderNumber: "1", Name: "name A", Description: "test" },
    { OrderNumber: "2", Name: "name b", Description: "test" },
    { OrderNumber: "3", Name: "name c", Description: "test" },
  ];
  const [gridApi, setGridApi] = useState(rowData);
  const onBtExport = () => {
    gridApi.exportDataAsExcel();
  };
  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <div className="container">
          <button
            onClick={() => onBtExport()}
            style={{ marginBottom: "5px", fontWeight: "bold" }}
          >
            Export to Excel
          </button>
        </div>

        <AgGridReact rowData={rowData}>
          <AgGridColumn
            field="OrderNumber"
            sortable={true}
            filter={true}
          ></AgGridColumn>

          <AgGridColumn
            field="Name"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="Description"
            sortable={true}
            filter={true}
          ></AgGridColumn>
        </AgGridReact>
      </div>
    </>
  );
};

export default Passengertypetable;

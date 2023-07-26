import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { AgGridReact, AgGridColumn, defaultColDef } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
const Paymentcreationlist = () => {
  const rowData = [
    {
      AgentName: "Agent1 ",
      PaymentType: "online",
      PaymentDate: "11/8/2021",
      Amount: "500",
      Description: "Abc",
    },
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
            field="AgentName"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="PaymentType"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="PaymentDate"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="Amount"
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

export default Paymentcreationlist;

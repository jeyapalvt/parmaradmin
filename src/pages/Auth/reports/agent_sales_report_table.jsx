import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { AgGridReact, AgGridColumn, defaultColDef } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
const Agentsalesreporttable = () => {
  const rowData = [
    {
      TicketNumber: "12345",
      BookingRefNO: "par12",
      Transaction: "Test",
      ParkName: "Al Barsha Pond Park, Al Barsha 2",
      PaxName: "Test Pax",
      ContactNo: "12365447982",
      SalesAmount: "520",
      OrderId: "362",
      SalesDate: "11/08/2022",
      Compenyname: "Test comp1",
      user: "user 1",
      Name: "user name",
      Customertype: "type1",
      Ticketype: "ticket one",
    },
    {
      TicketNumber: "65985",
      BookingRefNO: "par56",
      Transaction: "Test",
      ParkName: "Al Nahda Pond Park, Al Nahda",
      PaxName: "Test Pax",
      ContactNo: "9885455625",
      SalesAmount: "550",
      OrderId: "236",
      SalesDate: "11/08/2022",
      Compenyname: "Test comp2",
      user: "user 2",
      Name: "user AAAA",
      Customertype: "type 5",
      Ticketype: "ticket two",
    },
    {
      TicketNumber: "98565",
      BookingRefNO: "par03",
      Transaction: "Test",
      ParkName: "Al Mamzar Beach Park, Deira",
      PaxName: "Test Pax",
      ContactNo: "5566698745",
      SalesAmount: "565",
      OrderId: "9875",
      SalesDate: "11/08/2022",
      Compenyname: "Test comp3",
      user: "user 4",
      Name: "user BBB",
      Customertype: "type6",
      Ticketype: "ticket three",
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
            field="ParkName"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="Compenyname"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="user"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="Name"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="Ticketype"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="Customertype"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="TicketNumber"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="Transaction"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="OrderId"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="BookingRefNO"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="SalesAmount"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="SalesDate"
            sortable={true}
            filter={true}
          ></AgGridColumn>
        </AgGridReact>
      </div>
    </>
  );
};

export default Agentsalesreporttable;

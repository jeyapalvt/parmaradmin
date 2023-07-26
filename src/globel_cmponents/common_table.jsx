import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { AgGridReact, AgGridColumn } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const Commontable = () => {
  const rowData = [
    { Name: "Admin", Description: "Admion Role" },
    { Name: "Agent", Description: "Agent Role" },
    { Name: "User", Description: "User Role" },
  ];
  // const [rowData, setRowData] = useState([]);
  // useEffect(() => {
  //   fetch('https://www.ag-grid.com/example-assets/row-data.json')
  //       .then(result => result.json())
  //       .then(rowData => setRowData(rowData))
  // }, []);
  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact rowData={rowData}>
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
        {/* <AgGridReact
              // ref={gridRef}
               rowData={rowData}
              rowSelection="multiple">
              <AgGridColumn field="make" sortable={true} filter={true}></AgGridColumn>
              <AgGridColumn field="make" sortable={true} filter={true} checkboxSelection={true}></AgGridColumn>
               <AgGridColumn field="model" sortable={true} filter={true}></AgGridColumn>
               <AgGridColumn field="price" sortable={true} filter={true}></AgGridColumn>
           </AgGridReact> */}
      </div>
    </>
  );
};
var filterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("/");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};

export default Commontable;

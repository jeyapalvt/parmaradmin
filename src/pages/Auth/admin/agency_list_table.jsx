import { React, useState, useEffect } from "react";
import { render } from "react-dom";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import requests from "../../../utils/Requests";
import { Button } from "reactstrap";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Titlebanner from "../../../globel_cmponents/title_banner";
import { AiTwotoneEdit } from "react-icons/ai";

const Agencylistable = () => {
  useEffect(() => {}, []);
  const [tourlist, setTourlist] = useState([]);
  const [rowData, setrowData] = useState([]);
  let attraction = { attractionsId: 1, secretKey: requests.apiKey };
  let history = useHistory();
  const onGridReady = (params) => {
    axios
      .post(requests.getagencylist, attraction)
      .then((res) => {
        // console.log("res data", res.data);
        setTourlist(res.data);
        setrowData(res.data);
        setRecordForTable(res.data);
        params.api.applyTransaction({ add: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setRecordForTable = (record) => {
    const tempRecord = record.map(({ bookingId }) => ({
      bookingId: bookingId,
    }));
    // setrowData(tempRecord);
  };
  const actionButton = (params) => {
    // alert(`${params.data.agencyName} `);
    history.push(`/admin/agency-create-new/${params.data.agencyId}`); //{`tour-pack-details/${alltour.attractionsId}`}"/attraction/attraction-creation"
  };
  const columnDefs = [
    { headerName: "Agency Name", field: "agencyName" },
    { headerName: "Compeny Name", field: "agencyCompanyType" },
    { headerName: "Conatct", field: "agencyPhoneNumber" },
    { headerName: "Email", field: "agencyEmail" },
    { headerName: "Country", field: "agencyCountry" },
    {
      headerName: "Action",
      filter: false,
      field: "attName",
      cellRendererFramework: (params) => (
        <div>
          <Button color="primary" onClick={() => actionButton(params)}>
            <AiTwotoneEdit />
          </Button>
        </div>
      ),
    },
  ];
  // const rowData = [
  //   { name: "Rahul", age: 19, phoneNumber: 9876543210, birthYear: 2001 },
  //   { name: "David", age: 17, phoneNumber: 9827654310, birthYear: 2003 },
  //   { name: "Dan", age: 25, phoneNumber: 9765438210, birthYear: 1995 },
  // ];

  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <>
      {/* <Button
        color="primary"
        onClick={(e) => exportToCSV(rowData, "Agent_Details")}
      >
        Download CSV
      </Button> */}
      <div className="App">
        <div className="ag-theme-alpine" style={{ height: "500px" }}>
          <AgGridReact
            columnDefs={columnDefs}
            // rowData={rowData}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            pagination={true}
            // paginationPageSize={5}
            paginationAutoPageSize={true}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
};

export default Agencylistable;

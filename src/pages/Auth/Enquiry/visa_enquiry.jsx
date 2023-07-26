import Titlebanner from "../../../globel_cmponents/title_banner";
import { Button } from "reactstrap";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import requests from "../../../utils/Requests";
import { FaFileDownload } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const VisaEnquiry = () => {
  let history = useHistory();

  const [rowData, setrowData] = useState([]);
  const onGridReady = () => {
    axios
      .post(requests.getVisaEnquiryList, { enquiryId: 1, platformId: 1 })
      .then((response) => {
        console.log("sodghsdfhsdnfisdiudshi", response.data);
        setrowData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };
  const columnDefs = [
    { headerName: " F_Name", field: "firstName" },
    { headerName: " L_Name", field: "lastName" },
    { headerName: " Contact Number", field: "phoneNumber" },
    { headerName: " Nationality", field: "nationality" },
    { headerName: "PassportCountry", field: "passportCountry" },
    { headerName: "visa Type", field: "visaType" },
    { headerName: "Insurance", field: "withInsurance" },
    { headerName: "Price", field: "visaPrice" },

    {
      headerName: "Action",
      filter: false,
      field: "bookNumber",
      cellRendererFramework: (params) => (
        <div>
          <Button color="primary" onClick={() => actionButton(params)}>
            <FaFileDownload />
          </Button>
        </div>
      ),
    },
  ];

  const actionButton = (params) => {
    console.log(params.data);
    history.push(`/visa/visa-details/${params.data.visaEnquiryId}`);
  };
  return (
    <>
      <Titlebanner title="Visa Enquiry List" />
      <div className="App">
        <div className="ag-theme-alpine" style={{ height: "500px" }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            pagination={true}
            // paginationPageSize={5}
            // paginationAutoPageSize={true}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
};

export default VisaEnquiry;

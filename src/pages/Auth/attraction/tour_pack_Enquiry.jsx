import Titlebanner from "../../../globel_cmponents/title_banner";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import requests from "../../../utils/Requests";
import { AiTwotoneEdit } from "react-icons/ai";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
const TourPackEnquiry = () => {
  const [rowData, setrowData] = useState([]);
  const onGridReady = () => {
    axios
      .post(requests.getTourEnquiryList, { enquiryId: 1 })
      .then((response) => {
        // console.log(response.data);
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
    { headerName: " Name", field: "enqCusName" },
    { headerName: " Email", field: "enqEmail" },
    { headerName: " Mobile Number", field: "enqMobileNumber" },
    { headerName: "Date", field: "enquiryDate" },
    { headerName: "Tour Name", field: "tourPackageName" },
    { headerName: "Status", field: "enqFollowUpStatus" },

    {
      headerName: "Action",
      filter: false,
      field: "enquiryId",
      cellRendererFramework: (params) => (
        <div>
          <Button color="primary" onClick={() => actionButton(params)}>
            <AiTwotoneEdit />
          </Button>
        </div>
      ),
    },
  ];
  const actionButton = (params) => {
    console.log(params.data);

    Swal.fire({
      title: "Warning",
      text: "Are you sure to Change This Enquiry Status?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .post(requests.setenquiry, params.data)
          .then((response) => {
            // console.log(response.data);
            Swal.fire({
              title: "Success",
              text: "Enquiry Updated",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  return (
    <>
      <Titlebanner title="Tour Pack Enquiry List" />
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

export default TourPackEnquiry;

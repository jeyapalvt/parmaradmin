import React from "react";
import Titlebanner from "../../../globel_cmponents/title_banner";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import requests from "../../../utils/Requests";
import { AiTwotoneEdit } from "react-icons/ai";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
const VisaList = () => {
  let history = useHistory();
  const defaultColDef = {
    sortable: true,
    editable: true,
    // flex: 1,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };

  const columnDefs = [
    { headerName: " Name", field: "visaName" },
    { headerName: " Express Cost", field: "expressCost" },
    { headerName: " Price", field: "visaPrice" },
    { headerName: " Duration", field: "visaDuration" },
    { headerName: " Country", field: "country" },

    {
      headerName: "Action",
      filter: false,
      field: "ticketTypeId",
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
    history.push(`/visa/create-visa/${params.data.visaId}`);
  };
  const onGridReady = (params) => {
    //  console.log("grid is ready");
    //getAttractionListForUpdate  -- for get all (include inactive status)
    axios
      .post(requests.getVisaList, { visaId: 0 })
      .then((res) => {
        params.api.applyTransaction({ add: res.data });
        //  console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Titlebanner title="Visa List" />
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
export default VisaList;

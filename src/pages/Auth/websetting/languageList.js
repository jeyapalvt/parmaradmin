import React, { useEffect, useState } from "react";
import Titlebanner from "../../../globel_cmponents/title_banner";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { AiTwotoneEdit } from "react-icons/ai";
import axios from "axios";
import requests from "../../../utils/Requests";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useHistory } from "react-router-dom";
const LanguageList = () => {
  let history = useHistory();
  const onGridReady = (params) => {
    axios
      .post(requests.getLanguagesList, { languageId: 0 })
      .then((res) => {
        console.log(res.data);
        params.api.applyTransaction({ add: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const columnDefs = [
    { headerName: " Name", field: "langName" },
    { headerName: " Code", field: "langCode" },
    { headerName: " Native Language", field: "langNameInNaviteLang" },
    { headerName: " Country", field: "langCountry" },

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
  const actionButton = (params) => {
    history.push(`/admin/create-language/${params.data.languageId}`);
  };
  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };
  return (
    <div>
      <Titlebanner title="Language List" />
      <div className="float-right">
        <Link
          to="/admin/create-language/null"
          class="btn btn-primary"
          role="button"
        >
          Create New
        </Link>
      </div>

      <br />
      <br />

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
    </div>
  );
};

export default LanguageList;

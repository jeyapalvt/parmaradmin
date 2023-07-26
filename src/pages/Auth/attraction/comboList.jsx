import { React, useState, useEffect } from "react";

import { Button } from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import requests from "../../../utils/Requests";
import { AiTwotoneEdit } from "react-icons/ai";
import Titlebanner from "../../../globel_cmponents/title_banner";

const ComboListTable = () => {
  useEffect(() => {}, []);
  let history = useHistory();

  let attraction = { userRolesId: 1 };

  const onGridReady = (params) => {
    axios
      .post(requests.getComboOfferList, { ComboOfferId: 0, platformId: 1 })
      .then((res) => {
        //   console.log(res.data);
        params.api.applyTransaction({ add: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const actionButton = (params) => {
    history.push(`/attraction/combo-pack-creation/${params.data.comboOfferId}`); //{`tour-pack-details/${alltour.attractionsId}`}"/attraction/attraction-creation"
  };
  const columnDefs = [
    { headerName: " Name", field: "comboName" },
    { headerName: " Actual Price", field: "actualPrice" },
    { headerName: " Offer Price ", field: "offerPrice" },

    {
      headerName: "Action",
      filter: false,
      field: "comboOfferId",
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
    resizable: true,
  };
  return (
    <>
      <Titlebanner title="Combo Pack List" />
      <div className="App">
        <div className="ag-theme-alpine" style={{ height: "500px" }}>
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            // onGridReady={onGridReady}
            pagination={true}
            // paginationPageSize={5}
            // paginationAutoPageSize={true}

            // rowData={rowData}

            onGridReady={onGridReady}
            // paginationPageSize={5}
            paginationAutoPageSize={true}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
};

export default ComboListTable;

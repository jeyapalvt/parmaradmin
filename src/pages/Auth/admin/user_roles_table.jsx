import { React, useState, useEffect } from "react";
import { render } from "react-dom";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import requests from "../../../utils/Requests";
import { Button } from "reactstrap";

import Titlebanner from "../../../globel_cmponents/title_banner";
import { AiTwotoneEdit } from "react-icons/ai";

const Userroletable = () => {
  useEffect(() => {}, []);
  let history = useHistory();

  let attraction = { userRolesId: 1 };

  const onGridReady = (params) => {
    axios
      .post(requests.getuserlist, attraction)
      .then((res) => {
        params.api.applyTransaction({ add: res.data });
     
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const actionButton = (params) => {
  
    //alert(`${params.data.attName} `);
    history.push(`/admin/roles-create-new/${params.data.userRolesId}`); //{`tour-pack-details/${alltour.attractionsId}`}"/attraction/attraction-creation"
  };
  const columnDefs = [
    { headerName: "Role", field: "userRolesName" },
    { headerName: "Description", field: "userRolesDescription" },

    {
      headerName: "Action",
      filter: false,
      field: "userRolesId",

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
      <div className="App">
        <div className="ag-theme-alpine" style={{ height: "500px" }}>
          <AgGridReact
            columnDefs={columnDefs}
            // rowData={rowData}
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

export default Userroletable;

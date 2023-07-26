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

const Tourpacklisttable = () => {
  useEffect(() => {}, []);
  const [tourlist, setTourlist] = useState([]);
  // const [getTourList, setgetTourList] = useState({
  //   attractionId: 1,
  // });
  let attraction = { attractionsId: 1, platformId: 1 };
  let history = useHistory();
  const onGridReady = (params) => {
    //  console.log("grid is ready");

    axios
      .post(requests.gettourpackagelist, attraction)
      .then((res) => {
        setTourlist(res.data);
        params.api.applyTransaction({ add: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const actionButton = (params) => {
    //  alert(`${params.data.tourPackageId} `);
    history.push(`/attraction/tour-pack-creation/${params.data.tourPackageId}`); //{`tour-pack-details/${alltour.attractionsId}`}"/attraction/attraction-creation"
  };
  const columnDefs = [
    { headerName: "Name", field: "tourName" },
    { headerName: "price", field: "tourPrice" },

    {
      headerName: "Action",
      field: "tourName",
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
  return (
    <>
      <Titlebanner title="Ticket List" />
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

export default Tourpacklisttable;

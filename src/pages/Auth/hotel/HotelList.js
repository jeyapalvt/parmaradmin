import React, { useState, useEffect } from "react";
import Titlebanner from "../../../globel_cmponents/title_banner";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import requests from "../../../utils/Requests";
import { useHistory } from "react-router-dom";
import { AiTwotoneEdit } from "react-icons/ai";
import { Button } from "reactstrap";
const HotelList = () => {
  const history = useHistory();
  const [rowData, setrowData] = useState([]);
  useEffect(() => {
    getHotelList();
  }, []);
  const getHotelList = () => {
    axios
      .post(requests.getHotelList, { hotelId: 1 })
      .then((res) => {
        console.log(res.data);
        setrowData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const columnDefs = [
    { headerName: "Name", field: "hotelName" },
    { headerName: "City ", field: "hotelCity" },
    { headerName: "supplier ", field: "supplier" },
    {
      headerName: "Actions",
      filter: false,
      field: "hotelId",
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
    history.push(`/hotel/create-hotel/${params.data.hotelId}`);
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
      <Titlebanner title="Hotel List" />
      <div className="App">
        <div className="ag-theme-alpine" style={{ height: "500px" }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            defaultColDef={defaultColDef}
            // onGridReady={onGridReady}
            pagination={true}
            // paginationPageSize={5}
            // paginationAutoPageSize={true}
            alwaysShowHorizontalScroll={true}
            alwaysShowVerticalScroll={true}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default HotelList;

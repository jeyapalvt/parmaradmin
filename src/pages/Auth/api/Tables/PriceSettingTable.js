import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../../../../utils/Requests";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Button } from "reactstrap";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
const PriceSettingTable = (props) => {
  useEffect(() => {
    getPriceList();
  }, []);

  const [rowData, setrowData] = useState("");

  const getPriceList = () => {
    axios
      .post(requests.getApiRateList, { apiRateSettingId: 0 })
      .then((response) => {
        setrowData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const actionButton = (params) => {
    props.editData(params.data.apiRateSettingId);
  };

  const deleteButton = (params) => {
  
    axios
      .post(requests.removeApiRate, {
        apiRateSettingId: params.data.apiRateSettingId,
      })
      .then((response) => {
       if(response.data.errCode == 0){
        Swal.fire({
            title: "success!", //'Good job!',
            text: "Record Removed", //'You clicked the button.',
            icon: "success", //'success'
          });
          window.location.reload();
       }

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columnDefs = [
    { headerName: " API Price", field: "apiPrice" },
    { headerName: " Agent Price", field: "agentPrice" },
    { headerName: " B2C Price", field: "b2cPrice" },
    {
      headerName: "Action",
      filter: false,
      field: "apiRateSettingId",
      cellRendererFramework: (params) => (
        <div>
          <Button color="primary" onClick={() => actionButton(params)}>
            <AiTwotoneEdit />
          </Button>{" "}
          &nbsp;&nbsp;&nbsp;
          <Button color="danger" onClick={() => deleteButton(params)}>
            <AiFillDelete />
          </Button>
        </div>
      ),
    },
  ];
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
            rowData={rowData}
            defaultColDef={defaultColDef}
            //onGridReady={onGridReady}
            pagination={true}
            // paginationPageSize={5}
            // paginationAutoPageSize={true}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
};
export default PriceSettingTable;

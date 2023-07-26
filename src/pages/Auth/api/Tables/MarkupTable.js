import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../../../../utils/Requests";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Button } from "reactstrap";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
const MarkupTable = (props) => {
  const [agentList, setagentList] = useState([]);
  useEffect(() => {
    getPriceList();
    // getAgentList();
  }, []);

  const getAgentList = () => {
    axios
      .post(requests.getagencylist, {
        attractionsId: 1,
        secretKey: requests.apiKey,
      })
      .then((res) => {
        const values = [...agentList];
        values.length = 0;
        values.push({
          name: "Select Agent",
          value: "",
        });
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            name: res.data[i].agencyName,
            value: res.data[i].agencyId,
          });
        }

        setagentList(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [rowData, setrowData] = useState("");

  const getPriceList = () => {
    axios
      .post(requests.getApiMarkupDiscountList, { markupDiscountApiId: 0 })
      .then((response) => {
        //  setrowData(response.data);
        console.log(response.data);
        setRecordForTable(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setRecordForTable = (tempData) => {
    const tempRecord = tempData.map(
      ({
        markupDiscountApiId,
        markupAgencyId,
        agencyName,
        markupApiRate,
        markupAgentRate,
      }) => ({
        markupDiscountApiId: markupDiscountApiId,
        agencyName: agencyName,
        markupApiRate: markupApiRate,
        markupAgentRate: markupAgentRate,
      })
    );
    setrowData(tempRecord);
  };

  const agetName = (markupAgencyId) => {
    if (agentList != "") {
      const agentName = agentList.filter(
        (item) => item.value == markupAgencyId
      );
      return agentName[0].name;
    }
  };

  const actionButton = (params) => {
    props.editData(params.data.markupDiscountApiId);
  };

  const deleteButton = (params) => {
    axios
      .post(requests.removeApiMarkupDiscount, {
        markupDiscountApiId: params.data.markupDiscountApiId,
      })
      .then((response) => {
        if (response.data.errCode == 0) {
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
    { headerName: " Agent", field: "agencyName" },
    { headerName: " Markup Api Rate", field: "markupApiRate" },
    { headerName: "Markup Agent Rate", field: "markupAgentRate" },
    { headerName: "Markup B2c Rate", field: "markupB2cRate" },
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
export default MarkupTable;

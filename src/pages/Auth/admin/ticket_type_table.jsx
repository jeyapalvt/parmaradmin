import { React, useState, useEffect } from "react";
import { render } from "react-dom";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import requests from "../../../utils/Requests";
import { Button, Label, Input, FormGroup } from "reactstrap";

import Titlebanner from "../../../globel_cmponents/title_banner";
import { AiTwotoneEdit } from "react-icons/ai";

const Tickettypetable = () => {
  useEffect(() => {
    apicall();
    getTkttype();
  }, []);
  let history = useHistory();
  const [rowData, setrowData] = useState([]);
  const [totalTickets, settotalTickets] = useState([]);
  const [attractionList, setattractionList] = useState([
    { name: "", value: "" },
  ]);
  const [isLoading, setisLoading] = useState(0);
  const apicall = async () => {
    await axios
      .post(requests.getattractionall, { attractionId: 1 })
      .then((res) => {
        const values = [...attractionList];
        values.length = 0;
        values.push({
          name: "Select Attraction",
          value: "",
        });
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            name: res.data[i].attName,
            value: res.data[i].attractionsId,
          });
        }
        setattractionList(values);
      })
      .catch((err) => {});
  };

  const getTkttype = () => {
    axios
      .post(requests.gettickettypelist, { userRolesId: 1, platformId: 1 })
      .then((response) => {
        setrowData(response.data);
        settotalTickets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filtterList = (attId) => {
    const tktfilter = totalTickets.filter(
      (tktlist) => tktlist.ttAttractionId == attId
    );

    setrowData(tktfilter);
  };

  let attraction = { userRolesId: 1 };

  // const onGridReady = (params) => {
  //   axios
  //     .post(requests.gettickettypelist, attraction)
  //     .then((res) => {
  //       params.api.applyTransaction({ add: res.data });
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const actionButton = (params) => {
    //  alert(`${params.data.ticketTypeId} `);
    history.push(`/admin/ticket-type-new/${params.data.ticketTypeId}`); //{`tour-pack-details/${alltour.attractionsId}`}"/attraction/attraction-creation"
  };

  const columnDefs = [
    { headerName: " Name", field: "ttTicketType" },
    { headerName: " Description", field: "ttTicketTypeDiscription" },
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
        <FormGroup>
          <Label for="exampleSelect">Select Attraction</Label>
          <Input
            type="select"
            name="select"
            onChange={(e) => filtterList(e.target.value)}
            //  onChange={(e) => setFillter(e.target.value)}
          >
            {attractionList.map((attration, index) => (
              <option value={attration.value}> {attration.name}</option>
            ))}
          </Input>
        </FormGroup>

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
      </div>
    </>
  );
};

export default Tickettypetable;

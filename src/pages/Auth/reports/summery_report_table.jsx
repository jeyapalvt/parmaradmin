import { React, useState, useEffect } from "react";
import { render } from "react-dom";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import requests from "../../../utils/Requests";
import { Button, Label, FormGroup, Input } from "reactstrap";

import Titlebanner from "../../../globel_cmponents/title_banner";
import { AiTwotoneEdit } from "react-icons/ai";

const Stacksummeryreport = () => {
  let TktList = [];
  useEffect(() => {
    getdata();
    apicall();

  
  }, []);
  const [tourlist, setTourlist] = useState([]);

  const [attractionList, setattractionList] = useState([
    { name: "", value: "" },
  ]);

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

  const getdata = () => {
    axios
      .post("http://103.235.106.127:8080/parmartour/v1.0/getTicketListAll", {
        tktId: 1,
      })
      .then((res) => {
      
        setRecordForTable(res.data);
        //  console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const tempProducts = productList.map(
  //   ({
  //     productName,
  //     distributorId,
  //     productDesc,
  //     price,
  //     productId,
  //     imageUrl
  //   }) => ({
  //     name: productName,
  //     description: productDesc,
  //     distId: distributorId,
  //     price: price,
  //     productId: productId,
  //     count: 0,
  //     poster: 'http://103.235.106.127:8080/images/h2ocloud/product/'+imageUrl,
  //   })

  // );

  const setRecordForTable = (record) => {
    TktList = record;

    const tableRecord = record.map(
      ({
        tktType,
        tktAdultOrChild,
        tktAdultFareB2B,
        tktAdultFareB2C,
        tktBookingId,
        attractionId,
      }) => ({
        Name: tktType,
        AdultorChild: tktAdultOrChild,
        b2bPrice: tktAdultFareB2B,
        b2cprice: tktAdultFareB2C,
        attractionId: attractionId,
        tktBookingId: SoldOrAvilable(tktBookingId),
      })
    );

    setTourlist(tableRecord);
    setGridApi(tableRecord);

    setrowData(tableRecord);
  };

  const SoldOrAvilable = (tktBookingId) => {
    if (tktBookingId == 0) {
      return "Available";
    } else {
      return "Sold";
    }
  };

  let history = useHistory();
  // const onGridReady = (params) => {
  //   //  console.log("grid is ready");

  //   axios
  //     .post("http://66.29.149.191:8080/parmartour/v1.0/getTicketListAll", {tktId : 1})
  //     .then((res) => {

  //       params.api.applyTransaction({ add: res.data });
  //       //  console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const actionButton = (params) => {
  //   console.log(params);
  //   //alert(`${params.data.attName} `);
  //   history.push(
  //     `/attraction/attraction-creation/${params.data.attractionsId}`
  //   ); //{`tour-pack-details/${alltour.attractionsId}`}"/attraction/attraction-creation"
  // };
  const columnDefs = [
    { headerName: "Ticket Type", field: "Name", rowGroup: true },
    { headerName: "Adult Or Child", field: "AdultorChild" },
    { headerName: "B2B price", field: "b2bPrice" },
    { headerName: "B2C price", field: "b2cprice" },
    { headerName: "Status", field: "tktBookingId" },
    // {
    //   headerName: "Action",
    //   field: "attName",
    //   cellRendererFramework: (params) => (
    //     <div>
    //       <Button color="primary" onClick={() => actionButton(params)}>
    //         <AiTwotoneEdit />
    //       </Button>
    //     </div>
    //   ),
    // },
  ];

  const [rowData, setrowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const setFillter = (attid) => {
    // console.log(tourlist[1].attractionId);
    // console.log(attid);
    // console.log([1].attractionId);
    const tktfilter = tourlist.filter((tour) => tour.attractionId == attid);

    // console.log(tktfilter);
    setrowData(tktfilter);
  };

  const onBtExport = () => {
    gridApi.exportDataAsExcel();
  };

  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };
  return (
    <>
      <Titlebanner title="Stock Summery" />
      <div className="App">
        <FormGroup>
          <Label for="exampleSelect">Select Attraction</Label>
          <Input
            type="select"
            name="select"
            id="exampleSelect"
            onChange={(e) => setFillter(e.target.value)}
          >
            {attractionList.map((attration, index) => (
              <option value={attration.value}> {attration.name}</option>
            ))}
          </Input>
        </FormGroup>

        <div className="ag-theme-alpine" style={{ height: "500px" }}>
          <div>
            <button
              onClick={() => onBtExport()}
              style={{ marginBottom: "5px", fontWeight: "bold" }}
            >
              Export to Excel
            </button>
          </div>
          <AgGridReact
            id="Inventory"
            columnDefs={columnDefs}
            rowData={rowData}
            defaultColDef={defaultColDef}
            // onGridReady={onGridReady}
            pagination={true}
            // paginationPageSize={5}
            // paginationAutoPageSize={true}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
};

export default Stacksummeryreport;

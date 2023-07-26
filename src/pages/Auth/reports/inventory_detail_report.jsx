import { React, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import requests from "../../../utils/Requests";
import { Label, FormGroup, Input, Alert, Spinner, Button } from "reactstrap";
import Titlebanner from "../../../globel_cmponents/title_banner";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const Inventortdetailreport = () => {
  let TktList = [];
  useEffect(() => {
    apicall();
  }, []);
  const [tourlist, setTourlist] = useState([]);

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

  const getdata = (Name, attId) => {
    axios
      .post(requests.getTicketListForAttraction, {
        attractionId: attId,
        secretKey: requests.apiKey,
      })
      .then((res) => {
        // console.log(res.data);
        // console.log(res.data[1].tktBatch);
        setRecordForTable(res.data, Name);
        setisLoading(0);
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

  const setRecordForTable = (record, Name) => {
    TktList = record;

    const tableRecord = record.map(
      ({ tktFormat, tktType, tktPurchase, tktExpiry, tktAdultOrChild }) => ({
        attrName: Name,
        tktName: tktFormet(tktFormat),
        tktType: tktType,
        tktPurchase: tktPurchase.substring(0, 10),
        tktExpiry: tktExpiry.substring(0, 10),
        tktAdultOrChild: tktAdultOrChild,
      })
    );

    setTourlist(tableRecord);
    setGridApi(tableRecord);

    setrowData(tableRecord);
  };
  const tktFormet = (tktFormet) => {
    // 1 Dubai 2 Ferrari 3 others 4 expo
    if (tktFormet == 1) {
      return "Dubai";
    } else if (tktFormet == 2) {
      return "Ferrari";
    } else if (tktFormet == 3) {
      return "Others";
    } else if (tktFormet == 4) {
      return "Expo";
    } else {
      return null;
    }
  };

  // const SoldOrAvilable = (tktBookingId) => {
  //   if (tktBookingId == 0) {
  //     return "Available";
  //   } else {
  //     return "Sold";
  //   }
  // };

  const columnDefs = [
    { headerName: "Attraction", field: "attrName" },
    { headerName: "Ticket Formet", field: "tktName" },
    { headerName: "Ticket Type", field: "tktType" },
    { headerName: "Purchase Date", field: "tktPurchase" },
    { headerName: "Expiry Date", field: "tktExpiry" },
    { headerName: "Adult Or Child", field: "tktAdultOrChild" },
  ];

  const [rowData, setrowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const setFillter = (attid) => {
    // console.log(tourlist[1].attractionId);
    // console.log(attid);
    // console.log([1].attractionId);
    setisLoading(1);
    const tktfilter = attractionList.filter((tour) => tour.value == attid);

    getdata(tktfilter[0].name, tktfilter[0].value);
  };

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
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
    minWidth: 100,
  };
  return (
    <>
      <Titlebanner title="Inventory Detail Report" />
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

        {isLoading == 1 ? (
          <>
            {" "}
            <Alert color="primary">
              Your Data Is Loading Please Wait <Spinner color="light" />
            </Alert>
          </>
        ) : null}

        <div className="ag-theme-alpine" style={{ height: "500px" }}>
          <div>
            {isLoading == 0 ? (
              <Button
                color="primary"
                onClick={(e) => exportToCSV(rowData, "Stack_Report")}
              >
                Download CSV
              </Button>
            ) : null}
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

export default Inventortdetailreport;

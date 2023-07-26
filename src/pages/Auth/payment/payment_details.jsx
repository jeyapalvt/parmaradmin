import Titlebanner from "../../../globel_cmponents/title_banner";
import { Link } from "react-router-dom";
import RenderField from "../../formcomponent/formfields/RenderField";
import { Form, Field, reduxForm } from "redux-form";
import Select from "react-select";
import {
  Button,
  Row,
  Col,
  Label,
  Spinner,
  Alert,
  Input,
  FormGroup,
} from "reactstrap";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import requests from "../../../utils/Requests";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import axios from "axios";

const Paymentdetails = () => {
  useEffect(() => {
    getagency();
  }, []);

  let attraction = { attractionsId: 1, secretKey: requests.apiKey };
  const [agencyList, setagencyList] = useState([]);

  const getagency = () => {
    axios
      .post(requests.getagencylist, attraction)
      .then((res) => {
        let values = [...agencyList];
        values.length = 0;
        values.push({
          label: "Select Agent",
          value: 0,
        });
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            label: res.data[i].agencyName,
            value: res.data[i].agencyId,
          });
        }
        setagencyList(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [tourlist, setTourlist] = useState([]);

  const [attractionList, setattractionList] = useState([
    { name: "", value: "" },
  ]);
  const [isLoading, setisLoading] = useState(0);

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

  // const SoldOrAvilable = (tktBookingId) => {
  //   if (tktBookingId == 0) {
  //     return "Available";
  //   } else {
  //     return "Sold";
  //   }
  // };

  const [rowData, setrowData] = useState([""]);
  const [gridApi, setGridApi] = useState(null);
  // const setFillter = (attid) => {
  //   // console.log(tourlist[1].attractionId);
  //   // console.log(attid);
  //   // console.log([1].attractionId);
  //   setisLoading(1);
  //   const tktfilter = attractionList.filter((tour) => tour.value == attid);

  //   console.log(tktfilter[0].name);
  //   getdata(tktfilter[0].name, tktfilter[0].value);
  // };

  const getPayDetails = (agentId) => {
    axios
      .post(requests.getTopupList, {
        agencyId: agentId,
        secretKey: requests.apiKey,
      })
      .then((respoce) => {
        //  setrowData(respoce.data);
        setRecord(respoce.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setRecord = (tempData) => {
    const tempRecord = tempData.map(
      ({
        tranCreditLimit,
        trnDate,
        paymentType,
        trnRemarks,
        tranCreditAmount,
        tranCurrentBanlance,
      }) => ({
        tranCreditLimit: tranCreditLimit,
        trnDate: trnDate,
        paymentType: paymentType,
        trnRemarks: trnRemarks,
        tranCreditAmount: tranCreditAmount,
        tranCurrentBanlance: tranCurrentBanlance,
      })
    );
    setrowData(tempRecord);
  };

  const columnDefs = [
    { headerName: "Credit Limit", field: "tranCreditLimit" },
    { headerName: "Updated On", field: "trnDate" },
    { headerName: "Payment Type", field: "paymentType" },
    { headerName: "Remark", field: "trnRemarks" },

    { headerName: "Credited Amount", field: "tranCreditAmount" },
    { headerName: "Current Balance", field: "tranCurrentBanlance" },
  ];
  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
    minWidth: 100,
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

  return (
    <>
      <Titlebanner title="Payment Details" />
      <div className="float-right">
        <Link
          to="/payment/add-payment-creation"
          class="btn btn-primary"
          role="button"
        >
          Create New
        </Link>
      </div>

      <br></br>

      <div className="App">
        <FormGroup>
          <Label for="exampleSelect">Select Agent</Label>
          {/* <Input
            type="select"
            name="select"
            id="exampleSelect"
            onChange={(e) => getPayDetails(e.target.value)}
          >
            {agencyList.map((agencyList, index) => (
              <option value={agencyList.value}> {agencyList.name}</option>
            ))}
          </Input> */}
          <Select
            // value={selectedOption}
            onChange={(e) => getPayDetails(e.value)}
            options={agencyList}
          />
          {/* <Field
              name='currentUser'
              label='Customer '
              component={RenderField.RenderSelectField}
              options={agencyList}
              onChange={(e) => {
                getPayDetails(e);
              }}
            /> */}
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
            {rowData != "" && (
              <Button
                color="primary"
                onClick={(e) => exportToCSV(rowData, "Payment_Report")}
              >
                Download CSV
              </Button>
            )}
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

export default Paymentdetails;

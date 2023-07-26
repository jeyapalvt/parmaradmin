/** @format */

import Titlebanner from "../../../globel_cmponents/title_banner";
import { useState, useEffect } from "react";
import { Label, Row, Col, Button, Alert, Spinner, Input } from "reactstrap";
import { Field, Form, reduxForm } from "redux-form";
import RenderField from "../../formcomponent/formfields/RenderField";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import requests from "../../../utils/Requests";
import Swal from "sweetalert2";
import { FaFileDownload } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

import { GiRegeneration } from "react-icons/gi";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import React from "react";

const MonthlySalesReport = (props) => {
  // useEffect(() => {

  // }, []);
  // const getSalesReport = () => {

  // };

  const { handleSubmit, pristine, reset, submitting } = props;

  // 1 - Booked from Agent Credit Limit 2 - Booked for Agent from Super user Credit Limit
  const bookingAgent = [
    {
      value: "",
      name: "SELECT",
    },
    {
      value: 1,
      name: "Agent Credit",
    },
    {
      value: 2,
      name: "Super Admin Credit",
    },
  ];
  const [rowData, setrowData] = useState([]);
  const [isLoading, setisLoading] = useState(0);
  const [disableBtn, setdisableBtn] = useState(false);
  const [SelectMonth, setSelectMonth] = useState();
  const [SelectYear, setSelectYear] = useState();

  const getSalesDetails = (values) => {
    setdisableBtn(true);
    setisLoading(1);
    // console.log(`${JSON.stringify(values, null, 2)}`);

    const agentReport = {
      month: SelectMonth,
      year: SelectYear,
    };
    // .post(requests.getSalesReport, values)

    axios
      .post(requests.getMonthlySalesReport, agentReport)
      .then((responce) => {
        console.log(`${JSON.stringify(responce, null, 2)}`);
        setRecordForTable(responce.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setRecordForTable = (record) => {
    const tempRecord = record.map(
      ({
        bookingId,
        agencyName,
        attractionName,
        invoiceNumber,
        bookingDate,
        bookingPrice,
        nofAdult,
        nofChild,
      }) => ({
        bookingId: bookingId,
        agencyName: agencyName,
        attractionName: attractionName,
        invoiceNumber: invoiceNumber,
        bookingDate: bookingDate,
        bookingPrice: bookingPrice,
        nofAdult: nofAdult,
        nofChild: nofChild,
      })
    );
    setrowData(tempRecord);
    setisLoading(0);
    setdisableBtn(false);
  };

  const columnDefs = [
    { headerName: "Name", field: "agencyName" },
    { headerName: "Attraction", field: "attractionName" },
    { headerName: "Invoice ", field: "invoiceNumber" },
    { headerName: "Date", field: "bookingDate" },
    { headerName: "Price", field: "bookingPrice" },
    { headerName: "Adult", field: "nofAdult" },
    { headerName: "Child", field: "nofChild" },
  ];

  const paymode = (bookPaymentMode) => {
    if (bookPaymentMode == 1) {
      return "Online";
    } else {
      return "Credit";
    }
  };

  const actionButton = (params) => {
    // console.log(params);
    const fileURL =
      // "http://66.29.149.191:8080/filestorage/parmartour/images/" +
      " https://www.parmartours.com/filestorage/" + params.data.pdfFileName;
    const filename = "e-Ticket.pdf";
    download_file(fileURL, filename);
    //  alert(`${params.data.tourPackageId} `);
    //{`tour-pack-details/${alltour.attractionsId}`}"/attraction/attraction-creation"
  };

  /* Helper function */

  function download_file(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
      var save = document.createElement("a");
      save.href = fileURL;
      save.target = "_blank";
      var filename = fileURL.substring(fileURL.lastIndexOf("/") + 1);
      save.download = fileName || filename;
      if (
        navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) &&
        navigator.userAgent.search("Chrome") < 0
      ) {
        document.location = save.href;
        // window event not working here
      } else {
        var evt = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: false,
        });
        save.dispatchEvent(evt);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
      }
    }

    // for IE < 11
    else if (!!window.ActiveXObject && document.execCommand) {
      var _window = window.open(fileURL, "_blank");
      _window.document.close();
      _window.document.execCommand("SaveAs", true, fileName || fileURL);
      _window.close();
    }
  }

  const cancelTicket = (params) => {
    //   console.log(params.data.bookingId);

    Swal.fire({
      title: "Warning",
      text: "Are you sure to cancel this ticket?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .post(requests.cancelBooking, {
            bookingId: params.data.bookingId,
            secretKey: requests.apiKey,
          })
          .then((response) => {
            Swal.fire({
              title: "Success",
              text: "Your ticket was cancelled",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const generateTicket = (params) => {
    axios
      .post(requests.getGenerateTicketPdf, { bookingId: params.data.bookingId })
      .then((responce) => {
        //bookingTickPdfPath
        const fileURL =
          // "http://66.29.149.191:8080/filestorage/parmartour/images/" +
          " https://www.parmartours.com/filestorage/" +
          responce.data.bookingTickPdfPath;
        const filename = "e-Ticket.pdf";
        download_file(fileURL, filename);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
    resizable: true,
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

  const month = [
    { value: "", name: "Select Month" },
    { value: 1, name: "January" },
    { value: 2, name: "February" },
    { value: 3, name: "March" },
    { value: 4, name: "April" },
    { value: 5, name: "May" },
    { value: 6, name: "June" },
    { value: 7, name: "July" },
    { value: 8, name: "August" },
    { value: 9, name: "September" },
    { value: 10, name: "October" },
    { value: 11, name: "November" },
    { value: 12, name: "December" },
  ];

  const year = [
    { value: "", name: "Select Year" },
    { value: 2020, name: "2020" },
    { value: 2021, name: "2021" },
    { value: 2022, name: "2022" },
    { value: 2023, name: "2023" },
    { value: 2024, name: "2024" },
    { value: 2025, name: "2025" },
    { value: 2026, name: "2026" },
    { value: 2027, name: "2027" },
    { value: 2028, name: "2028" },
    { value: 2029, name: "2029" },
  ];

  //  cancelBooking   -> For Ticket Cacellation  variable Name    "bookingId": 73
  return (
    <>
      <Titlebanner title="Monthly Sales Report" />
      <Form onSubmit={handleSubmit(getSalesDetails.bind(this))}>
        <Row>
          <Col sm={3}>
            <Label for="exampleSelect">Select Month</Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              onChange={(e) => setSelectMonth(e.target.value)}
            >
              {month.map((item, index) => (
                <option value={item.value}> {item.name}</option>
              ))}
            </Input>
          </Col>
          <Col sm={3}>
            <Label for="exampleSelect">Select Year</Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              onChange={(e) => setSelectYear(e.target.value)}
            >
              {year.map((item, index) => (
                <option value={item.value}> {item.name}</option>
              ))}
            </Input>
          </Col>
        </Row>
        <br />
        <div className="float-center">
          <Button color="primary" disabled={disableBtn}>
            Submit
          </Button>{" "}
          &nbsp; &nbsp;&nbsp;
          <Button
            color="danger"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear
          </Button>{" "}
        </div>
      </Form>
      <br />
      {isLoading == 1 ? (
        <>
          {" "}
          <Alert color="primary">
            Your Data Is Loading Please Wait <Spinner color="light" />
          </Alert>
        </>
      ) : null}
      {isLoading == 0 ? (
        <Button
          color="primary"
          onClick={(e) => exportToCSV(rowData, "Monthly_Sales_Report")}
        >
          Download CSV
        </Button>
      ) : null}
      <br /> <br />
      <div className="App">
        <div className="ag-theme-alpine" style={{ height: "500px" }}>
          <AgGridReact
            id="Inventory"
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
    </>
  );
};

export default reduxForm({
  form: "MonthlySalesReport",
})(MonthlySalesReport);

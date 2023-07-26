/** @format */

import Titlebanner from "../../../globel_cmponents/title_banner";
import { useState, useEffect } from "react";
import {
  Label,
  Row,
  Col,
  Button,
  Alert,
  Spinner,
  Card,
  CardBody,
} from "reactstrap";
import { Field, Form, reduxForm } from "redux-form";
import RenderField from "../../formcomponent/formfields/RenderField";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import requests from "../../../utils/Requests";
import Swal from "sweetalert2";
import { FaFileDownload, FaFileInvoice } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

import { GiRegeneration } from "react-icons/gi";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import React from "react";

const BookingList = (props) => {
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

  const [ShowSuperAdmin, setShowSuperAdmin] = useState(false);

  const getSalesDetails = (values) => {
    setisLoading(1);
    // console.log(`${JSON.stringify(values, null, 2)}`);

    const agentReport = {
      startDate: values.startDate,
      endDate: values.endDate,
    };
    // .post(requests.getSalesReport, values)

    axios
      .post(requests.getBookingList, agentReport)
      .then((responce) => {
        // console.log(`${JSON.stringify(responce, null, 2)}`);
        setRecordForTable(responce.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSalesDetailssuperadmin = (values) => {
    // console.log("super admin");
    // console.log(`${JSON.stringify(values, null, 2)}`);
    setisLoading(1);
    const superAdminObj = {
      startDate: values.startDate,
      endDate: values.endDate,
      bookedByBackOffice: true,
      bookedCreditLimit: values.bookedCreditLimit,
      secretKey: requests.apiKey,
    };
    // console.log(`${JSON.stringify(superAdminObj, null, 2)}`);
    axios
      .post(requests.getSalesReportForSuperAdmin, superAdminObj)
      .then((response) => {
        // console.log("Super Admin Res", response);
        // console.log("Super Admin Res", response.data);
        setRecordForTable(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [rowData, setrowData] = useState([]);
  const [isLoading, setisLoading] = useState(0);

  const setRecordForTable = (record) => {
    const tempRecord = record.map(
      ({
        bookingId,
        ticketNumber,
        bookingRefNumber,
        transactionId,
        attractionName,
        paxName,
        contactNumber,
        salesAmountAdult,
        bookingDate,
        bookPaymentMode,
        invoiceNumber,
        pdfFileName,
      }) => ({
        bookingId: bookingId,
        ticketNumber: ticketNumber,
        bookingRefNumber: bookingRefNumber,
        transactionId: transactionId,
        attractionName: attractionName,
        paxName: paxName,
        contactNumber,
        contactNumber: contactNumber,
        salesAmountAdult: salesAmountAdult,
        bookingDate: bookingDate,
        invoiceNumber: invoiceNumber,
        bookPaymentMode: paymode(bookPaymentMode),
        pdfFileName: pdfFileName,
      })
    );
    setrowData(tempRecord);
    setisLoading(0);
  };
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
      "https://www.parmartours.com/filestorage/" + params.data.pdfFileName;
    const filename = "e-Ticket.pdf";
    download_file(fileURL, filename);
    //  alert(`${params.data.tourPackageId} `);
    //{`tour-pack-details/${alltour.attractionsId}`}"/attraction/attraction-creation"
  };

  /* Helper function */

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
    Swal.fire({
      title: "Please wait your ticket is loading... ",

      showConfirmButton: false,
    });
    axios
      .post(requests.getGenerateTicketPdf, { bookingId: params.data.bookingId })
      .then((responce) => {
        //bookingTickPdfPath status

        console.log(responce.data);
        if (responce.status == 200) {
          Swal.fire({
            title: "Success",
            text: "Ticket is downloaded ",
            icon: "success",
          });
        }
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

  const generateInvoice = (params) => {
    console.log(params.data);
    axios
      .post(requests.generateXeroInvoice, {
        xeroInvoiceNumber: params.data.invoiceNumber,
      })
      .then((res) => {
        console.log("Res.data", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const columnDefs = [
    { headerName: "Booking RefNo", field: "bookingRefNumber" },
    { headerName: "Invoice ", field: "invoiceNumber" },

    { headerName: "Attraction Name", field: "attractionName" },
    { headerName: "Pax Name", field: "paxName" },
    { headerName: "Number", field: "contactNumber" },
    { headerName: "Sales Amount", field: "salesAmountAdult" },
    { headerName: "Sales Date", field: "bookingDate" },
    { headerName: "PaymentMode", field: "bookPaymentMode" },
    {
      headerName: "Actions",
      filter: false,
      field: "ticketNumber",
      cellRendererFramework: (params) => (
        <div>
          <Button color="primary" onClick={() => actionButton(params)}>
            <FaFileDownload />
          </Button>
        </div>
      ),
    },
    {
      headerName: "Actions",
      filter: false,
      field: "ticketNumber",
      cellRendererFramework: (params) => (
        <Button color="danger" onClick={() => cancelTicket(params)}>
          <GiCancel />
        </Button>
      ),
    },
    {
      headerName: "Ticket-Generate",
      filter: false,
      field: "ticketNumber",
      cellRendererFramework: (params) => (
        <div>
          <Button color="success" onClick={() => generateTicket(params)}>
            <GiRegeneration />
          </Button>
        </div>
      ),
    },
    {
      headerName: "Invoice-Generate",
      filter: false,
      field: "invoiceNumber",
      cellRendererFramework: (params) => (
        <div>
          <Button color="success" onClick={() => generateInvoice(params)}>
            <FaFileInvoice />
          </Button>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    sortable: true,
    editable: false,
    //flex: 1,
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

  //  cancelBooking   -> For Ticket Cacellation  variable Name    "bookingId": 73
  return (
    <>
      <Titlebanner title="All Booking List " />

      {/* <div className="single-widget-search-input-title">
        <Label>Super Admin Report</Label> &nbsp;&nbsp;&nbsp;
        <input
          name="BookFOrAgent"
          type="checkbox"
          onChange={(e) => setShowSuperAdmin(e.target.checked)}
        />
      </div> */}

      {ShowSuperAdmin == true ? (
        <>
          <br />
          <br />
          <Form onSubmit={handleSubmit(getSalesDetailssuperadmin.bind(this))}>
            <Row>
              <Col sm={3}>
                <Field
                  name="bookedCreditLimit" // 1 - Booked from Agent Credit Limit 2 - Booked for Agent from Super user Credit Limit
                  type="select"
                  customfeild={bookingAgent}
                  label="Credit Type"
                  component={RenderField.renderOptionField}
                />
              </Col>

              <Col sm={3}>
                <Field
                  name="startDate"
                  type="date"
                  label="Start Date"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col sm={3}>
                <Field
                  name="endDate"
                  type="date"
                  label="End Date"
                  component={RenderField.RenderTextField}
                />
              </Col>
            </Row>
            <div className="float-center">
              <Button color="primary" disabled={submitting}>
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
        </>
      ) : (
        <>
          {" "}
          <br />
          <br />
          <Form onSubmit={handleSubmit(getSalesDetails.bind(this))}>
            <Row>
              <Col sm={3}>
                <Field
                  name="startDate"
                  type="date"
                  label="Start Date"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col sm={3}>
                <Field
                  name="endDate"
                  type="date"
                  label="End Date"
                  component={RenderField.RenderTextField}
                />
              </Col>
            </Row>
            <div className="float-center">
              <Button color="primary" disabled={submitting}>
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
        </>
      )}

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
          onClick={(e) => exportToCSV(rowData, "Daily_Sales_Report")}
        >
          Download CSV
        </Button>
      ) : null}
      <br />

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
  form: "BookingList",
})(BookingList);

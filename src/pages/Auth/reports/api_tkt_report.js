import Titlebanner from "../../../globel_cmponents/title_banner";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useState, useEffect } from "react";
import axios from "axios";
import requests from "../../../utils/Requests";
import { FaFileDownload } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
const ApiTicketReport = () => {
  const [rowData, setrowData] = useState([]);
  const [isLoading, setisLoading] = useState(0);
  useEffect(() => {
    getApiTktreport();
  }, []);

  const getApiTktreport = () => {
    console.log("Api Report ");
    axios
      .post(requests.getSalesReportForBurjKhalifa, {
        bookingId: 0,
        secretKey: requests.apiKey,
      })
      .then((response) => {
        console.log("Api Report ", response.data);
        setRecordForTable(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("Error ");
      });
  };
  const setRecordForTable = (record) => {
    const tempRecord = record.map(
      ({
        bookingId,
        burjKhalifaOrderNo,
        bookNumber,
        xeroInvoiceNumber,
        bookPaymentMode,
        bookCustomerName,
        bookMobileNumber,
        bookTotal,
        bookDate,
        bookingTickPdfPath,
      }) => ({
        bookingId: bookingId,
        burjKhalifaOrderNo: burjKhalifaOrderNo,
        bookNumber: bookNumber,
        xeroInvoiceNumber: xeroInvoiceNumber,
        bookPaymentMode: paymode(bookPaymentMode),
        bookCustomerName: bookCustomerName,
        bookMobileNumber: bookMobileNumber,
        bookTotal: bookTotal,
        bookDate: bookDate,
        bookingTickPdfPath: bookingTickPdfPath,
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
  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };

  const columnDefs = [
    { headerName: "Reference Number", field: "burjKhalifaOrderNo" },
    { headerName: "Order Number", field: "bookingId" },
    { headerName: "Booking RefNo", field: "bookNumber" },
    { headerName: "Invoice ", field: "xeroInvoiceNumber" },
    { headerName: "Transaction", field: "bookPaymentMode" },
    { headerName: "Pax Name", field: "bookCustomerName" },
    { headerName: "Number", field: "bookMobileNumber" },
    { headerName: "Sales Amount", field: "bookTotal" },
    { headerName: "Sales Date", field: "bookDate" },
    {
      headerName: "Actions",
      filter: false,
      field: "bookingTickPdfPath",
      cellRendererFramework: (params) => (
        <div>
          <Button color="primary" onClick={() => actionButton(params)}>
            <FaFileDownload />
          </Button>
          &nbsp;&nbsp;
          <Button color="danger" onClick={() => cancelTicket(params)}>
            <GiCancel />
          </Button>
        </div>
      ),
    },
  ];

  const actionButton = (params) => {
    // console.log("params", params.value);
    const fileURL =
      // "http://66.29.149.191:8080/filestorage/parmartour/images/" +
      " https://www.parmartours.com/filestorage/" + params.value;
    const filename = "e-Ticket.pdf";
    download_file(fileURL, filename);
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
          .post(requests.cancelBurjTicket, {
            bookingId: params.data.bookingId,
            secretKey: requests.apiKey,
          })
          .then((response) => {
            console.log(response.data);
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
  return (
    <>
      <Titlebanner title="API Ticket Sales Report" />
      <Button
        color="primary"
        onClick={(e) => exportToCSV(rowData, "Api_Ticket_Sales_Report")}
      >
        Download CSV
      </Button>
      <br />
      <div className="App">
        <div className="ag-theme-alpine" style={{ height: "500px" }}>
          <AgGridReact
            id="API-Ticket-Sales-Report"
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

export default ApiTicketReport;

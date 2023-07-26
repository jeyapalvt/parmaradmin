import { React, useState, useEffect } from "react";
import { render } from "react-dom";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import requests from "../../../utils/Requests";
import { Button } from "reactstrap";

import Titlebanner from "../../../globel_cmponents/title_banner";
import { FaFileDownload } from "react-icons/fa";

const Pdfgenerate = () => {
  useEffect(() => {}, []);
  let history = useHistory();

  const onGridReady = (params) => {


    // const submitObject = {
    //   attractionId : 1,
  
    // }
    axios
      .post(requests.getbookingListAll, { attractionId: 1, secretKey: requests.apiKey })
      .then((res) => {
     
        params.api.applyTransaction({ add: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
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

  const actionButton = (params) => {
    console.log(params);
    const fileURL =
      // "http://66.29.149.191:8080/filestorage/parmartour/images/" +
      " https://www.parmartours.com/filestorage/" +
      params.data.bookNumber +
      ".pdf";
    const filename = "e-Ticket.pdf";
    download_file(fileURL, filename);
    //  alert(`${params.data.ticketTypeId} `);
    //{`tour-pack-details/${alltour.attractionsId}`}"/attraction/attraction-creation"
  };
  const columnDefs = [
    { headerName: " Name", field: "bookCustomerName" },
    { headerName: " Email", field: "bookCustomerEmail" },
    { headerName: " Mobile Number", field: "bookMobileNumber" },
    { headerName: "Ref_number", field: "bookNumber" },
    { headerName: "Book Date", field: "bookDate" },
    { headerName: "Travel Date", field: "bookTravellDate" },

    {
      headerName: "Action",
      filter: false,
      field: "bookNumber",
      cellRendererFramework: (params) => (
        <div>
          <Button color="primary" onClick={() => actionButton(params)}>
            <FaFileDownload />
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
      <Titlebanner title="Booking List" />

      <div className="App">
        <div className="ag-theme-alpine" style={{ height: "500px" }}>
          <AgGridReact
            columnDefs={columnDefs}
            // rowData={rowData}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            pagination={true}
            // paginationPageSize={5}
            paginationAutoPageSize={true}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
};

export default Pdfgenerate;

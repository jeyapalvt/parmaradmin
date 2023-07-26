import { React, useState, useEffect } from "react";
import { render } from "react-dom";
import Swal from "sweetalert2";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import requests from "../../../utils/Requests";
import { Button } from "reactstrap";

import Titlebanner from "../../../globel_cmponents/title_banner";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { propTypes } from "react-bootstrap/esm/Image";
const Markuplisttable = () => {
  useEffect(() => {}, []);

  let history = useHistory();
  const onGridReady = (params) => {
    //  console.log("grid is ready");

    axios
      .post(requests.getmarkupdiscountlist, { markupDiscountId: 1 })
      .then((res) => {
        params.api.applyTransaction({ add: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const actionButton = (params) => {
    //alert(`${params.data.attName} `);
    history.push(
      `/payment/markup-discount-create/${params.data.markupDiscountId}`
    ); //{`tour-pack-details/${alltour.attractionsId}`}"/attraction/attraction-creation"
  };
  const columnDefs = [
    { headerName: "Attraction ", field: "attractionName" },
    { headerName: "Ticket Type", field: "ticketTypeName" },
    { headerName: "Customer Type", field: "customerTypeName" },
    { headerName: "Agency Name", field: "agencyName" },
    { headerName: "Adult (%)", field: "markupAdultDiscountPercentage" },
    { headerName: "Child (%) ", field: "markupChildDiscountPercentage" },

    {
      headerName: "Action",
      filter: false,
      field: "markupDiscountId",
      cellRendererFramework: (params) => (
        <div>
          <Button color="primary" onClick={() => actionButton(params)}>
            <AiTwotoneEdit />
          </Button>
        </div>
      ),
    },
    {
      headerName: "Delete",
      filter: false,
      field: "markupDiscountId",
      cellRendererFramework: (params) => (
        <div>
          <Button color="danger" onClick={() => deleteMarkup(params)}>
            <AiFillDelete />
          </Button>
        </div>
      ),
    },
  ];

  const deleteMarkup = (params) => {
    //   console.log(params.data.bookingId);

    Swal.fire({
      title: "Warning",
      text: "Are you sure to remove this markup?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .post(requests.deleteMarkupDiscount, {
            markupDiscountId: params.data.markupDiscountId,
          })
          .then((response) => {
            console.log("res.data", response.data);
            if (response.data.errorCode === 200) {
              Swal.fire({
                title: "Success",
                text: "Markup was removed",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
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

export default Markuplisttable;

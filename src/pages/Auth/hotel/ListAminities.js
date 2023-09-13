import React from "react";
import Titlebanner from "../../../globel_cmponents/title_banner";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import requests from "../../../utils/Requests";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
const ListAminities = () => {
  const history = useHistory();

  const onGridReady = (params) => {
    //  console.log("grid is ready");

    axios
      .post(requests.getAmenitiesList, { amenitiesId: 1 })
      .then((res) => {
        params.api.applyTransaction({ add: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columnDefs = [
    { headerName: "Icon Name", field: "iconName" },
    { headerName: "Aminity Name", field: "amenitiesName" },

    {
      headerName: "Action",
      field: "amenitiesId",
      cellRendererFramework: (params) => (
        <div>
          <Button color="danger" onClick={() => actionButton(params)}>
            <AiFillDelete />
          </Button>
        </div>
      ),
    },
  ];
  const actionButton = (params) => {
    //  alert(`${params.data.tourPackageId} `);
    console.log(params.data.amenitiesId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(requests.deleteAmenities, {
            amenitiesId: params.data.amenitiesId,
          })
          .then((res) => {
            console.log(res.data);

            Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
    <div>
      <Titlebanner title="Aminitie List" />
      <Button
        color="primary"
        onClick={() => history.push("/hotel/create-amities")}
      >
        Create New
      </Button>

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
    </div>
  );
};

export default ListAminities;

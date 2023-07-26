import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../../../utils/Requests";
import { reduxForm, Field } from "redux-form";
import RenderField from "../../formcomponent/formfields/RenderField";
import Titlebanner from "../../../globel_cmponents/title_banner";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
const AddonStockReport = (props) => {
  const { handleSubmit } = props;
  useEffect(() => {
    getallparkgroup();
  }, []);
  const [parkGroup, setparkGroup] = useState([{ value: "", name: "" }]);
  const getallparkgroup = async () => {
    await axios
      .post(requests.getAttractionAllForList, { attractionsId: 1 })
      .then((res) => {
        const values = [...parkGroup];
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            name: res.data[i].attName,
            value: res.data[i].attractionsId,
          });
          // console.log(values);
        }
        setparkGroup(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [rowData, setrowData] = useState([]);
  const getAddonAll = async (attId) => {
    await axios
      .post(requests.getAddonBarcodeForAttraction, { addonAttractionId: attId })
      .then((res) => {
        // console.log(res.data);

        initialRecord(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const initialRecord = (tempData) => {
    const tempRecord = tempData.map(
      ({ addonName, addonPrice, available, totalUploaded }) => ({
        addonName: addonName,
        addonPrice: addonPrice,
        available: available,
        totalUploaded: totalUploaded,
      })
    );
    setrowData(tempRecord);
  };
  const columnDefs = [
    { headerName: "Name", field: "addonName" },
    { headerName: "Price", field: "addonPrice" },
    { headerName: "Available", field: "available" },
    { headerName: "Uploaded", field: "totalUploaded" },
  ];
  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };
  return (
    <div>
      <Titlebanner title="Addon Stock Report" />
      <Field
        name="attractionId"
        type="select"
        label="Select Attraction"
        customfeild={parkGroup}
        component={RenderField.renderOptionField}
        onChange={(e) => getAddonAll(e.target.value)}
      />
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
    </div>
  );
};

export default reduxForm({
  form: "AddonStockReport",
})(AddonStockReport);

import { Card, CardBody, Button, Row, Col, Label } from "reactstrap";
import { Form, Field, reduxForm } from "redux-form";
import RenderField from "../../../formcomponent/formfields/RenderField";
import { useEffect, useState } from "react";
import axios from "axios";
import requests from "../../../../utils/Requests";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const AgencylistToMarkup = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const aciveStatus = [
    { value: "", name: "" },
    { value: "Active", name: "Active" },
    { value: "InActive", name: "InActive" },
  ];

  useEffect(() => {
    getAgency();
    onGridReady();
    props.initialize({
      customerTypeId: props.groupid,
    });
    // getCustomertype(props.groupid);
  }, []);

  let attraction = { attractionsId: props.groupid, secretKey: requests.apiKey
  };
  let getcustomertype = { customerTypeId: props.groupid };
  const [agencyList, setagencyList] = useState([]);
  const getAgency = () => {
    axios
      .post(requests.getagencylist, attraction)
      .then((res) => {
        const values = [...agencyList];
        values.length = 0;
        values.push({
          name: "Select Agency",
          value: "",
        });
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            name: res.data[i].agencyName,
            value: res.data[i].agencyId,
          });
        }
        setagencyList(values);
      
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onGridReady = (params) => {
   
    axios
      .post(requests.getCustomerTypeAgency, getcustomertype)
      .then((res) => {
        params.api.applyTransaction({ add: res.data });
       
      
      })
      .catch((err) => {
      
        console.log(err);
      });
  };

  const columnDefs = [
    { headerName: " Name", field: "agencyName" },
    { headerName: " Email", field: "agencyEmail" },
    { headerName: "Mobile", field: "agencyPhoneNumber" },
    { headerName: "Company Type", field: "agencyCompanyType" },
  ];

  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };
  return (
    <>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Label>Name</Label>
                </Col>
                <Col>{props.name}</Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Label>Active Status</Label>
                </Col>
                <Col>{props.status}</Col>
              </Row>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={3}>
              <Label>Active Status</Label>
            </Col>
            <Col>{props.desc}</Col>
          </Row>

          <Form onSubmit={handleSubmit}>
            <Field
              name="customerTypeId"
              type="hidden"
              component={RenderField.RenderTextField}
            />
            <Field
              name="agencyId"
              type="select"
              customfeild={agencyList}
              component={RenderField.renderOptionField}
              label="Select Agency "
            />{" "}
            <div className="float-right">
              <Button color="primary" disabled={submitting}>
                Add
              </Button>{" "}
              &nbsp; &nbsp;&nbsp;
            </div>
          </Form>
        </CardBody>
      </Card>

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
export default reduxForm({
  form: "AgencylistToMarkup",
})(AgencylistToMarkup);

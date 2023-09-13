import React, { useEffect, useState } from "react";
import Titlebanner from "../../../globel_cmponents/title_banner";
import RenderField from "../../formcomponent/formfields/RenderField";
import { Field, reduxForm } from "redux-form";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import requests from "../../../utils/Requests";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Swal from "sweetalert2";
const ReviewList = () => {
  useEffect(() => {
    getallparkgroup();
  }, []);
  const [parkGroup, setparkGroup] = useState([]);
  const [attractionList, setattractionList] = useState([]);
  const [attId, setattId] = useState();
  const getallparkgroup = async () => {
    await axios
      .post(requests.getallparkgroup, { attractionsId: 1 })
      .then((res) => {
        const values = [...parkGroup];
        values.push({
          name: "Select Your Attraction Group",
          value: "",
        });
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            name: res.data[i].grpName,
            value: res.data[i].attractionGroupId,
          });
          // console.log(values);
        }
        setparkGroup(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getattractionbygroup = async (groupId) => {
    await axios
      .post(requests.getattractionallbygroup, { attGroup: groupId })
      .then((res) => {
        const values = [...attractionList];
        values.length = 0;
        values.push({
          name: "Select Your Attraction",
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
      .catch((err) => {
        console.log(err);
      });
  };
  const [rowData, setrowData] = useState([]);
  const getList = async () => {
    await axios
      .post(requests.getCustomerReviewList, {
        attractionId: attId,
      })
      .then((res) => {
        setrowData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const columnDefs = [
    { headerName: "Category", field: "reviewCategory" },
    { headerName: "Ratting", field: "reviewRating" },

    {
      headerName: "Action",
      field: "tourName",
      cellRendererFramework: (params) => (
        <div>
          <Button color="danger" onClick={() => actionButton(params)}>
            {/* <AiTwotoneEdit /> */}
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const actionButton = (params) => {
    console.log(params.data.customerReviewId);
    Swal.fire({
      title: "Warning",
      text: "Are you sure to delete this review?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .post(requests.deleteCustomerReview, {
            customerReviewId: params.data.customerReviewId,
          })
          .then((response) => {
            getList();
            Swal.fire({
              title: "Success",
              text: "Deleted Successfully",
              icon: "success",
            });
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
      <Titlebanner title="Review List" />
      <div className="float-right">
        <Link
          to="/randf/createreview/null"
          class="btn btn-primary"
          role="button"
        >
          Create New
        </Link>
      </div>
      <br />
      <br />
      <br />
      <Card>
        <CardBody>
          <Row>
            <Col>
              <Field
                name="ttGroupId"
                type="select"
                label="Attraction Group"
                customfeild={parkGroup}
                component={RenderField.renderOptionField}
                id="attGroup"
                onChange={(e) => getattractionbygroup(e.target.value)}
              />
            </Col>
            <Col>
              <Field
                name="attractionId" //attractionList
                type="select"
                label="Atrraction List"
                // value={attTemp}
                customfeild={attractionList}
                component={RenderField.renderOptionField}
                onChange={(e) => setattId(e.target.value)}
              />
            </Col>
            <Col>
              <div
                style={{
                  marginTop: "30px",
                }}
              >
                <Button color="primary" onClick={() => getList()}>
                  Get List
                </Button>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <div className="App">
        <div className="ag-theme-alpine" style={{ height: "500px" }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            defaultColDef={defaultColDef}
            //onGridReady={onGridReady}
            pagination={true}
            // paginationPageSize={5}
            paginationAutoPageSize={true}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({
  form: "ReviewList",
})(ReviewList);

import React, { useEffect } from "react";
import { Form, Field, reduxForm } from "redux-form";
import { CardBody, Card, Button, Row, Col, Label } from "reactstrap";
import RenderField from "../../formcomponent/formfields/RenderField";
import DropZoneSingleRender from "../../formcomponent/formfields/dropzonSingle/DropZoneSingleRender";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import requests from "../../../utils/Requests";
const validate = (values) => {
  const errors = {};
  if (!values.expressCost) {
    errors.expressCost = "Required";
  }
  if (!values.country) {
    errors.country = "Required";
  }
  if (!values.visaDuration) {
    errors.visaDuration = "Required";
  }
  if (!values.visaName) {
    errors.visaName = "Required";
  }
  if (!values.visaPrice) {
    errors.visaPrice = "Required";
  }
  if (!values.visaShortDescription) {
    errors.visaShortDescription = "Required";
  }
  return errors;
};
const CreateVisaForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const groupList = [
    { name: "", value: "" },
    { name: "Dubai", value: "Dubai" },
    { name: "Abudabi", value: "Abudabi" },
  ];
  let history = useHistory();
  useEffect(() => {
    console.log(props.visaId);
    if (props.visaId != "null") {
      getVisaForUpdate();
    }
  }, []);

  const getVisaForUpdate = () => {
    axios
      .post(requests.getVisaList, { visaId: 0 })
      .then((response) => {
        const visaList = response.data;
        const tempVisaData = visaList.filter(
          (visa) => visa.visaId == props.visaId
        );
        //  console.log(res.data);
        initializeData(tempVisaData);
      })
      .catch((err) => {});
  };

  const initializeData = (tempValue) => {
    props.initialize({
      visaId: props.visaId,
      expressCost: tempValue[0].expressCost,
      country: tempValue[0].country,
      imageFile: tempValue[0].imageFile,
      visaDuration: tempValue[0].visaDuration,
      visaName: tempValue[0].visaName,
      visaPrice: tempValue[0].visaPrice,
      visaShortDescription: tempValue[0].visaShortDescription,
    });
  };
  const CreateVisa = (values) => {
    const submitObj = {
      ...values,
      platformId: 1,
    };
    axios
      .post(requests.setVisa, submitObj)
      .then((response) => {
        if (response.status == 200) {
          Swal.fire({
            title: "success!", //'Good job!',
            text: "New Visa Created Successfully", //'You clicked the button.',
            icon: "success", //'success'
          });
          history.push("/visa/visa-list");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Card>
        <Form onSubmit={handleSubmit(CreateVisa.bind(this))}>
          <CardBody>
            <Row>
              <Col xs={4}>
                <Field
                  name="visaName"
                  type="text"
                  label="Name"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col xs={8}>
                <Field
                  name="visaShortDescription"
                  type="textarea"
                  label="Description"
                  component={RenderField.RenderTextField}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Field
                  name="country"
                  type="select"
                  customfeild={groupList}
                  component={RenderField.renderOptionField}
                  label="Country"
                />
              </Col>
              <Col>
                <Field
                  name="visaPrice"
                  type="text"
                  label="Price"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col>
                <Field
                  name="expressCost"
                  type="text"
                  label="Express Cost"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col>
                <Field
                  name="visaDuration"
                  type="text"
                  label="Duration"
                  component={RenderField.RenderTextField}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Visa Image </Label>
                <Field
                  // key="field"
                  name="imageFile"
                  component={DropZoneSingleRender}
                />
              </Col>
            </Row>
            <br />
            <div className="float-right">
              <Button color="primary" className="btn btn-yellow">
                Save
              </Button>
              &nbsp; &nbsp;&nbsp;
              <Button
                color="danger"
                onClick={reset}
                disabled={submitting || pristine}
              >
                Cancel
              </Button>{" "}
            </div>
          </CardBody>
        </Form>
      </Card>
    </>
  );
};

export default reduxForm({
  validate,
  form: "CreateVisaForm",
})(CreateVisaForm);

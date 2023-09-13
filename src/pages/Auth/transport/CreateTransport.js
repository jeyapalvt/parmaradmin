import React from "react";
import Titlebanner from "../../../globel_cmponents/title_banner";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import { reduxForm, Field } from "redux-form";
import RenderField from "../../formcomponent/formfields/RenderField";

const validate = (values) => {
  const errors = {};
  if (!values.tktAdultOrChild) {
    errors.tktAdultOrChild = "Required";
  }
  return errors;
};

const CreateTransport = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const postToApi = (values) => {
    console.log(values);
  };
  return (
    <div>
      <Titlebanner title="Create Transport" />
      <Card>
        <CardBody>
          <Row>
            <Col>
              <label>Transfer Type</label>
              <div
                style={{
                  display: "flex",
                }}
              >
                <div
                  style={{
                    marginRight: "20px",
                  }}
                >
                  <p>
                    <Field
                      name="sharedOrPrivate"
                      component="input"
                      type="radio"
                      value="1"
                    />{" "}
                    Sharing
                  </p>
                </div>
                <div>
                  <p>
                    <Field
                      name="sharedOrPrivate"
                      component="input"
                      type="radio"
                      value="2"
                    />{" "}
                    Private
                  </p>
                </div>
              </div>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <Field
                name="plocation"
                type="text"
                label="Pickup Location"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Field
                name="dlocation"
                type="text"
                label="Drop Location"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Field
                name="userName"
                type="text"
                label="Display Name"
                component={RenderField.RenderTextField}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Field
                name="Currency"
                type="text"
                label="Currency"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Field
                name="userName"
                type="text"
                label="Upto Pax"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Field
                name="userName"
                type="text"
                label="Cost"
                component={RenderField.RenderTextField}
              />
            </Col>
          </Row>
          <div className="float-right">
            <Button
              color="primary"
              onClick={handleSubmit((values) =>
                postToApi({
                  ...values,
                  pill: 1,
                })
              )}
            >
              Save
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default reduxForm({
  form: "CreateTransport",
  validate,
})(CreateTransport);

// {touched && error && <span className="error text-danger">{error}</span>}

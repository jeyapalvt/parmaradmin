import React, { useEffect, useState } from "react";
import Titlebanner from "../../../globel_cmponents/title_banner";
import axios from "axios";
import requests from "../../../utils/Requests";
import { Field, reduxForm } from "redux-form";
import { Card, Col, Row, CardBody, Button } from "reactstrap";
import RenderField from "../../formcomponent/formfields/RenderField";
import Swal from "sweetalert2";

const validate = (values) => {
  const errors = {};
  if (!values.sharedOrPrivate) {
    errors.sharedOrPrivate = "Required";
  }
  if (!values.attractionId) {
    errors.attractionId = "Required";
  }
  if (!values.pickupLocation) {
    errors.pickupLocation = "Required";
  }
  if (!values.hour) {
    errors.hour = "Required";
  }
  if (!values.minute) {
    errors.minute = "Required";
  }
  if (!values.amOrpm) {
    errors.amOrpm = "Required";
  }
  if (!values.costPerPerson) {
    errors.costPerPerson = "Required";
  }
  if (!values.locationLat) {
    errors.locationLat = "Required";
  }
  if (!values.locationLong) {
    errors.locationLong = "Required";
  }
  return errors;
};
const AttractionTransport = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  useEffect(() => {
    getAttList();
  }, []);

  const hour = [
    { label: "01", value: "01" },
    { label: "02", value: "02" },
    { label: "03", value: "03" },
    { label: "04", value: "04" },
    { label: "05", value: "05" },
    { label: "06", value: "06" },
    { label: "07", value: "07" },
    { label: "08", value: "08" },
    { label: "09", value: "09" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
  ];
  const minute = [
    { label: "00", value: "00" },
    { label: "05", value: "05" },
    { label: "10", value: "10" },
    { label: "15", value: "15" },
    { label: "20", value: "20" },
    { label: "25", value: "25" },
    { label: "30", value: "30" },
    { label: "35", value: "35" },
    { label: "40", value: "40" },
    { label: "45", value: "45" },
    { label: "50", value: "50" },
    { label: "55", value: "55" },
  ];
  const amOrpm = [
    { label: "AM", value: "AM" },
    { label: "PM", value: "PM" },
  ];

  const [attList, setattList] = useState([]);
  const [transferType, settransferType] = useState();
  const getAttList = async () => {
    await axios
      .post(requests.getAttractionAllForList, { attractionsId: 1 })
      .then((res) => {
        const values = [...attList];
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            label: res.data[i].attName,
            value: res.data[i].attractionsId,
          });
          // console.log(values);
        }
        setattList(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postToApi = (values) => {
    const startingTime =
      values.hour + ":" + values.minute + ":" + values.amOrpm;

    const submitObject = {
      attractionId: values.attractionId,
      pickupLocation: values.pickupLocation,
      costPerPerson: values.costPerPerson,
      locationLat: values.locationLat,
      locationLong: values.locationLong,
      numberOfSeat: values.numberOfSeat,
      sharedOrPrivate: values.sharedOrPrivate,
      startingTime: startingTime,
    };
    console.log("submitObject", submitObject);
    axios
      .post(requests.setAttractionTransfer, submitObject)
      .then((res) => {
        console.log(res.data);
        if (res.data.errCode === 200) {
          Swal.fire("success", "Transfer Added Succesfully", "success");
        } else if (res.data.errCode === 251) {
          Swal.fire("warning", res.data.errMessage, "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGetTranferList = (e) => {
    console.log(e);
  };
  return (
    <div>
      <Titlebanner title="Attraction Transport" />
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
                      onChange={() => settransferType(1)}
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
                      onChange={() => settransferType(2)}
                    />{" "}
                    Private
                  </p>
                </div>
              </div>
            </Col>
            <Col>
              {transferType === 2 && (
                <Field
                  label="Number Of Seats"
                  name="numberOfSeat"
                  component={RenderField.RenderTextField}
                />
              )}
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <Field
                label="Select Attraction"
                name="attractionId"
                component={RenderField.RenderSelectField}
                options={attList}
                onChange={(e) => handleGetTranferList(e)}
              />
            </Col>

            <Col>
              <Field
                label="Pickup loaction"
                name="pickupLocation"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Row>
                <Col>
                  <Field
                    label="Hour"
                    name="hour"
                    component={RenderField.RenderSelectField}
                    options={hour}
                  />
                </Col>
                <Col>
                  <Field
                    label="Minute"
                    name="minute"
                    component={RenderField.RenderSelectField}
                    options={minute}
                  />
                </Col>
                <Col>
                  <Field
                    label="AM/PM"
                    name="amOrpm"
                    component={RenderField.RenderSelectField}
                    options={amOrpm}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Field
                label="Cost Per Persion"
                name="costPerPerson"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Field
                label="Location Latitude"
                name="locationLat"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Field
                label="Location  Longitude"
                name="locationLong"
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
  form: "AttractionTransport",
  validate,
})(AttractionTransport);

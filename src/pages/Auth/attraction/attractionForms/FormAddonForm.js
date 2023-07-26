/** @format */

import { Card, CardBody, Button, Row, Col } from "reactstrap";
import { Form, Field, reduxForm, reset } from "redux-form";
import axios from "axios";
import requests from "../../../../utils/Requests";
import RenderField from "../../../formcomponent/formfields/RenderField";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const FormAddonForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const [reminder, setReminder] = useState("");
  useEffect(() => {
    getallparkgroup();
    // apicall();
  }, []);
  let attraction = { attractionsId: 1 };
  const [parkGroup, setparkGroup] = useState([{ value: "", name: "" }]);
  const getallparkgroup = async () => {
    await axios
      .post(requests.getAttractionAllForList, attraction)
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

  const radioOptionsticket = [
    { id: "attraction", title: "Attraction" },
    { id: "barcode", title: "Barcode" },
  ];

  const [barCodeFor, setbarCodeFor] = useState();

  const [tkttypeTemp, settkttypeTemp] = useState([]);

  const apicalltkt = (attId) => {
    axios
      .post(requests.getTicketTypeListByAttraction, { ttAttractionId: attId })
      .then((res) => {
        const values = [...tkttypeTemp];
        values.length = 0;
        values.push({
          name: "Select Ticket Type",
          value: "",
        });

        for (let i = 0; i < res.data.length; i++) {
          values.push({
            name: res.data[i].ttTicketType,
            value: res.data[i].ticketTypeId,
          });
        }
        settkttypeTemp(values);
      })
      .catch((err) => {});
  };

  const submittoApi = (values, dispatch) => {
    console.log("barCodeFor", barCodeFor);

    const submitObj = {
      attractionId: values.attractionId,
      addonName: values.addonName,
      addonPrice: values.addonPrice,
      addonDescription: values.addonDescription,
      barcodeAvailable: values.barcodeAvailable === "barcode" ? true : false,
      attractionAvailable: values.barcodeAvailable === "barcode" ? false : true,
      ticketType: values.ticketType,
    };
    console.log(JSON.stringify(submitObj, null, 2));
    axios
      .post(requests.getaddonformdetails, submitObj)
      .then((res) => {
        console.log(res);
        Swal.fire(
          "success!",
          "You have added the form addon successfully",
          "success"
        );
        dispatch(reset("FormAddonForm"));
        setReminder("");
        setbarCodeFor("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Card>
        <Form onSubmit={handleSubmit(submittoApi.bind(this))}>
          <CardBody>
            <Col xs={6}>
              <Field
                name="attractionId"
                type="select"
                label="Select Attraction"
                customfeild={parkGroup}
                component={RenderField.renderOptionField}
              />
            </Col>
            <Row>
              <Col>
                <Field
                  name="addonName"
                  type="text"
                  label="Name"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col>
                <Field
                  name="addonPrice"
                  type="text"
                  label="Price"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col>
                <Field
                  name="addonDescription"
                  type="textarea"
                  label="Description"
                  component={RenderField.RenderTextField}
                />
              </Col>
            </Row>
            {/* <Row>
              <Col>
                <Field
                  checked={reminder && "checked"}
                  name="barcodeAvailable"
                  component={RenderField.RendercheckboxField}
                  label="With Bar Code "
                  onChange={(e) => setReminder(e.target.checked)}
                />
              </Col>
              <Col></Col>
            </Row> */}
            <Row>
              {radioOptionsticket.map((item) => (
                <Col xs="3">
                  <Field
                    radioName="barcodeAvailable"
                    name="barcodeAvailable"
                    // label="Payment Method "
                    type="radio"
                    label={item.title}
                    value={item.id}
                    options={item.id}
                    onChange={(e) => setbarCodeFor(e.target.value)}
                    component={RenderField.RenderRadioField}
                  />
                </Col>
              ))}
            </Row>
            <br />
            {barCodeFor === "attraction" && (
              <Row>
                <Col>
                  <Field
                    // name="attractionId"
                    type="select"
                    label="Select Attraction"
                    customfeild={parkGroup}
                    component={RenderField.renderOptionField}
                    onChange={(e) => apicalltkt(e.target.value)}
                  />
                </Col>
                <Col>
                  <Field
                    name="ticketType"
                    type="select"
                    label="Select Ticket"
                    customfeild={tkttypeTemp}
                    component={RenderField.renderOptionField}
                  />
                </Col>
              </Row>
            )}

            <div className="float-right">
              <Button color="primary" disabled={submitting}>
                Save
              </Button>{" "}
              &nbsp; &nbsp;&nbsp;
              <Button
                color="danger"
                disabled={pristine || submitting}
                onClick={reset}
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
  form: "FormAddonForm",
})(FormAddonForm);

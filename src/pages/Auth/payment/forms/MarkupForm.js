/** @format */

import { Card, CardBody, Button, Row, Col, Label } from "reactstrap";
import { Form, Field, reduxForm, reset } from "redux-form";
import axios from "axios";
import RenderField from "../../../formcomponent/formfields/RenderField";
import { useEffect, useState } from "react";
import requests from "../../../../utils/Requests";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

// const AfterSubmit = (result, dispatch) => {
//   //window.location.href = "/success";
// };

const validate = (values) => {
  const errors = {};
  if (!values.markupDisAttractionId) {
    errors.markupDisAttractionId = "Required";
  }
  if (!values.markupTicketTypeId) {
    errors.markupTicketTypeId = "Required";
  }
  if (!values.attCodeFormat) {
    errors.attCodeFormat = "Required";
  }
  if (values.attCodeFormat == 1) {
    if (!values.markupCustomerType) {
      errors.markupCustomerType = "Required";
    }
  } else if (values.attCodeFormat == 2) {
    if (!values.markupAgencyId) {
      errors.markupAgencyId = "Required";
    }
  }
  if (!values.markupAdultDiscountPercentage) {
    errors.markupAdultDiscountPercentage = "Required";
  } else if (values.markupAdultDiscountPercentage <= 0) {
    errors.markupAdultDiscountPercentage = "Value Must Be Grater Then Zero";
  }

  if (!values.markupChildDiscountPercentage) {
    errors.markupChildDiscountPercentage = "Required";
  } else if (values.markupChildDiscountPercentage <= 0) {
    errors.markupChildDiscountPercentage = "Value Must Be Grater Then Zero";
  }

  //markupChildDiscountPercentage

  return errors;
};

const MarkupForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  let history = useHistory();
  let attractionAll = { attractionId: 1 };
  let attraction = { attractionsId: 1, secretKey: requests.apiKey };

  const [disId, setdisId] = useState("");
  useEffect(() => {
    getAllAttraction();
    getAgentList();
    customerGroup();
    if (props.id != "null") {
      getDisList();
    }
  }, []);
  const [dislist, setdislist] = useState([]);
  const getDisList = async () => {
    await axios
      .post(requests.getmarkupdiscountlist, { markupDiscountId: 1 })
      .then((res) => {
        setdislist(res.data);
        let markUpResult = res.data;

        const markupdata = markUpResult.filter(
          (data) => data.markupDiscountId == props.id
        );
        apicalltkt(markupdata[0].markupDisAttractionId); //markupDisAttractionId

        getTicketInitialize(markupdata);
      })
      .catch(() => {});
  };

  const getTicketInitialize = (ticketRetun) => {
    props.initialize({
      agencyName: ticketRetun[0].agencyName,
      attractionName: ticketRetun[0].attractionName,
      b2cCustomer: ticketRetun[0].b2cCustomer,
      customerTypeName: ticketRetun[0].customerTypeName,
      markupAdultCharges: ticketRetun[0].markupAdultCharges,
      markupAdultDiscountPercentage:
        ticketRetun[0].markupAdultDiscountPercentage,
      markupAgencyId: ticketRetun[0].markupAgencyId,
      markupChildCharges: ticketRetun[0].markupChildCharges,
      markupChildDiscountPercentage:
        ticketRetun[0].markupChildDiscountPercentage,
      markupCustomerType: ticketRetun[0].markupCustomerType,
      markupDisAttractionId: ticketRetun[0].markupDisAttractionId,
      markupDiscountId: ticketRetun[0].markupDiscountId,
      markupPassengerTypeId: ticketRetun[0].markupPassengerTypeId,
      markupTicketTypeId: ticketRetun[0].markupTicketTypeId,
      ticketTypeName: ticketRetun[0].ticketTypeName,
    });
    setoption(ticketRetun[0].markupCustomerType);
    setdisId(ticketRetun[0].markupDiscountId);
    let num = 10;
    for (let i = 0; i < num; i++) {
      AdultandChildFare(ticketRetun[0].markupTicketTypeId);
    }
  };

  const [attractionList, setattractionList] = useState([]);
  const getAllAttraction = async () => {
    await axios
      .post(requests.getattractionall, attractionAll)
      .then((res) => {
        const values = [...attractionList];
        values.length = 0;
        values.push({
          name: "Select Attraction",
          value: "",
        });
        for (let i = 0; i < res.data.length; i++) {
          // console.log(res.data[i].attName);
          // console.log(res.data[i].attractionsId);
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

  const [tkttypeTemp, settkttypeTemp] = useState([]);

  const [tkt, settkt] = useState([]);
  const [adultPrice, setadultPrice] = useState("");
  const [childPrice, setchildPrice] = useState("");
  const apicalltkt = (attId) => {
    axios
      .post(requests.getTicketTypeListByAttraction, { ttAttractionId: attId })
      .then((res) => {
        setadultPrice("");
        setchildPrice("");
        settkt(res.data);
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
      .catch((err) => {
        console.log(err);
      });
  };
  const [agentList, setagentList] = useState([]);

  const getAgentList = () => {
    axios
      .post(requests.getagencylist, attraction)
      .then((res) => {
        const values = [...agentList];
        values.length = 0;
        values.push({
          name: "Select Agent",
          value: "",
        });
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            name: res.data[i].agencyName,
            value: res.data[i].agencyId,
          });
        }
        setagentList(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [userGroup, setuserGroup] = useState([]);
  const customerGroup = () => {
    axios
      .post(requests.getcustomertypelist, attraction)
      .then((res) => {
        const values = [...userGroup];
        values.length = 0;
        values.push({
          name: "Select User",
          value: "",
        });
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            name: res.data[i].customerType,
            value: res.data[i].customerTypeId,
          });
        }
        setuserGroup(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [option, setoption] = useState();

  // getTicketTypeListByAttraction
  const AdultandChildFare = (val) => {
    //  let val = e.target.id; tkttypeTemp  tktpriceShow

    const tktprice = tkt.filter((tkt) => tkt.ticketTypeId == val);

    //  console.log("tkt Price",tktprice )

    setadultPrice(tktprice[0].b2bAdultPrice);
    setchildPrice(tktprice[0].b2bChildPrice); //b2bChildPrice
  };

  const [adultDis, setadultDis] = useState();
  const [childDis, setchildDis] = useState();
  const handleFormpercentage = (name, val) => {
    // setadultDis("");
    // setchildDis("");

    if (name == "adult") {
      let discount = ((100 - val) / 100) * adultPrice;
      setadultDis(discount);
    }
    if (name == "child") {
      let discount = ((100 - val) / 100) * childPrice; //childPrice
      setchildDis(discount);
    }
  };
  //setmarkupdiscountdetail

  const markUpDis = (values, dispatch) => {
    const submitData = {
      agencyName: "",
      attractionName: "",
      b2cCustomer: "",
      customerTypeName: "",
      markupAdultCharges: "",
      markupAdultDiscountPercentage: values.markupAdultDiscountPercentage,
      markupAgencyId: values.markupAgencyId,
      markupChildCharges: "",
      markupChildDiscountPercentage: values.markupChildDiscountPercentage,
      markupCustomerType: "",
      markupDisAttractionId: values.markupDisAttractionId,
      markupDiscountId: props.id,
      markupPassengerTypeId: "",
      markupTicketTypeId: values.markupTicketTypeId,
      ticketTypeName: "",
    };

    axios
      .post(requests.setmarkupdiscountdetail, submitData)
      .then((response) => {
        if (response.status == 200) {
          successAlert("Success", "New Markup Added", "success");
          history.goBack();
          dispatch(reset("MarkupForm"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const successAlert = (t, e, i) => {
    Swal.fire({
      title: t, //'Good job!',
      text: e, //'You clicked the button.',
      icon: i, //'success'
    });
  };
  return (
    <>
      <Card>
        <Form onSubmit={handleSubmit(markUpDis.bind(this))}>
          <CardBody>
            <Row>
              <Col xs={8}>
                <Row>
                  <Col>
                    <Field
                      name="markupDisAttractionId"
                      label="Attraction"
                      type="select"
                      customfeild={attractionList}
                      component={RenderField.renderOptionField}
                      // id="attGroup"
                      onChange={(e) => apicalltkt(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Field
                      name="markupTicketTypeId"
                      type="select"
                      customfeild={tkttypeTemp}
                      label="Ticket Type"
                      component={RenderField.renderOptionField}
                      onChange={(e) => AdultandChildFare(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label>
                      <input
                        name="attCodeFormat"
                        component="input"
                        type="radio"
                        checked={option == 1 ? "checked" : null}
                        value="1"
                        onChange={(e) => setoption(e.target.value)}
                      />{" "}
                      Customer Type
                    </label>
                  </Col>
                  <Col>
                    <label>
                      <input
                        name="attCodeFormat"
                        component="input"
                        type="radio"
                        checked={option == 2 ? "checked" : null}
                        value="2"
                        onChange={(e) => setoption(e.target.value)}
                      />{" "}
                      Agent
                    </label>
                  </Col>
                </Row>
                <Row>
                  {option == 1 ? (
                    <>
                      <Col>
                        <Field
                          name="markupCustomerType"
                          type="select"
                          customfeild={userGroup}
                          label="Customer Type"
                          component={RenderField.renderOptionField}
                        />
                      </Col>
                    </>
                  ) : option == 2 ? (
                    <>
                      <Col>
                        <Field
                          name="markupAgencyId"
                          type="select"
                          customfeild={agentList}
                          label="Agent"
                          component={RenderField.renderOptionField}
                        />
                      </Col>
                    </>
                  ) : null}
                </Row>
              </Col>
              <Col xs={4}></Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Label>Actual Price </Label>
                <Row>
                  <Col>
                    {/* <Field
                  name="markupAdultCharges"
                  type="text"
                  label="Adult"
                  component={RenderField.RenderTextField}
                /> */}
                    <Label>Adult Price</Label>
                    <p>{adultPrice}</p>
                  </Col>
                  <Col>
                    <Label>Child Price</Label>
                    <p>{childPrice}</p>
                    {/* <Field
                  name="markupChildCharges"
                  type="text"
                  label="Child"
                  component={RenderField.RenderTextField}
                /> */}
                  </Col>
                </Row>
              </Col>
              <Col xs={6}>
                <Label>Discount Percentage (%) </Label>
                <Row>
                  <Col>
                    <Field
                      name="markupAdultDiscountPercentage"
                      type="text"
                      label="Adult"
                      component={RenderField.RenderTextField}
                      id="adult"
                      onChange={(e) =>
                        handleFormpercentage("adult", e.target.value)
                      }
                    />
                    <p>{adultDis}</p>
                  </Col>
                  <Col>
                    <Field
                      name="markupChildDiscountPercentage"
                      type="text"
                      label="Child"
                      component={RenderField.RenderTextField}
                      id="child"
                      onChange={(e) =>
                        handleFormpercentage("child", e.target.value)
                      }
                    />
                    <p>{childDis}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
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
  form: "MarkupForm",
  validate,
  // onSubmitSuccess: AfterSubmit,
})(MarkupForm);

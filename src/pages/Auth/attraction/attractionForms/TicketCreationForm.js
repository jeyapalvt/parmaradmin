/** @format */

import {
  Card,
  CardBody,
  Row,
  Button,
  Col,
  Label,
  FormGroup,
  Input,
  Alert,
} from "reactstrap";
import { Form, Field, reduxForm, FieldArray } from "redux-form";

import { useState, useEffect } from "react";
import RenderField from "../../../formcomponent/formfields/RenderField";
import { useHistory } from "react-router-dom";
import EditorField from "../../../formcomponent/editorfield/EditorField";
import RenderImageUploadField from "../../../formcomponent/formfields/RenderImageUploadField";
import InclutionExclution from "../../../formcomponent/formfields/InclutionExclution";
import axios from "axios";
import RenderFileUpladField from "../../../formcomponent/Pdfupload/RenderFileUpladField";
import RenderExcelUploadField from "../../../formcomponent/ExcelUpload/RenderExcelUploadField";
import requests from "../../../../utils/Requests";
// import renderMembers from "../../../formcomponent/formfields/UploadTicketArray";
import FileUpFerRen from "../../../formcomponent/Pdfupload/FileUpFerRen";
import FIleUpExpoRen from "../../../formcomponent/Pdfupload/FIleUpExpoRen";
import RenderArrayField from "../../../formcomponent/formfields/UploadTicketArray";
import Swal from "sweetalert2";

const validate = (values) => {
  const errors = {};
  if (!values.attractionId) {
    errors.attractionId = "Required";
  }
  if (!values.tktFormat) {
    errors.tktFormat = "Requird";
  }
  if (!values.tktTypeId) {
    errors.tktTypeId = "Required";
  }
  if (!values.tktPassengerType) {
    errors.tktPassengerType = "Required";
  }
  if (!values.tktPurchase) {
    errors.tktPurchase = "Required";
  }
  if (!values.tktExpiry) {
    errors.tktExpiry = "Required";
  }
  if (!values.tktAdultFareB2B) {
    errors.tktAdultFareB2B = "Required";
  }
  if (!values.tktAdultFareB2C) {
    errors.tktAdultFareB2C = "Required";
  }
  if (!values.tktAdultOrChild) {
    errors.tktAdultOrChild = "Required";
  }

  if (!values.ticketNumberManual || !values.ticketNumberManual.length) {
    errors.ExcelTicket = { _error: "At least one Ticket Must be Enter" };
  } else {
    const membersArrayErrors = [];
    values.ticketNumberManual.forEach((member, memberIndex) => {
      const memberErrors = {};
      if (!member || !member.tktNumber) {
        memberErrors.tktNumber = "Required";
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (!member || !member.lastName) {
        memberErrors.lastName = "Required";
        membersArrayErrors[memberIndex] = memberErrors;
      }
    });
    if (membersArrayErrors.length) {
      errors.ticketNumberManual = membersArrayErrors;
    }
  }
  return errors;
};

const TicketCreationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const [tktUploadFormet, settktUploadFormet] = useState("");
  const [selectFormet, setselectFormet] = useState("");
  const [toggle, setToggle] = useState(false);

  let history = useHistory();
  const tktFormet = [
    { value: "", name: "" },
    { value: 2, name: "Ferrari" },
    { value: 1, name: "Dubai" },
    { value: 4, name: "Expo" },
    { value: 3, name: "Others" },
  ];

  const passengerType = [
    { value: "", name: "" },
    { value: 31, name: "UAE Resident" },
    { value: 32, name: "NON UAE Resident" },
  ];

  const [attractionList, setattractionList] = useState([
    { name: "", value: "" },
  ]);

  const [geAttData, setAttData] = useState({
    attractionId: 1,
  });
  const [showDublicate, setshowDublicate] = useState([]);

  useEffect(() => {
    //apicall();
    getallparkgroup();
    props.initialize({
      ferraiWorld: false,
      yasWaterWorld: false,
      warnerBros: false,
      seaWorld: false,
      secretKey: requests.apiKey,
    });
  }, []);

  const [parkGroup, setparkGroup] = useState([{ value: "", name: "" }]);

  const getallparkgroup = async () => {
    await axios
      .post(requests.getallparkgroup, { attractionsId: 1 })
      .then((res) => {
        // console.log(res.data)

        const values = [...parkGroup];
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
          name: "Select Attraction",
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
      .catch((err) => {});
  };

  const [tkttypeTemp, settkttypeTemp] = useState([]);

  const apicalltkt = (attId) => {
    axios
      .post(requests.getTicketTypeListByAttraction, { ttAttractionId: attId })
      .then((res) => {
        console.log("res tickets", res.data);
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

  const tktCreation = (values) => {
    // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    // console.log(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    axios
      .post(requests.posttktcreation, values)
      .then((res) => {
        console.log("res", res.data);
        if (res.data.errCode == 100) {
          setshowDublicate(res.data);
          // const swalWithBootstrapButtons = Swal.mixin({
          //   customClass: {
          //     confirmButton: "btn btn-success",
          //     cancelButton: "btn btn-danger",
          //   },
          //   buttonsStyling: false,
          // });

          // swalWithBootstrapButtons
          //   .fire({
          //     title: res.data.errMessage,
          //     text: "You want to upload remaining tickeys?",
          //     html:
          //       "You can use <b>bold text</b>, " +
          //       '<a href="//sweetalert2.github.io">links</a> ' +
          //       "and other HTML tags",
          //     icon: "warning",
          //     showCancelButton: true,
          //     confirmButtonText: "Yes, Proceed",
          //     cancelButtonText: "No, cancel!",
          //     reverseButtons: true,
          //   })
          //   .then((result) => {
          //     if (result.isConfirmed) {
          //       // console.log(
          //       //   `You submitted:\n\n${JSON.stringify(res.data, null, 2)}`
          //       // );
          //       axios
          //         .post(requests.posttktcreation, res.data)
          //         .then((response) => {
          //           console.log("Ressssssssssssssss", response.data);
          //           swalWithBootstrapButtons.fire(
          //             "Uploaded!",
          //             "Your Remaining tickets uploaded successfully",
          //             "success"
          //           );
          //           history.push("/attraction/ticket-list");
          //           // dispatch(props.reset());
          //         })
          //         .catch((error) => {
          //           // console.log("errrrrrr", error);
          //         });
          //     } else if (
          //       /* Read more about handling dismissals below */
          //       result.dismiss === Swal.DismissReason.cancel
          //     ) {
          //       swalWithBootstrapButtons.fire(
          //         "Cancelled",
          //         "Tickets Not Uploaded",
          //         "error"
          //       );
          //       history.push("/attraction/ticket-list");
          //       // dispatch(props.reset());
          //     }
          //   });

          // dispatch(props.reset());
          // "errCode": 100,
          // "errMessage": "Some Tickets are already found in the database",
        } else if (res.data.errCode == 151) {
          successAlert("warning", res.data.errMessage, "warning");
          history.push("/attraction/ticket-list");
          // dispatch(props.reset());
        } else if (res.data.errCode == 0) {
          successAlert(
            "success",
            "Your Tickets Are Uploaded Successfully",
            "success"
          );
          history.push("/attraction/ticket-list");
          // dispatch(props.reset());
        } else {
          successAlert("warning", "Something went wrong", "warning");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resubmit = (values) => {
    if (values.pill == 2) {
      axios
        .post(requests.posttktcreation, showDublicate)
        .then((response) => {
          if (response.data.errCode == 0) {
            successAlert(
              "success",
              "Your Tickets Are Uploaded Successfully",
              "success"
            );
            history.push("/attraction/ticket-list");
          } else {
            successAlert("warning", "Something went wrong", "warning");
          }
        })
        .catch(() => {});
    } else if (values.pill == 3) {
      setshowDublicate("");
    }
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
      <br />
      <Card>
        {/* <CardHeader>Header</CardHeader> */}
        <CardBody>
          <Form>
            {/* onSubmit={handleSubmit(tktCreation.bind(this))}> */}
            {/* <Field
            name="tktTypeId"
            type="hidden"
            component={RenderField.RenderTextField}
            /> */}

            <FormGroup>
              <Label for="exampleSelect">Select Attraction Group</Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                onChange={(e) => getattractionbygroup(e.target.value)}
              >
                {parkGroup.map((attration, index) => (
                  <option value={attration.value}> {attration.name}</option>
                ))}
              </Input>
            </FormGroup>

            <Row form>
              <Col xs={6}>
                {" "}
                <Field
                  name="attractionId"
                  type="select"
                  customfeild={attractionList}
                  component={RenderField.renderOptionField}
                  id="ttAttractionId"
                  onChange={(e) => apicalltkt(e.target.value)}
                  label="Select Attraction "
                />
              </Col>
              <Col xs={6}>
                <Field
                  name="tktFormat"
                  type="select"
                  customfeild={tktFormet}
                  component={RenderField.renderOptionField}
                  onChange={(e) => setselectFormet(e.target.value)}
                  label="Ticket Formet "
                />
              </Col>
            </Row>

            <Row></Row>

            <Row>
              <Col xs={6}>
                <Field
                  name="tktTypeId"
                  type="select"
                  customfeild={tkttypeTemp}
                  component={RenderField.renderOptionField}
                  label="Ticket Type "
                  // onChange={(e) =>
                  //   initialval( e.target.value)
                  // }
                />{" "}
              </Col>
              <Col xs={6}>
                <Field
                  name="tktPassengerType"
                  type="select"
                  customfeild={passengerType}
                  component={RenderField.renderOptionField}
                  label="Passenger Type "
                />
              </Col>
            </Row>

            <Row>
              <Col xs={2}>
                <br />{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <Label>Fare B2B</Label>
              </Col>
              <Col xs={2}>
                <Field
                  name="tktAdultFareB2B"
                  type="number"
                  // customfeild={tktFormet}
                  component={RenderField.RenderTextField}
                  label="Adult Fare "
                />
              </Col>
              <Col xs={2}>
                <Field
                  name="tktChildFareB2B"
                  type="number"
                  component={RenderField.RenderTextField}
                  label="Child Fare "
                />
              </Col>
              <Col xs={2}>
                <br />{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Label>Fare B2C</Label>
              </Col>

              <Col xs={2}>
                <Field
                  name="tktAdultFareB2C"
                  type="number"
                  // customfeild={tktFormet}
                  component={RenderField.RenderTextField}
                  label="Adult Fare "
                />
              </Col>
              <Col xs={2}>
                <Field
                  name="tktChildFareB2C"
                  type="number"
                  component={RenderField.RenderTextField}
                  label="Child Fare "
                />
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <Field
                  name="tktPurchase"
                  type="date"
                  component={RenderField.RenderTextField}
                  label="Purchase Date"
                />
              </Col>
              <Col xs={3}>
                <Field
                  name="tktExpiry"
                  type="date"
                  component={RenderField.RenderTextField}
                  label="Expiry Date"
                />
              </Col>

              <Col xs={3}>
                <div>
                  <br />
                </div>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>
                  <Field
                    name="tktAdultOrChild"
                    component="input"
                    type="radio"
                    value="ADULT"
                  />{" "}
                  ADULT
                </label>
              </Col>

              <Col xs={3}>
                <div>
                  <br />
                </div>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>
                  <Field
                    name="tktAdultOrChild"
                    component="input"
                    type="radio"
                    value="CHILD"
                  />{" "}
                  CHILD
                </label>
              </Col>
            </Row>

            <br />

            <Row>
              {selectFormet == 1 ? (
                // 1 dubai formet
                <>
                  <Row>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="uploadFormet"
                            value="pdf"
                            onChange={(e) => settktUploadFormet(e.target.value)}
                          />{" "}
                          Upload PDF
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="uploadFormet"
                            value="excel"
                            onChange={(e) => settktUploadFormet(e.target.value)}
                          />{" "}
                          Upload EXCEL
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="uploadFormet"
                            value="manual"
                            onChange={(e) => settktUploadFormet(e.target.value)}
                          />{" "}
                          Manual Entry
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>

                  <div>
                    <br /> <br />
                  </div>

                  {tktUploadFormet == "pdf" ? (
                    <>
                      {" "}
                      <Row>
                        <Field
                          name="ticketNumberPdf"
                          component={RenderFileUpladField}
                        />
                      </Row>
                    </>
                  ) : tktUploadFormet == "excel" ? (
                    <>
                      <Row>
                        <Field
                          name="excelTicketList"
                          component={RenderExcelUploadField}
                        />
                      </Row>
                    </>
                  ) : tktUploadFormet == "manual" ? (
                    <>
                      <Row>
                        <Col xs={3}>
                          {toggle ? (
                            <>
                              <Button
                                color="primary"
                                onClick={() => setToggle(!toggle)}
                              >
                                Close Form
                              </Button>{" "}
                            </>
                          ) : (
                            <>
                              <Button
                                color="primary"
                                onClick={() => setToggle(!toggle)}
                              >
                                Add Tickets
                              </Button>{" "}
                            </>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        {toggle ? (
                          // <FieldArray
                          //   name="ExcelTicket"
                          //   component={renderMembers}
                          // />
                          <FieldArray
                            name="ticketNumberManual"
                            component={RenderArrayField}
                          />
                        ) : (
                          ""
                        )}
                      </Row>
                    </>
                  ) : null}
                </>
              ) : selectFormet == 2 ? (
                // 2 ferrari formet
                <>
                  <Row>
                    <Col xs={2}>
                      <Label>Select Parks</Label>
                    </Col>
                    <Col xs={2}>
                      <Field
                        name="ferraiWorld"
                        type="checkbox"
                        component={RenderField.RendercheckboxField}
                        label="Ferrari World"
                      />
                    </Col>{" "}
                    <Col xs={2}>
                      <Field
                        name="yasWaterWorld"
                        type="checkbox"
                        component={RenderField.RendercheckboxField}
                        label="YasWater World"
                      />
                    </Col>{" "}
                    <Col xs={2}>
                      {" "}
                      <Field
                        name="warnerBros"
                        type="checkbox"
                        component={RenderField.RendercheckboxField}
                        label="Warner Bros"
                      />
                    </Col>
                    <Col xs={2}>
                      {" "}
                      <Field
                        name="seaWorld"
                        type="checkbox"
                        component={RenderField.RendercheckboxField}
                        label="Sea World"
                      />
                    </Col>
                  </Row>

                  <div>
                    <br /> <br />
                  </div>

                  <Row>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="uploadFormet"
                            value="pdf"
                            onChange={(e) => settktUploadFormet(e.target.value)}
                          />{" "}
                          Upload PDF
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="uploadFormet"
                            value="excel"
                            onChange={(e) => settktUploadFormet(e.target.value)}
                          />{" "}
                          Upload EXCEL
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="uploadFormet"
                            value="manual"
                            onChange={(e) => settktUploadFormet(e.target.value)}
                          />{" "}
                          Manual Entry
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>

                  <div>
                    <br /> <br />
                  </div>

                  {tktUploadFormet == "pdf" ? (
                    <>
                      {" "}
                      <Row>
                        <Field name="ferrariPdfList" component={FileUpFerRen} />
                      </Row>
                    </>
                  ) : tktUploadFormet == "excel" ? (
                    <>
                      <Row>
                        <Field
                          name="excelTicketList"
                          component={RenderExcelUploadField}
                        />
                      </Row>
                    </>
                  ) : tktUploadFormet == "manual" ? (
                    <>
                      <Row>
                        <Col xs={3}>
                          {toggle ? (
                            <>
                              <Button
                                color="primary"
                                onClick={() => setToggle(!toggle)}
                              >
                                Close Form
                              </Button>{" "}
                              <Row></Row>
                            </>
                          ) : (
                            <>
                              <Button
                                color="primary"
                                onClick={() => setToggle(!toggle)}
                              >
                                Add Tickets
                              </Button>{" "}
                            </>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        {toggle ? (
                          // <FieldArray
                          //   name="ExcelTicket"
                          //   component={renderMembers}
                          // />
                          <FieldArray
                            name="ticketNumberManual"
                            component={RenderArrayField}
                          />
                        ) : (
                          ""
                        )}
                      </Row>
                    </>
                  ) : null}
                </>
              ) : selectFormet == 3 ? (
                // 3 others
                <>
                  <Row>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="uploadFormet"
                            value="pdf"
                            onChange={(e) => settktUploadFormet(e.target.value)}
                          />{" "}
                          Upload PDF
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="uploadFormet"
                            value="excel"
                            onChange={(e) => settktUploadFormet(e.target.value)}
                          />{" "}
                          Upload EXCEL
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="uploadFormet"
                            value="manual"
                            onChange={(e) => settktUploadFormet(e.target.value)}
                          />{" "}
                          Manual Entry
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>

                  <div>
                    <br /> <br />
                  </div>

                  {tktUploadFormet == "pdf" ? (
                    <>
                      {" "}
                      <Row>
                        <Field
                          name="ticketNumberPdf"
                          component={RenderFileUpladField}
                        />
                      </Row>
                    </>
                  ) : tktUploadFormet == "excel" ? (
                    <>
                      <Row>
                        <Field
                          name="excelTicketList"
                          component={RenderExcelUploadField}
                        />
                      </Row>
                    </>
                  ) : tktUploadFormet == "manual" ? (
                    <>
                      <Row>
                        <Col xs={3}>
                          {toggle ? (
                            <>
                              <Button
                                color="primary"
                                onClick={() => setToggle(!toggle)}
                              >
                                Close Form
                              </Button>{" "}
                              <Row></Row>
                            </>
                          ) : (
                            <>
                              <Button
                                color="primary"
                                onClick={() => setToggle(!toggle)}
                              >
                                Add Tickets
                              </Button>{" "}
                            </>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        {toggle ? (
                          // <FieldArray
                          //   name="ExcelTicket"
                          //   component={renderMembers}
                          // />
                          <FieldArray
                            name="ticketNumberManual"
                            component={RenderArrayField}
                          />
                        ) : (
                          ""
                        )}
                      </Row>
                    </>
                  ) : null}
                </>
              ) : selectFormet == 4 ? (
                //  4 expo Ticket
                <>
                  <Row>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="uploadFormet"
                            value="pdf"
                            onChange={(e) => settktUploadFormet(e.target.value)}
                          />{" "}
                          Upload PDF
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="uploadFormet"
                            value="excel"
                            onChange={(e) => settktUploadFormet(e.target.value)}
                          />{" "}
                          Upload EXCEL
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="uploadFormet"
                            value="manual"
                            onChange={(e) => settktUploadFormet(e.target.value)}
                          />{" "}
                          Manual Entry
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>

                  <div>
                    <br /> <br />
                  </div>

                  {tktUploadFormet == "pdf" ? (
                    <>
                      {" "}
                      <Row>
                        <Field
                          name="ticketNumberPdf"
                          component={FIleUpExpoRen}
                        />
                      </Row>
                    </>
                  ) : tktUploadFormet == "excel" ? (
                    <>
                      <Row>
                        <Field
                          name="excelTicketList"
                          component={RenderExcelUploadField}
                        />
                      </Row>
                    </>
                  ) : tktUploadFormet == "manual" ? (
                    <>
                      <Row>
                        <Col xs={3}>
                          {toggle ? (
                            <>
                              <Button
                                color="primary"
                                onClick={() => setToggle(!toggle)}
                              >
                                Close Form
                              </Button>{" "}
                              <Row></Row>
                            </>
                          ) : (
                            <>
                              <Button
                                color="primary"
                                onClick={() => setToggle(!toggle)}
                              >
                                Add Tickets
                              </Button>{" "}
                            </>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        {toggle ? (
                          // <FieldArray
                          //   name="ExcelTicket"
                          //   component={renderMembers}
                          // />
                          <FieldArray
                            name="ticketNumberManual"
                            component={RenderArrayField}
                          />
                        ) : (
                          ""
                        )}
                      </Row>
                    </>
                  ) : null}
                </>
              ) : null}
            </Row>
            {showDublicate == "" ? (
              <>
                {" "}
                <div className="float-right">
                  <Button
                    color="primary"
                    onClick={handleSubmit((values) =>
                      tktCreation({
                        ...values,
                        pill: 1,
                      })
                    )}
                  >
                    Save
                  </Button>
                  &nbsp; &nbsp;&nbsp;
                  <Button
                    color="danger"
                    disabled={pristine || submitting}
                    onClick={reset}
                  >
                    Cancel
                  </Button>
                  {/* <Button color='primary' disabled={submitting}>
                    Save
                  </Button>{" "}
                  &nbsp; &nbsp;&nbsp;

                  
                  <Button
                    color='danger'
                    disabled={pristine || submitting}
                    onClick={reset}>
                    Cancel
                  </Button>{" "} */}
                </div>
              </>
            ) : (
              <></>
            )}

            <FieldArray name="incl" component={InclutionExclution} />
          </Form>

          {showDublicate != "" ? (
            <>
              <Form>
                <Row>
                  <Col>
                    <Alert color="danger">Dublicate Tickets Found</Alert>

                    <br />
                    {showDublicate.duplicateTicketNumber.map((tktNum) => (
                      <p>{tktNum}</p>
                    ))}
                  </Col>
                  <Col>
                    <Alert color="primary">New Tickets</Alert>

                    {/* excelTicketList , ferrariPdfList, ticketNumberExcel, ticketNumberPdf*/}
                    {showDublicate.excelTicketList != "" ? (
                      <>
                        {showDublicate.excelTicketList.map((tktNum) => (
                          <p>{tktNum.ticketNumber}</p>
                        ))}
                      </>
                    ) : showDublicate.ferrariPdfList != "" ? (
                      <>
                        {showDublicate.ferrariPdfList.map((tktNum) => (
                          <p>{tktNum.ticketNumber}</p>
                        ))}
                      </>
                    ) : showDublicate.ticketNumberExcel != "" ? (
                      <>
                        {showDublicate.ticketNumberExcel.map((tktNum) => (
                          <p>{tktNum.ticketNumber}</p>
                        ))}
                      </>
                    ) : showDublicate.ticketNumberPdf != "" ? (
                      <>
                        {showDublicate.ticketNumberPdf.map((tktNum) => (
                          <p>{tktNum.ticketNumber}</p>
                        ))}
                      </>
                    ) : null}
                  </Col>
                </Row>

                <div className="d-flex justify-content-end">
                  <Button
                    color="primary"
                    onClick={handleSubmit((values) =>
                      resubmit({
                        ...values,
                        pill: 2,
                      })
                    )}
                  >
                    Proceed To Save
                  </Button>
                  &nbsp; &nbsp;&nbsp;
                  <Button
                    color="danger"
                    onClick={handleSubmit((values) =>
                      resubmit({
                        ...values,
                        pill: 3,
                      })
                    )}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </>
          ) : (
            <></>
          )}
        </CardBody>
        {/* <CardFooter>Footer</CardFooter> */}
      </Card>
      <br /> <br /> <br />
    </>
  );
};

export default reduxForm({
  form: "ticketCreationForm",
  validate,
  asyncBlurFields: ["attractionId"],
})(TicketCreationForm);

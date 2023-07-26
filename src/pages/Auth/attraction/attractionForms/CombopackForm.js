/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import requests from "../../../../utils/Requests";
import RenderField from "../../../formcomponent/formfields/RenderField";
import { Form, Field, reduxForm, reset, FieldArray } from "redux-form";
import { Row, Col, CardBody, Button, Card, Label } from "reactstrap";
import ComboFieldArray from "../../../formcomponent/formfields/ComboFieldArray";
import DropZoneSingleRender from "../../../formcomponent/formfields/dropzonSingle/DropZoneSingleRender";
import EditorField from "../../../formcomponent/editorfield/EditorField";
import EditorFieldComponent from "../../../formcomponent/editorfield/EditorFieldComponent";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

const validate = (values) => {
  const errors = {};
  if (!values.attractionId1) {
    errors.attractionId1 = "Required";
  }
  if (!values.ticketTypeId1) {
    errors.ticketTypeId1 = "Required";
  }
  if (!values.attractionId2) {
    errors.attractionId2 = "Required";
  }
  if (!values.ticketTypeId2) {
    errors.ticketTypeId2 = "Required";
  }
  if (!values.comboName) {
    errors.comboName = "Required";
  }
  if (!values.statusActive) {
    errors.statusActive = "Required";
  }
  if (!values.actualPrice) {
    errors.actualPrice = "Required";
  }
  if (!values.offerPrice) {
    errors.offerPrice = "Required";
  }
  if (!values.actualChildPrice) {
    errors.actualChildPrice = "Required";
  }
  if (!values.offerChildPrice) {
    errors.offerChildPrice = "Required";
  }
  if (!values.offerB2bChildPrice) {
    errors.offerB2bChildPrice = "Required";
  }
  if (!values.offerB2bAdultPrice) {
    errors.offerB2bAdultPrice = "Required";
  }
  if (!values.comboDescription) {
    errors.comboDescription = "Required";
  }
  return errors;
};
const CompopackForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  let history = useHistory();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getAllAttraction();
  }, []);
  const activeStatus = [
    { value: "", name: "" },
    { value: true, name: "Active" },
    { value: false, name: "InActive" },
  ];
  const [attractionList, setattractionList] = useState([]);
  const [banImg, setbanImg] = useState("");
  const [thumbImg, setthumbImg] = useState("");

  const getAllAttraction = () => {
    axios
      .post(requests.getattractionall, {
        attractionId: 1,
        agencyId: 0,
        agencyUserId: 0,
      })
      .then((response) => {
        //  console.log("ajnzkabzka", response.data);
        const tempValues = [...attractionList];
        tempValues.length = 0;
        tempValues.push({
          name: "Select Attraction",
          value: "",
        });

        // console.log("length", response.data.length);
        for (let i = 0; i < response.data.length; i++) {
          //attractionsId, attName

          //   console.log("i", i);
          tempValues.push({
            name: response.data[i].attName,
            value: response.data[i].attractionsId,
          });
        }

        setattractionList(tempValues);
        if (props.id != "null") {
          //  console.log("not null");
          //setloading(true);
          getcomboDetails(props.id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getcomboDetails = (comboId) => {
    // console.log("comboOfferId");
    axios
      .post(requests.getComboOfferList, { ComboOfferId: 0, platformId: 1 })
      .then((res) => {
        //  console.log(res.data);
        let combopack = res.data;
        const filterCombo = combopack.filter(
          (item) => item.comboOfferId == props.id
        );
        // console.log("filter data", filterCombo);
        inditializedata(filterCombo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let initialAttId1 = "",
    initialAttId2 = "",
    initialAttId3 = "",
    initialAttId4 = "",
    initialAttId5 = "",
    initialtktid1 = "",
    initialtktid2 = "",
    initialtktid3 = "",
    initialtktid4 = "",
    initialtktid5 = "";
  const inditializedata = (comboData) => {
    //comboAttraction

    for (let i = 0; i < comboData[0].comboAttraction.length; i++) {
      //ticketTypeId, attractionId
      if (i == 0) {
        initialAttId1 = comboData[0].comboAttraction[i].attractionId;
        apicalltkt(comboData[0].comboAttraction[i].attractionId, 1);
        initialtktid1 = comboData[0].comboAttraction[i].ticketTypeId;
      } else if (i == 1) {
        initialAttId2 = comboData[0].comboAttraction[i].attractionId;
        apicalltkt(comboData[0].comboAttraction[i].attractionId, 2);
        initialtktid2 = comboData[0].comboAttraction[i].ticketTypeId;
      } else if (i == 2) {
        initialAttId3 = comboData[0].comboAttraction[i].attractionId;
        apicalltkt(comboData[0].comboAttraction[i].attractionId, 3);
        initialtktid3 = comboData[0].comboAttraction[i].ticketTypeId;
      } else if (i == 3) {
        initialAttId4 = comboData[0].comboAttraction[i].attractionId;
        apicalltkt(comboData[0].comboAttraction[i].attractionId, 4);
        initialtktid4 = comboData[0].comboAttraction[i].ticketTypeId;
      } else if (i == 4) {
        initialAttId5 = comboData[0].comboAttraction[i].attractionId;
        apicalltkt(comboData[0].comboAttraction[i].attractionId, 5);
        initialtktid5 = comboData[0].comboAttraction[i].ticketTypeId;
      }
    }

    props.initialize({
      comboName: comboData[0].comboName,
      comboDescription: comboData[0].comboDescription,
      actualPrice: comboData[0].actualPrice,
      offerPrice: comboData[0].offerPrice,
      thumbImageFile: comboData[0].thumbImageFile,
      bannerImageFile: comboData[0].bannerImageFile,
      actualChildPrice: comboData[0].actualChildPrice,
      offerChildPrice: comboData[0].offerChildPrice,
      offerB2bAdultPrice: comboData[0].offerB2bAdultPrice,
      offerB2bChildPrice: comboData[0].offerB2bChildPrice,
      statusActive: comboData[0].statusActive,
      attractionId1: initialAttId1,
      attractionId2: initialAttId2,
      attractionId3: initialAttId3,
      attractionId4: initialAttId4,
      attractionId5: initialAttId5,
      ticketTypeId1: initialtktid1,
      ticketTypeId2: initialtktid2,
      ticketTypeId3: initialtktid3,
      ticketTypeId4: initialtktid4,
      ticketTypeId5: initialtktid5,
    });

    setbanImg(comboData[0].bannerImageFile);
    setthumbImg(comboData[0].thumbImageFile);
    setloading(false);
  };

  // const [tkttypeTemp, settkttypeTemp] = useState({
  //   tktlist1: [{}],
  //   tktlist2: [{}],
  //   tktlist3: [{}],
  //   tktlist4: [{}],
  //   tktlist5: [{}],
  // });
  const [tktlist1, settktlist1] = useState([]);
  const [tktlist2, settktlist2] = useState([]);
  const [tktlist3, settktlist3] = useState([]);
  const [tktlist4, settktlist4] = useState([]);
  const [tktlist5, settktlist5] = useState([]);

  const apicalltkt = (attId, val) => {
    axios
      .post(requests.getTicketTypeListByAttraction, { ttAttractionId: attId })
      .then((res) => {
        const values = [];
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
        if (val == 1) {
          settktlist1(values);
        } else if (val == 2) {
          settktlist2(values);
        } else if (val == 3) {
          settktlist3(values);
        } else if (val == 4) {
          settktlist4(values);
        } else if (val == 5) {
          settktlist5(values);
        }
      })
      .catch((err) => {});
  };

  const onSumbmit = (values) => {
    console.log(JSON.stringify("values", values, null, 2));
    let comboAttraction = [];
    if (values.attractionId1) {
      comboAttraction.push({
        attractionId: values.attractionId1,
        ticketTypeId: values.ticketTypeId1,
      });
    }
    if (values.attractionId2) {
      comboAttraction.push({
        attractionId: values.attractionId2,
        ticketTypeId: values.ticketTypeId2,
      });
    }
    if (values.attractionId3) {
      comboAttraction.push({
        attractionId: values.attractionId3,
        ticketTypeId: values.ticketTypeId3,
      });
    }
    if (values.attractionId4) {
      comboAttraction.push({
        attractionId: values.attractionId4,
        ticketTypeId: values.ticketTypeId4,
      });
    }
    if (values.attractionId5) {
      comboAttraction.push({
        attractionId: values.attractionId5,
        ticketTypeId: values.ticketTypeId5,
      });
    }

    const submitData = {
      comboOfferId: props.id,
      comboName: values.comboName,
      actualPrice: values.actualPrice,
      offerPrice: values.offerPrice,
      actualChildPrice: values.actualChildPrice,
      offerChildPrice: values.offerChildPrice,
      comboDescription: values.comboDescription,
      thumbImageFile: values.thumbImageFile,
      bannerImageFile: values.bannerImageFile,
      comboAttraction: comboAttraction,
      statusActive: values.statusActive,
      offerB2bAdultPrice: values.offerB2bAdultPrice,
      offerB2bChildPrice: values.offerB2bChildPrice,
      platformId: 1,
    };

    //  window.alert(`You submitted:\n\n${JSON.stringify(submitData, null, 2)}`);
    // console.log(JSON.stringify(submitData, null, 2));

    //updateComboOffer -- Method for update
    let combopostURL;
    if (props.id == "null") {
      combopostURL = requests.setComboOffer;
    } else {
      combopostURL = requests.updateComboOffer;
    }

    console.log(JSON.stringify(submitData, null, 2));
    axios
      .post(combopostURL, submitData)
      .then((response) => {
        console.log("response", JSON.stringify(response.data, null, 2));
        Swal.fire({
          title: "Success", //'Good job!',
          text: "Combo Pack Created Successfully", //'You clicked the button.',
          icon: "success", //'success'
        });
        history.push("/attraction/combo-pack-list");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {loading == false ? (
        <>
          <Card>
            <Form onSubmit={handleSubmit}>
              <CardBody>
                {/* <FieldArray name='comboAttraction' component={ComboFieldArray} /> */}
                <br />
                <Row>
                  <Col>
                    <Field
                      name="attractionId1"
                      type="select"
                      customfeild={attractionList}
                      component={RenderField.renderOptionField}
                      onChange={(e) => apicalltkt(e.target.value, 1)}
                      label="Select Attraction "
                    />
                  </Col>
                  <Col>
                    <Field
                      name="ticketTypeId1"
                      type="select"
                      customfeild={tktlist1}
                      component={RenderField.renderOptionField}
                      label="Select Ticket "
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      name="attractionId2"
                      type="select"
                      customfeild={attractionList}
                      component={RenderField.renderOptionField}
                      onChange={(e) => apicalltkt(e.target.value, 2)}
                      label="Select Attraction "
                    />
                  </Col>
                  <Col>
                    <Field
                      name="ticketTypeId2"
                      type="select"
                      customfeild={tktlist2}
                      component={RenderField.renderOptionField}
                      label="Select Ticket "
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      name="attractionId3"
                      type="select"
                      customfeild={attractionList}
                      component={RenderField.renderOptionField}
                      onChange={(e) => apicalltkt(e.target.value, 3)}
                      label="Select Attraction "
                    />
                  </Col>
                  <Col>
                    <Field
                      name="ticketTypeId3"
                      type="select"
                      customfeild={tktlist3}
                      component={RenderField.renderOptionField}
                      label="Select Ticket "
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      name="attractionId4"
                      type="select"
                      customfeild={attractionList}
                      component={RenderField.renderOptionField}
                      onChange={(e) => apicalltkt(e.target.value, 4)}
                      label="Select Attraction "
                    />
                  </Col>
                  <Col>
                    <Field
                      name="ticketTypeId4"
                      type="select"
                      customfeild={tktlist4}
                      component={RenderField.renderOptionField}
                      label="Select Ticket "
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      name="attractionId5"
                      type="select"
                      customfeild={attractionList}
                      component={RenderField.renderOptionField}
                      onChange={(e) => apicalltkt(e.target.value, 5)}
                      label="Select Attraction "
                    />
                  </Col>
                  <Col>
                    <Field
                      name="ticketTypeId5"
                      type="select"
                      customfeild={tktlist5}
                      component={RenderField.renderOptionField}
                      label="Select Ticket "
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      name="comboName"
                      type="text"
                      component={RenderField.RenderTextField}
                      label="Combo Name "
                    />
                  </Col>

                  <Col>
                    <Field
                      name="statusActive"
                      type="select"
                      customfeild={activeStatus}
                      component={RenderField.renderOptionField}
                      label="Active Ststus "
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      name="actualPrice"
                      type="number"
                      component={RenderField.RenderTextField}
                      label="Actual Adult Fare "
                    />
                  </Col>
                  <Col>
                    <Field
                      name="actualChildPrice"
                      type="number"
                      component={RenderField.RenderTextField}
                      label="Actual Child Fare "
                    />
                  </Col>
                  <Col>
                    <Field
                      name="offerPrice"
                      type="number"
                      component={RenderField.RenderTextField}
                      label="Offer B2C Adult Fare  "
                    />
                  </Col>

                  <Col>
                    <Field
                      name="offerChildPrice"
                      type="number"
                      component={RenderField.RenderTextField}
                      label="Offer B2C Child Fare "
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      name="offerB2bAdultPrice"
                      type="number"
                      component={RenderField.RenderTextField}
                      label="Offer B2B Adult fare "
                    />
                  </Col>
                  <Col>
                    <Field
                      name="offerB2bChildPrice"
                      type="number"
                      component={RenderField.RenderTextField}
                      label="Offer B2B Child fare "
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label> Thumbnail Image</Label>
                    {/* bannerImageFile */}
                    {thumbImg && (
                      <img
                        src={
                          "https://parmartours.com:8443/filestorage/parmartour/images/" +
                          thumbImg
                        }
                        width="100px"
                        height="100px"
                        alt="placeholder grey 100px"
                      />
                    )}
                    <Field
                      // key="field"
                      name="thumbImageFile"
                      component={DropZoneSingleRender}
                    />
                  </Col>
                  <Col>
                    <Label> Banner Image</Label>
                    {/* thumbImageFile */}
                    {banImg && (
                      <img
                        src={
                          "https://parmartours.com:8443/filestorage/parmartour/images/" +
                          banImg
                        }
                        width="100px"
                        height="100px"
                        alt="placeholder grey 100px"
                      />
                    )}
                    <Field
                      // key="field"
                      name="bannerImageFile"
                      component={DropZoneSingleRender}
                    />
                  </Col>
                </Row>

                <Label>Combo Pack Description</Label>
                <EditorField
                  key="field"
                  name="comboDescription"
                  id="inputEditorText"
                  // disabled={false}
                  component={EditorFieldComponent}
                  placeholder="Type here"
                />

                <div className="float-right">
                  <Button
                    color="primary"
                    onClick={handleSubmit((values) =>
                      onSumbmit({
                        ...values,
                        pill: 3,
                      })
                    )}
                  >
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
      ) : (
        <>
          <p>Loading ...</p>
        </>
      )}
    </>
  );
};

export default reduxForm({
  form: "CompopackForm",

  validate,
})(CompopackForm);

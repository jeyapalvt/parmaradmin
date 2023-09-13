/** @format */

import { Card, CardBody, Button, Row, Col, Label } from "reactstrap";
import { Form, Field, reduxForm, reset } from "redux-form";
import axios from "axios";
import requests from "../../../../utils/Requests";
import RenderField from "../../../formcomponent/formfields/RenderField";
import { useEffect, useState } from "react";
import EditorFieldComponent from "../../../formcomponent/editorfield/EditorFieldComponent";
import EditorField from "../../../formcomponent/editorfield/EditorField";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
const AfterSubmit = (result, dispatch) => {
  dispatch(reset("TicketBookingForm"));
  //window.location.href = "/success";
};

const validate = (values) => {
  const errors = {};
  if (!values.ttGroupId) {
    errors.ttGroupId = "Required";
  }
  if (!values.ttAttractionId) {
    errors.ttAttractionId = "Required";
  }
  // if (!values.ttTicketType) {
  //   errors.ttTicketType = "Required";
  // }
  // if (!values.ttTicketTypeDiscription) {
  //   errors.ttTicketTypeDiscription = "Required";
  // }

  return errors;
};

const TicketTypeCreationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  let history = useHistory();
  useEffect(() => {
    if (props.tktId != "null") {
      getTktObj(props.tktId);
    }
    getallparkgroup();

    // apicall();
  }, []);

  const [tktEdit, settktEdit] = useState([]);
  const [isloading, setisloading] = useState(false);
  const getTktObj = (id) => {
    axios
      .post(requests.gettickettypelist, { userRolesId: 1, platformId: 1 })
      .then((response) => {
        settktEdit(response.data);
        filteredit(response.data, id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredit = (tktdata, id) => {
    const editdata = tktdata.filter((tktdata) => tktdata.ticketTypeId == id);

    // props.initialize({
    //   ttGroupId: editdata[0].ttGroupId,
    //   ttAttractionId: getattForEdit(
    //     editdata[0].ttAttractionId,
    //     editdata[0].ttGroupId
    //   ),
    //   ttTicketType: editdata[0].ttTicketType,
    //   ttTicketTypeDiscription: editdata[0].ttTicketTypeDiscription,
    // });
    settktEdit(editdata);
    setisloading(true);
    getattForEdit(editdata);
  };
  const [alertUser, setalertUser] = useState();
  const getattForEdit = (editTempData) => {
    // console.log("TempData", editTempData);

    axios
      .post(requests.getattractionallbygroup, {
        attGroup: editTempData[0].ttGroupId,
      })
      .then((response) => {
        console.log("Res", response.data);

        setcheckAPI(response.data);
        const values = [...attractionList];
        values.length = 0;
        values.push({
          name: "Select Your Attraction",
          value: "",
        });
        for (let i = 0; i < response.data.length; i++) {
          values.push({
            name: response.data[i].attName,
            value: response.data[i].attractionsId,
          });
        }
        setattractionList(values);
      })

      .catch(() => {});

    props.initialize({
      ticketTypeId: editTempData[0].editTempData,
      ttGroupId: editTempData[0].ttGroupId,
      ttAttractionId: editTempData[0].ttAttractionId,
      ttTicketType: editTempData[0].ttTicketType,
      ttTicketTypeDiscription: editTempData[0].ttTicketTypeDiscription,

      altMessage: editTempData[0].altMessage,
      altUser: editTempData[0].altUser,
    });

    setalertUser(editTempData[0].altUser);
    // axios
    //   .post(requests.getattractionallbygroup, { attGroup: aid })
    //   .then((res) => {

    //     setcheckAPI(res.data);
    //     const values = [...attractionList];
    //     values.length = 0;
    //     values.push({
    //       name: "Select Your Attraction",
    //       value: "",
    //     });
    //     for (let i = 0; i < res.data.length; i++) {
    //       values.push({
    //         name: res.data[i].attName,
    //         value: res.data[i].attractionsId,
    //       });
    //     }
    //     setattractionList(values);

    //     return gid;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  let attraction = { attractionsId: props.attid };

  const [parkGroup, setparkGroup] = useState([
    // { value: "", name: "" }
  ]);
  const [attractionList, setattractionList] = useState([
    // { name: "", value: "" },
  ]);
  const [checkAPI, setcheckAPI] = useState([]);
  const [showTkttype, setshowTkttype] = useState(true);
  const [showOption, setShowOption] = useState(false);

  const getallparkgroup = async () => {
    await axios
      .post(requests.getallparkgroup, attraction)
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
        setcheckAPI(res.data);
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

  const [attFromApi, setattFromApi] = useState([]);
  const filterAttractionBylinkwithApi = (tktid) => {
    console.log("att id", tktid);
    let checkapi = checkAPI.filter((attData) => attData.attractionsId == tktid);
    console.log("checkapi", checkapi);
    if (
      checkapi[0].attConnectWithApi === true
      // && checkapi[0].attTicketFormat == 5
    ) {
      //attTicketFormat

      console.log("axios call");
      axios
        .post(requests.getTicketTypeForAttraction, {
          attractionId: tktid,
          secretKey: requests.apiKey,
        })
        .then((response) => {
          console.log("api connect", response.data);
          const tempValue = [];
          tempValue.length = 0;

          for (
            let i = 0;
            i < response.data.agentServiceResourceEvents.length;
            i++
          ) {
            tempValue.push({
              attractionName:
                response.data.agentServiceResourceEvents[i].attractionName,
              eventtypeId:
                response.data.agentServiceResourceEvents[i].eventtypeId,
              resourceID:
                response.data.agentServiceResourceEvents[i].resourceID,
              ticketName:
                response.data.agentServiceResourceEvents[i].ticketName,
            });
          }
          setattFromApi(tempValue);
          removeDblicates(tempValue);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      setshowTkttype(true);
    }
  };

  const [attListForOption, setattListForOption] = useState([]);
  // getTicketTypeForAttraction
  const removeDblicates = (attlist) => {
    // let pp = arr.filter( (ele, ind) => ind === arr.findIndex( elem => elem.jobid === ele.jobid && elem.id === ele.id))
    // console.log(pp)
    let tempArr = attlist.filter(
      (element, attname) =>
        attname ===
        attlist.findIndex(
          (element1) => element1.attractionName === element.attractionName
        )
    );

    let tempList = [...attListForOption];
    tempList.length = 0;
    tempList.push({
      name: "Select Attraction",
      value: "",
    });
    for (let i = 0; i < tempArr.length; i++) {
      tempList.push({
        name: tempArr[i].attractionName,
        value: tempArr[i].attractionName,
      });
    }
    setattListForOption(tempList);

    setshowTkttype(false);
  };

  const [tktOption, settktOption] = useState([]);
  const [showAPItkt, setshowAPItkt] = useState(false);
  const [tktDetails, settktDetails] = useState([]);
  const filterTicketBylinkwithApi = (ticketName) => {
    let tempTkt = attFromApi.filter(
      (tktlist) => tktlist.attractionName == ticketName
    );
    settktDetails(tempTkt);

    let tempVal = [...tktOption];
    tempVal.length = 0;
    tempVal.push({
      name: "select Ticket type",
      value: "",
    });
    for (let i = 0; i < tempTkt.length; i++) {
      tempVal.push({
        name: tempTkt[i].ticketName,
        value: tempTkt[i].eventtypeId,
      });
    }

    settktOption(tempVal);

    setshowAPItkt(true);
    // const tktfilter = attractionList.filter((tour) => tour.value == attid);
  };

  const sumbmitToApi = (values) => {
    // {ttGroupId: '1', ttAttractionId: '1', ttTicketType: 'terere', ttTicketTypeDiscription: 'dgccbcbv'}  for Normal Ticket
    // {ttGroupId: '1', ttAttractionId: '1', ttTicketType: 'terere', ttTicketTypeDiscription: '' eventtypeId: "1" resourceID: "1"}   for connect with api
    // resourceID

    let postUrl;
    if (props.tktId != "null") {
      postUrl = requests.updateTicketType;
    } else {
      postUrl = requests.settickettype;
    }
    if (showAPItkt == true) {
      let temptketDetail = tktDetails.filter(
        (temptkt) => temptkt.eventtypeId == values.apiTicket
      );

      const ticktSubmit = {
        ticketTypeId: props.tktId,
        ttGroupId: values.ttGroupId,
        ttAttractionId: values.ttAttractionId,
        ttTicketType: temptketDetail[0].ticketName,
        ttTicketTypeDiscription: temptketDetail[0].ttTicketTypeDiscription,
        eventtypeId: values.apiTicket,
        resourceID: temptketDetail[0].resourceID,
        altMessage: values.altMessage,
        altUser: values.altUser,
        platformId: 1,
      };
      console.log("values", ticktSubmit);
      //postUrl
      axios
        .post(postUrl, ticktSubmit)
        .then((res) => {
          //           errCode: 478
          // errMessage: "Duplicate TicketType..!!!"
          if (res.date.errCode == 0) {
            successAlert(
              "Success",
              "New Ticket Type Created Successfully",
              "success"
            );
            history.goBack();
          } else if (res.date.errCode == 478) {
            successAlert("warning", "Duplicate TicketType..!!!", "warning");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const ticktSubmit = {
        // eventtypeId:0,
        //resourceID:0,
        ticketTypeId: props.tktId,
        ttGroupId: values.ttGroupId,
        ttAttractionId: values.ttAttractionId,
        ttTicketType: values.ttTicketType,
        ttTicketTypeDiscription: values.ttTicketTypeDiscription,
        altMessage: values.altMessage,
        altUser: values.altUser,
        platformId: 1,
      };
      ///postUrl
      console.log(`${JSON.stringify(ticktSubmit, null, 2)}`);
      axios
        .post(postUrl, ticktSubmit)
        .then((res) => {
          console.log(res.data);
          successAlert(
            "Success",
            "New Ticket Type Created Successfully",
            "success"
          );
          history.goBack();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // axios
    // .post(requests.posttkttypecreation, values)
    // .then((res) => {
    //   console.log(res.data);
    //   window.alert(`Successfully Created`);
    //   dispatch(props.reset());
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
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
        <Form onSubmit={handleSubmit(sumbmitToApi.bind(this))}>
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
                  name="ttAttractionId" //attractionList
                  type="select"
                  label="Atrraction List"
                  // value={attTemp}
                  customfeild={attractionList}
                  component={RenderField.renderOptionField}
                  onChange={(e) =>
                    filterAttractionBylinkwithApi(e.target.value)
                  }
                />
              </Col>
            </Row>
            {showTkttype === false && (
              <>
                {" "}
                <Label>Connect With API</Label> &nbsp;&nbsp;&nbsp;
                <input
                  name="Connect With API"
                  type="checkbox"
                  onChange={(e) => setShowOption(e.target.checked)}
                />
              </>
            )}

            {showOption === true ? (
              <>
                <Field
                  name="apiattraction"
                  type="select"
                  //  label="Atrraction List"
                  // value={attTemp}
                  customfeild={attListForOption}
                  label="Select Attraction"
                  onChange={(e) => filterTicketBylinkwithApi(e.target.value)}
                  component={RenderField.renderOptionField}
                />
                <br />

                <Field
                  name="apiTicket"
                  //  label="Select ticket"
                  type="select"
                  label="Ticket Type"
                  // value={attTemp}
                  customfeild={tktOption}
                  component={RenderField.renderOptionField}
                />
              </>
            ) : (
              <>
                {" "}
                <Field
                  name="ttTicketType"
                  type="text"
                  label="Ticket Type"
                  component={RenderField.RenderTextField}
                />
                <br />
                <Field
                  name="ttTicketTypeDiscription"
                  label="Ticket Description"
                  type="textarea"
                  component={RenderField.RenderTextField}
                />
              </>
            )}

            <Row>
              <Col xs={6}>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Label
                    for="exampleSelect"
                    style={{
                      marginRight: "30px",
                      marginTop: "20px",
                    }}
                  >
                    Alert User Message
                  </Label>

                  <Field
                    name="altUser"
                    id="alertUser"
                    type="checkbox"
                    component={RenderField.RenderTextField}
                    onChange={() => setalertUser(!alertUser)}
                  />
                </div>
              </Col>
            </Row>
            {alertUser === true && (
              <Row>
                <Label>Alert Message</Label>
                <EditorField
                  key="field"
                  name="altMessage"
                  id="inputEditorText"
                  disabled={false}
                  component={EditorFieldComponent}
                  placeholder="Type here"
                />
              </Row>
            )}
            <br />
            <br />
            {/* {showTkttype === true ? <> </> : <></>} */}
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
  form: "TicketTypeCreationForm",
  validate,
  onSubmitSuccess: AfterSubmit,
})(TicketTypeCreationForm);

import { Card, CardBody, Button, Row, Col } from "reactstrap";
import { Form, Field, reduxForm, reset } from "redux-form";
import axios from "axios";
import RenderField from "../../../formcomponent/formfields/RenderField";
import { useEffect, useState } from "react";
import requests from "../../../../utils/Requests";
const AfterSubmit = (result, dispatch) => {
  dispatch(reset("TicketBookingForm"));
  //window.location.href = "/success";
};

const validate = (values) => {
  const errors = {};
  if (!values.markupDisAttractionId) {
    errors.markupDisAttractionId = "Required";
  }
  if (!values.markupTicketTypeId) {
    errors.markupTicketTypeId = "Required";
  }
  if (!values.ticketName) {
    errors.ticketName = "Required";
  }
  if (!values.markupPassengerTypeId) {
    errors.markupPassengerTypeId = "Required";
  }

  return errors;
};

const AddpaymentForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const [attractionList, setattractionList] = useState([
    { name: "", value: "" },
  ]);

  useEffect(() => {
    getAttraction();
    getuser();
  }, []);

  const attid = { attractionId: 1 };

  const getAttraction = async () => {
    await axios
      .post(requests.getattractionall, attid)
      .then((res) => {
     

        const values = [...attractionList];
        for (let i = 0; i < res.data.length; i++) {
          // console.log(res.data[i].attName);
          // console.log(res.data[i].attractionsId);
          values.push({
            name: res.data[i].attName,
            value: res.data[i].attractionsId,
          });
          // for (let j = 0; j < res.data[i].filesStorage.length; j++) {
          //   console.log(res.data[i].filesStorage[j].filePath);
          // }getTicketTypeListByAttraction
        }
        setattractionList(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [ticketList, setticketList] = useState();
  const getTicket = async () => {
    await axios
      .post(requests.getattractionall, attid)
      .then((res) => {
      

        const values = [...ticketList];
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            name: res.data[i].attName,
            value: res.data[i].attractionsId,
          });
        }
        setticketList(values);
    
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [Data, setData] = useState({
    ttAttractionId: "",
  });
  const handleFormValueUpdate = (id, value) => {
    const newdata = { ...Data };
    newdata[id] = value;
    setData(newdata);
    getTicket();
  
  };
  const [userList, setuserList] = useState();
  let user = { userRolesId: 1 };
  const getuser = async () => {
    await axios
      .post(requests.getuserlist, user)
      .then((res) => {
     
        const values = [...userList];
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            name: res.data[i].userRolesName,
            value: res.data[i].userRolesId,
          });
        }
        setuserList(values);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  // const addPayment = (values) => {
  //   axios.post().then((response)=>{

  //   }).catch((error)=>{
  //     console.log(error)
  //   })
  // };
  // getTicketTypeListByAttraction
  return (
    <>
      <Card>
        <Form onSubmit={handleSubmit}>
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
                      value={Data.ttAttractionId}
                      onChange={(e) =>
                        handleFormValueUpdate("ttAttractionId", e.target.value)
                      }
                    />
                  </Col>
                  <Col>
                    <Field
                      name="markupTicketTypeId"
                      type="text"
                      label="Ticket Type"
                      component={RenderField.RenderTextField}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      name="ticketName"
                      type="text"
                      label="User Group"
                      component={RenderField.RenderTextField}
                    />
                  </Col>
                  <Col>
                    <Field
                      name="markupPassengerTypeId"
                      type="text"
                      label="Agent"
                      component={RenderField.RenderTextField}
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={4}></Col>
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
  form: "AddpaymentForm",
  validate,
  onSubmitSuccess: AfterSubmit,
})(AddpaymentForm);

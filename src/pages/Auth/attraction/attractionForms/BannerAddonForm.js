import { Card, CardBody, Button, Row, Col } from "reactstrap";
import { Form, Field, reduxForm, reset } from "redux-form";
import axios from "axios";
import requests from "../../../../utils/Requests";
import RenderField from "../../../formcomponent/formfields/RenderField";
import { useEffect, useState } from "react";


const AfterSubmit = (result, dispatch) => {
  dispatch(reset("TicketBookingForm"));
  //window.location.href = "/success";
};

// const   validate = values => {
//   const errors = {};
//   if (!values.ticketName) {
//     errors.ticketName = 'Required';
//   }

//   return errors;
// };



const BannerAddonForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  useEffect(() => {
    getallparkgroup();
    // apicall();
  }, []);
  let attraction = { attractionsId:1};
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

 
 

  return (
    <>
      <Card>
        <Form onSubmit={handleSubmit}>
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
              name="addonType"
              type="text"
              label="Add On Type"
              component={RenderField.RenderTextField}
            />
              </Col>
              <Col>
              <Field
              name="addonValue"
              type="text"
              label="Add On Value"
              component={RenderField.RenderTextField}
            />
              </Col>
              <Col>
              <Field
              name="addonIcon"
              type="text"
              label="Add On Icon"
              component={RenderField.RenderTextField}
            />
            <a href="https://fontawesome.com/v4.7/icons/" target="_blank" >Choose Icon</a>
              </Col>
            </Row>
           <br/><br/>
           
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
  form: "BannerAddonForm",

  // validate,

  onSubmitSuccess: AfterSubmit,
})(BannerAddonForm);

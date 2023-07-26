/** @format */

import { Card, CardBody, Button, Row, Col } from "reactstrap";
import { Form, Field, reduxForm } from "redux-form";
import RenderField from "../../../formcomponent/formfields/RenderField";
import axios from "axios";
import requests from "../../../../utils/Requests";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

const validate = (values) => {
  const errors = {};
  if (!values.customerType) {
    errors.customerType = "Required";
  }
  if (!values.status) {
    errors.status = "Required";
  }
  if (!values.customerTypeDescription) {
    errors.customerTypeDescription = "Required";
  }

  return errors;
};
const CustomerCreateForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  let history = useHistory();
  const aciveStatus = [
    { value: "", name: "" },
    { value: true, name: "Active" },
    { value: false, name: "InActive" },
  ];

  const createCustomer = (values) => {


    axios
      .post(requests.setcustomercypedetails, values)
      .then((response) => {
        if (response.status == 200) {
          Swal.fire({
            title: "success!", //'Good job!',
            text: "New Customer Created Successfully", //'You clicked the button.',
            icon: "success", //'success'
          });
          history.goBack();
        }
      })
      .catch((errror) => {
        console.log(errror);
      });
  };

  const userOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const testSub =(valuetest)=>{
    console.log("Value Test", valuetest)
  
  }
  return (
    <>
      <Card>
        <Form onSubmit={handleSubmit(createCustomer.bind(this))}>
          <CardBody>
            <Row>
              <Col>
                <Field
                  name='customerType'
                  type='text'
                  label='Name'
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col>
                <Field
                  name='status'
                  type='select'
                  customfeild={aciveStatus}
                  component={RenderField.renderOptionField}
                  label='Active Status'
                />
              </Col>
            </Row>

            <Field
              name='customerTypeDescription'
              label='Customer Description'
              type='textarea'
              component={RenderField.RenderTextField}
            />
            {/* <Field
              name='currentUser'
              label='Customer '
              component={RenderField.RenderSelectField}
              options={userOptions}
              onChange={(e) => {
                testSub(e);
              }}
            /> */}
            <div className='float-right'>
              <Button color='primary' disabled={submitting}>
                Save
              </Button>{" "}
              &nbsp; &nbsp;&nbsp;
              <Button
                color='danger'
                disabled={pristine || submitting}
                onClick={reset}>
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
  form: "AdminCustomerCreation",
})(CustomerCreateForm);

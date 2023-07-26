/** @format */

import React from "react";
import { reduxForm, Field, Form } from "redux-form";
import RenderField from "../../../formcomponent/formfields/RenderField";
import { Row, Col, Card, CardBody, Button, Table } from "reactstrap";
import axios from "axios";
import requests from "../../../../utils/Requests";
import Titlebanner from "../../../../globel_cmponents/title_banner";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
const validate = (values) => {
  const errors = {};
  if (!values.userName) {
    errors.userName = 'Required'
  }
  if (!values.userEmail) {
    errors.userEmail = "Required";
  }
  if (!values.userType) {
    errors.userType = "Required";
  }
  if (!values.userPassword1  ) {
    errors.userPassword1 = "Required";
  }else if (values.userPassword1.length < 8) {
    errors.userPassword1 = 'Minimum be 8 characters or more'
  } else if(!/[A-Z]/.test(values.userPassword1)){
    errors.userPassword1 = 'Minimum one upper Case'
  }else if(!/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/.test(values.userPassword1)){
    errors.userPassword1 = 'Minimum one special character'
  }
   
  
  if (!values.userPassword) {
    errors.userPassword = "Required";
  }
  if (values.userPassword != values.userPassword1) {
    errors.userPassword = "Not Match";
  }
  if (!values.accountStatus) {
    errors.accountStatus = "Required";
  }

  return errors;
};
const PassengerType = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  let history = useHistory();
  const userGroup = [
    { value: "", name: "Select" },
    { value: 1, name: "Super Admin" },
    { value: 2, name: "Company Creation" },
    { value: 3, name: "Back Office Admin" },
    { value: 4, name: "IT Team" },
  ];

  const statusOption = [
    { valeu: "", name: "Select" },
    { valeu: "active", name: "Active" },
    { valeu: "inactive", name: "InActive" },
  ];
  const onSubmit = (values) => {
    // if(values.pilll == 2){

    // }else{

    // }
    const submitData = {
      userName: values.userName,
      userEmail: values.userEmail,
      userPassword: values.userPassword,
      userType: values.userType,
      accountStatus: values.accountStatus,
    
    };

    axios
      .post(requests.setUserData, submitData)
      .then((response) => {
        if (response.status == 200) {
          Swal.fire({
            title: "success!", //'Good job!',
            text: "New User Created Successfully", //'You clicked the button.',
            icon: "success", //'success'
          });
          history.goBack();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
<Titlebanner title="Sub-User Details"/>
      <Card>
        <CardBody>
          <Form>
            <Row>
              <Col>
                {" "}
                <Field
                  name='userName'
                  type='text'
                  label='Name'
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col>
                {" "}
                <Field
                  name='userEmail'
                  type='email'
                  label='Email'
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col>
                <Field
                  name='userType'
                  type='select'
                  customfeild={userGroup}
                  label='User Type'
                  component={RenderField.renderOptionField}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Field
                  name='userPassword1'
                  type='password'
                  label='Password'
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col>
                <Field
                  name='userPassword'
                  type='password'
                  label='Confirm Password'
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col>
                <Field
                  name='accountStatus'
                  type='select'
                  customfeild={statusOption}
                  label='Account Status'
                  component={RenderField.renderOptionField}
                />
              </Col>
            </Row>
            <div className='float-right'>
              <Button
                color='primary'
                className='btn btn-yellow'
                onClick={handleSubmit((values) =>
                  onSubmit({
                    ...values,
                    pill: 1,
                  })
                )}>
                Save
              </Button>
              &nbsp; &nbsp;&nbsp;
           
              
              <Button
              color="danger"
              onClick={reset}
              disabled={submitting || pristine}
            >
              Cancel
            </Button>{" "}
            </div>
          </Form>
        </CardBody>
      </Card>



<Card>
  <CardBody>
  <Table borderless>
        <thead>
          <tr>
            <th>#</th>
            <th>Super Admin</th>
            <th>Company Creation</th>
            <th>Back Office Admin</th>
            <th>IT Team</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Access Types</th>
            <td>All Parmissions</td>
            <td>Only Agency Creation</td>
            <td>Ticket Creation and All Reports</td>
            <td>All Parmissions(Except Agent Top-up)</td>
          </tr>

      
        </tbody>
      </Table>
  </CardBody>
</Card>
   
    </>
  );
};

export default reduxForm({
  form: "PassengerType",
  validate
})(PassengerType);

/** @format */

import React from "react";
import { reduxForm, Field, Form } from "redux-form";
import { Card, CardBody, Row, Col, Label, Button } from "reactstrap";
import Titlebanner from "../../../../globel_cmponents/title_banner";
import RenderField from "../../../formcomponent/formfields/RenderField";
import DropZoneSingleRender from "../../../formcomponent/formfields/dropzonSingle/DropZoneSingleRender";
import axios from "axios";
import requests from "../../../../utils/Requests";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const validate = (values) => {
  const errors = {};
  if (!values.categoryName) {
    errors.categoryName = "Required";
  }
  if (!values.description) {
    errors.description = "Required";
  }
 

  return errors;
};
const TourGroupForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  let history = useHistory();
  const onSubmit = (values, dispatch) => {
    console.log(values);
    axios
      .post(requests.setTourCategoryDetails, values)
      .then((response) => {
        console.log(response.data)
        Swal.fire({
          title: "Success", //'Good job!',
          text: "Your Tour Pack Added", //'You clicked the button.',
          icon: "success", //'success'
        });
        history.goBack();
        dispatch(reset("TourGroupForm"));
      })
      .catch((error) => {console.log(error)});
  };
  return (
    <>
      <Titlebanner title='Tour Pack Group Creation' />
      <Card>
        <CardBody>
          <Form>
            <Row>
              <Col>
                <Field
                  name='categoryName'
                  type='text'
                  label='Group Name'
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col>
                <Field
                  name='description'
                  type='text'
                  label='Description'
                  component={RenderField.RenderTextareaField}
                />
              </Col>
            </Row>
            <Label></Label>
            <Field name='images' component={DropZoneSingleRender} />

            <br/>

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
                color='danger'
                onClick={reset}
                disabled={submitting || pristine}>
                Cancel
              </Button>{" "}
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default reduxForm({
  form: "TourGroupForm",
validate ,

})(TourGroupForm);

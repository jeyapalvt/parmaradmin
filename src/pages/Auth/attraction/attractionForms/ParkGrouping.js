import { Card, CardBody, Button, Row, Col, Label } from "reactstrap";
import { Form, Field, reduxForm, reset } from "redux-form";
import DropZoneSingleRender from "../../../formcomponent/formfields/dropzonSingle/DropZoneSingleRender";
import { useEffect, useState } from "react";
import RenderField from "../../../formcomponent/formfields/RenderField";
import { useParams } from "react-router-dom";
import axios from "axios";
import requests from "../../../../utils/Requests";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
const ParkGrouping = (props) => {
  //postparkgroupping
  const { handleSubmit, pristine, reset, submitting } = props;
  let history = useHistory();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    {
      props.groupid == "null" ? setLoading(false) : getGroup();
    }
   
  }, []);
  let attraction = { attractionsId: 1 };
  const getGroup = () => {
    //  console.log("grid is ready");

    axios
      .post(requests.getallparkgroup, attraction)
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createGroup = (values) => {
  
    axios
      .post(requests.postparkgroupping, values)
      .then((response) => {
        if (response.status == 200) {
          Swal.fire({
            title: "success!", //'Good job!',
            text: "New Group Created Successfully", //'You clicked the button.',
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
      <Card>
        <Form onSubmit={handleSubmit(createGroup.bind(this))}>
          <CardBody>
            <Row>
              <Col xs={6}>
                {" "}
                <Field
                  name="grpName"
                  type="text"
                  label="Group Name"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col xs={6}>
                {" "}
                <Field
                  name="grpDescription"
                  label="Group Description"
                  type="textarea"
                  component={RenderField.RenderTextField}
                />
              </Col>
            </Row>
            <Label>Group Image </Label>
            <Field
              // key="field"
              name="grpImage"
              component={DropZoneSingleRender}
            />
            <br />
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
  form: "ParkGrouping",

  // validate,
  // asyncBlurFields: ["ticketName"],
  // onSubmitSuccess: AfterSubmit,
})(ParkGrouping);

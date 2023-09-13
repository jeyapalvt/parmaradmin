import React from "react";
import Titlebanner from "../../../globel_cmponents/title_banner";
import { Card, CardBody, Col, Row, Button } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import RenderField from "../../formcomponent/formfields/RenderField";
import axios from "axios";
import requests from "../../../utils/Requests";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
const CraeteAminities = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const history = useHistory();
  const postToApi = (values) => {
    console.log(values);
    axios
      .post(requests.createAmenities, values)
      .then((res) => {
        Swal.fire("success", "Aminity Added!", "success");
        history.push("/hotel/list-amities");
      })

      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Titlebanner title="Create Aminities" />
      <Card>
        <CardBody>
          <Row>
            <Col>
              <Field
                name="iconName"
                label="Icon Name"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Field
                name="amenitiesName"
                label="Amenities Name"
                component={RenderField.RenderTextField}
              />
            </Col>
          </Row>
          <div className="float-right">
            <Button
              color="primary"
              onClick={handleSubmit((values) =>
                postToApi({
                  ...values,
                })
              )}
            >
              Save
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default reduxForm({
  form: "CraeteAminities",
})(CraeteAminities);

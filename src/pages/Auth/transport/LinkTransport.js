import React, { useEffect, useState } from "react";
import Titlebanner from "../../../globel_cmponents/title_banner";
import axios from "axios";
import requests from "../../../utils/Requests";
import { reduxForm, Field } from "redux-form";
import { Card, Col, Row, CardBody, Button } from "reactstrap";
import RenderField from "../../formcomponent/formfields/RenderField";

const LinkTransport = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  useEffect(() => {
    getAttList();
  }, []);

  const [attList, setattList] = useState([]);

  const getAttList = async () => {
    await axios
      .post(requests.getAttractionAllForList, { attractionsId: 1 })
      .then((res) => {
        const values = [...attList];
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            label: res.data[i].attName,
            value: res.data[i].attractionsId,
          });
          // console.log(values);
        }
        setattList(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postToApi = (values) => {
    console.log(values);
  };
  return (
    <div>
      <Titlebanner title="Link Transport" />
      <Card>
        <CardBody>
          <Row>
            <Col>
              <Field
                label="Select Attraction"
                name="attractionId"
                component={RenderField.RenderSelectField}
                options={attList}
              />
            </Col>{" "}
            <Col>
              {" "}
              <Field
                label="Select Transport"
                name="attractionId"
                component={RenderField.RenderSelectField}
                options={attList}
              />
            </Col>
            <Col></Col>
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
  form: "LinkTransport",
})(LinkTransport);

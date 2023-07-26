import React, { useEffect, useState } from "react";
import Titlebanner from "../../../globel_cmponents/title_banner";
import { Row, Col, Card, Button } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import axios from "axios";
import requests from "../../../utils/Requests";
import RenderField from "../../formcomponent/formfields/RenderField";
const Statmentreport = (props) => {
  const { handleSubmit } = props;
  useEffect(() => {
    getagency();
  }, []);

  const [agencyList, setagencyList] = useState([]);

  const getagency = () => {
    axios
      .post(requests.getagencylist, {
        attractionsId: 1,
        secretKey: requests.apiKey,
      })
      .then((res) => {
        let values = [...agencyList];
        values.length = 0;
        values.push({
          label: "Select Agent",
          value: 0,
        });
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            label: res.data[i].agencyName,
            value: res.data[i].agencyId,
          });
        }
        setagencyList(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getReport = (values) => {
    console.log("id", values);
  };
  return (
    <>
      <Titlebanner title="Statment Report" />
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <Field
                name="test"
                options={agencyList}
                //onChange={(e) => test(e)}
                component={RenderField.RenderSelectField}
              />
            </Col>
            <Col>
              <Field
                name="startDate"
                type="date"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Field
                name="endDate"
                type="date"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Button
                color="primary"
                style={{ marginTop: "25px" }}
                onClick={handleSubmit((values) =>
                  getReport({
                    ...values,
                  })
                )}
              >
                Get Report
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default reduxForm({
  form: "Statmentreport",
})(Statmentreport);

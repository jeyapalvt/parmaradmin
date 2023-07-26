import React, { useEffect, useState } from "react";

import { reduxForm, Field } from "redux-form";
import Titlebanner from "../../../globel_cmponents/title_banner";
import axios from "axios";
import requests from "../../../utils/Requests";
import { Card, CardBody, Label, Row, Col, Button } from "reactstrap";
import Select from "react-select";
import RenderField from "../../formcomponent/formfields/RenderField";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
const validate = (values) => {
  const errors = {};
  if (!values.agencyName) {
    errors.agencyName = "Required";
  }
  return errors;
};

const ApiAccessPermistion = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  let history = useHistory();
  useEffect(() => {
    getagency();
  }, []);

  const [agencyList, setagencyList] = useState([]);
  const [agentDataList, setagentDataList] = useState([]);
  const [selectedAgentData, setselectedAgentData] = useState([]);

  const getagency = () => {
    axios
      .post(requests.getagencylist, {
        attractionsId: 1,
        secretKey: requests.apiKey,
      })
      .then((res) => {
        console.log("res", res.data);
        setagentDataList(res.data);
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

  const [allowTestApiAccess, setallowTestApiAccess] = useState(false);
  const [allowLiveApiAccess, setallowLiveApiAccess] = useState(false);
  const selectedAgent = (id) => {
    console.log(id);

    let tempData = agentDataList.filter((item) => item.agencyId == id);

    console.log("ajxiabxia", tempData);
    setselectedAgentData(tempData);

    setallowTestApiAccess(false);
    setallowLiveApiAccess(false);

    if (tempData[0].allowTestApiAccess === true) {
      setallowTestApiAccess(true);
    }
    if (tempData[0].allowTestApiAccess == -true) {
      setallowLiveApiAccess(true);
    }
    props.initialize({
      allowTestApiAccess: tempData[0].allowTestApiAccess,
      allowLiveApiAccess: tempData[0].allowLiveApiAccess,
      testIpAddress: tempData[0].testIpAddress,
      testUserName: tempData[0].testUserName,
      testUserPassword: tempData[0].testUserPassword,
      testCreditLimit: tempData[0].testCreditLimit,
      testCreditUtilized: tempData[0].testCreditUtilized,
      testCurrentBalance: tempData[0].testCurrentBalance,
      liveIpAddress: tempData[0].liveIpAddress,
      liveUserName: tempData[0].liveUserName,
      liveUserPassword: tempData[0].liveUserPassword,
      creditLimit: tempData[0].creditLimit,
      creditUtilized: tempData[0].creditUtilized,
      currentBalance: tempData[0].currentBalance,
    });
  };

  const submitValues = (values) => {
    console.log(values);

    const submitObj = {
      ...selectedAgentData[0],
      ...values,
      testCurrentBalance: values.testCreditLimit,
      secretKey: requests.apiKey,
    };

    axios
      .post(requests.updateAgencyDetails, submitObj)
      .then((res) => {
        Swal.fire({
          title: "success!", //'Good job!',
          text: "API Access Created For Agent", //'You clicked the button.',
          icon: "success", //'success'
        });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("--->", submitObj);
  };
  return (
    <div>
      <Titlebanner title="API Setting For Agents" />
      <Label for="exampleSelect">Select Agent</Label>
      <Select
        // value={selectedOption}
        onChange={(e) => selectedAgent(e.value)}
        options={agencyList}
      />

      <br />
      <br />
      <Row>
        <Col sm="6">
          <Card>
            <CardBody>
              <h3>For Test</h3>
              <Row>
                <Col sm="6">
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
                      Allow To Access Test API
                    </Label>
                    <Field
                      name="allowTestApiAccess"
                      type="checkbox"
                      onChange={() =>
                        setallowTestApiAccess(!allowTestApiAccess)
                      }
                      component={RenderField.RenderTextField}
                    />
                  </div>
                  <br />
                  <Field
                    name="testIpAddress"
                    label=" Ip Address"
                    disabled={!allowTestApiAccess}
                    component={RenderField.RenderTextField}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  <Field
                    name="testUserName"
                    type="text"
                    label=" User Name"
                    disabled={!allowTestApiAccess}
                    component={RenderField.RenderTextField}
                  />
                </Col>
                <Col sm="6">
                  <Field
                    name="testUserPassword"
                    type="password"
                    disabled={!allowTestApiAccess}
                    label="User Password"
                    component={RenderField.RenderTextField}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <Field
                    name="testCreditLimit"
                    type="text"
                    disabled={!allowTestApiAccess}
                    label=" Credit Limit"
                    component={RenderField.RenderTextField}
                  />
                </Col>
                <Col sm="4">
                  <Field
                    name="testCreditUtilized"
                    type="text"
                    label=" Credit Utilized"
                    component={RenderField.RenderDisableField}
                  />
                </Col>
                <Col sm="4">
                  <Field
                    name="testCreditLimit"
                    type="text"
                    label=" Current Balance"
                    component={RenderField.RenderDisableField}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm="6">
          <Card>
            <CardBody>
              <h3>For Live</h3>
              <Row>
                <Col sm="6">
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
                      Allow To Access Live API
                    </Label>
                    <Field
                      name="allowLiveApiAccess"
                      type="checkbox"
                      onChange={() =>
                        setallowLiveApiAccess(!allowLiveApiAccess)
                      }
                      component={RenderField.RenderTextField}
                    />
                  </div>
                  <br />
                  <Field
                    name="liveIpAddress"
                    type="text"
                    disabled={!allowLiveApiAccess}
                    label="Live Ip Address"
                    component={RenderField.RenderTextField}
                  />{" "}
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  <Field
                    name="liveUserName"
                    type="text"
                    disabled={!allowLiveApiAccess}
                    label=" User Name"
                    component={RenderField.RenderTextField}
                  />
                </Col>
                <Col sm="6">
                  <Field
                    name="liveUserPassword"
                    type="password"
                    disabled={!allowLiveApiAccess}
                    label=" User Password"
                    component={RenderField.RenderTextField}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <Field
                    name="creditLimit"
                    type="text"
                    label=" Credit Limit"
                    component={RenderField.RenderDisableField}
                  />
                </Col>
                <Col sm="4">
                  <Field
                    name="creditUtilized"
                    type="text"
                    label=" Credit Utilized"
                    component={RenderField.RenderDisableField}
                  />
                </Col>
                <Col sm="4">
                  <Field
                    name="currentBalance"
                    type="text"
                    label=" Current Balance"
                    component={RenderField.RenderDisableField}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-end">
            <Button
              color="primary"
              onClick={handleSubmit((values) =>
                submitValues({
                  ...values,
                })
              )}
            >
              Proceed To Save
            </Button>
            &nbsp; &nbsp;&nbsp;
            <Button color="danger">Cancel</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default reduxForm({
  form: "ApiAccessPermistion",
})(ApiAccessPermistion);

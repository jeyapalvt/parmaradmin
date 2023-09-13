import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card, CardBody } from "reactstrap";
import { Form, Field, reduxForm, reset } from "redux-form";
import axios from "axios";
import requests from "../../../utils/Requests";
import RenderField from "../../formcomponent/formfields/RenderField";
import Titlebanner from "../../../globel_cmponents/title_banner";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
const CreateFaq = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  let history = useHistory();
  useEffect(() => {
    getallparkgroup();
  }, []);
  const [parkGroup, setparkGroup] = useState([]);
  const [attractionList, setattractionList] = useState([]);
  const getallparkgroup = async () => {
    await axios
      .post(requests.getallparkgroup, { attractionsId: 1 })
      .then((res) => {
        const values = [...parkGroup];
        values.push({
          name: "Select Your Attraction Group",
          value: "",
        });
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            name: res.data[i].grpName,
            value: res.data[i].attractionGroupId,
          });
          // console.log(values);
        }
        setparkGroup(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getattractionbygroup = async (groupId) => {
    await axios
      .post(requests.getattractionallbygroup, { attGroup: groupId })
      .then((res) => {
        const values = [...attractionList];
        values.length = 0;
        values.push({
          name: "Select Your Attraction",
          value: "",
        });
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            name: res.data[i].attName,
            value: res.data[i].attractionsId,
          });
        }
        setattractionList(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const postToApi = (values) => {
    const postObject = {
      attractionId: values.attractionId,
      faqQuestion: values.faqQuestion,
      faqAnswer: values.faqAnswer,
    };

    axios
      .post(requests.addAttractionFaqs, postObject)
      .then((res) => {
        console.log(res.data);
        if (res.data.errCode === 200) {
          Swal.fire("Success!", "Review Added Success!", "success");
          history.goBack();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("postObject", postObject);
  };
  return (
    <div>
      <Titlebanner title="Create New FAQ" />
      <Card>
        <CardBody>
          <Row>
            <Col>
              <Field
                name="ttGroupId"
                type="select"
                label="Attraction Group"
                customfeild={parkGroup}
                component={RenderField.renderOptionField}
                id="attGroup"
                onChange={(e) => getattractionbygroup(e.target.value)}
              />
            </Col>
            <Col>
              <Field
                name="attractionId" //attractionList
                type="select"
                label="Atrraction List"
                // value={attTemp}
                customfeild={attractionList}
                component={RenderField.renderOptionField}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Field
                name="faqQuestion"
                type="text"
                label="Question"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Field
                name="faqAnswer"
                type="textarea"
                component={RenderField.RenderTextareaField}
                label="Answer"
              />
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <Button
              color="primary"
              onClick={handleSubmit((values) =>
                postToApi({
                  ...values,
                  pill: 2,
                })
              )}
            >
              Save
            </Button>
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
      </Card>
    </div>
  );
};

export default reduxForm({
  form: "CreateFaq",
})(CreateFaq);

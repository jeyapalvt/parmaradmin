import React, { useEffect, useState } from "react";
import Titlebanner from "../../../globel_cmponents/title_banner";
import { Card, CardBody, Col, Row, Button } from "reactstrap";
import { Form, Field, reduxForm, reset } from "redux-form";
import axios from "axios";
import requests from "../../../utils/Requests";
import RenderField from "../../formcomponent/formfields/RenderField";
import MarkupForm from "../payment/forms/MarkupForm";
import MarkupTable from "./Tables/MarkupTable";
import Swal from "sweetalert2";

const validate = (values) => {
  const errors = {};

  if (!values.markupAgencyId) {
    errors.markupAgencyId = "Required";
  }
  if (!values.markupApiRate) {
    errors.markupApiRate = "Required";
  }
  if (!values.markupAgentRate) {
    errors.markupAgentRate = "Required";
  }

  return errors;
};

const MarkupDiscount = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const [agentList, setagentList] = useState([]);
  const [disableField, setdisableField] = useState(false);
  useEffect(() => {
    getAgentList();
  }, []);
  const getAgentList = () => {
    axios
      .post(requests.getagencylist, {
        attractionsId: 1,
        secretKey: requests.apiKey,
      })
      .then((res) => {
        const values = [...agentList];
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
        setagentList(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const SetMarkUpPrice = (values, dispatch) => {
    if (values.pill == 1) {
      axios
        .post(requests.setApiMarkupDiscount, values)
        .then((response) => {
          if (response.data.errCode == 0) {
            Swal.fire({
              title: "success!", //'Good job!',
              text: "Markup Added Successfully", //'You clicked the button.',
              icon: "success", //'success'
            });
            dispatch(reset("MarkupDiscount"));
            window.location.reload();
          } else if (response.data.errCode == 152) {
            Swal.fire({
              title: "warning!", //'Good job!',
              text: "Price Is Already Added", //'You clicked the button.',
              icon: "warning", //'success'
            });
            dispatch(reset("MarkupDiscount"));
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (values.pill == 2) {
      axios
        .post(requests.updateApiMarkupDiscount, values)
        .then((response) => {
          if (response.data.errCode == 0) {
            Swal.fire({
              title: "success!", //'Good job!',
              text: "Markup Updated Successfully", //'You clicked the button.',
              icon: "success", //'success'
            });
            dispatch(reset("MarkupDiscount"));
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const editData = (val) => {
    axios
      .post(requests.getApiMarkupDiscountList, { markupDiscountApiId: 0 })
      .then((response) => {
        //  setrowData(response.data);
        const tempData = response.data;
        const filterData = tempData.filter(
          (item) => item.markupDiscountApiId == val
        );

        initializeData(filterData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const initializeData = (filterData) => {
    props.initialize({
      markupDiscountApiId: filterData[0].markupDiscountApiId,
      markupAgencyId: filterData[0].markupAgencyId,
      markupAgentRate: filterData[0].markupAgentRate,
      markupApiRate: filterData[0].markupApiRate,
      markupB2cRate: filterData[0].markupB2cRate,
    });

    setdisableField(true);
  };
  return (
    <>
      <Titlebanner title="API Markup Discount" />
      <Card>
        <CardBody>
          <Row>
            <Col>
              <Field
                name="markupAgencyId"
                type="select"
                isDisabled={disableField}
                options={agentList}
                label="Agent"
                component={RenderField.RenderSelectField}
              />
            </Col>
            <Col>
              <Field
                name="markupApiRate"
                type="text"
                label="Markup Api Rate"
                component={
                  disableField == false
                    ? RenderField.RenderTextField
                    : RenderField.RenderDisableField
                }
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Field
                name="markupAgentRate"
                type="text"
                label="Markup Agent Rate"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              {/* <Field
                name="markupB2cRate"
                type="text"
                label="Markup B2C Rate"
                component={RenderField.RenderTextField}
              /> */}
            </Col>
          </Row>
          <div className="float-right">
            <Button
              color="success"
              disabled={submitting}
              onClick={handleSubmit((values) =>
                SetMarkUpPrice({
                  ...values,
                  pill: 1,
                })
              )}
            >
              Save
            </Button>{" "}
            <Button
              color="primary"
              disabled={submitting}
              onClick={handleSubmit((values) =>
                SetMarkUpPrice({
                  ...values,
                  pill: 2,
                })
              )}
            >
              Update
            </Button>{" "}
            <Button
              color="danger"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Cancel
            </Button>{" "}
            {/* <Button color="danger" onClick={history.goBack()}>
                Cancel
              </Button>{" "} */}
          </div>
        </CardBody>
      </Card>

      <MarkupTable editData={editData} />
    </>
  );
};

export default reduxForm({
  form: "MarkupDiscount",
  validate,
  // onSubmitSuccess: AfterSubmit,
})(MarkupDiscount);

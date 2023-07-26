import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Button } from "reactstrap";
import { Form, Field, reduxForm, reset } from "redux-form";
import requests from "../../../utils/Requests";
import RenderField from "../../formcomponent/formfields/RenderField";
import Swal from "sweetalert2";
import PriceSettingTable from "./Tables/PriceSettingTable";

const validate = (values) => {
  const errors = {};

  if (!values.apiPrice) {
    errors.apiPrice = "Required";
  }
  if (!values.agentPrice) {
    errors.agentPrice = "Required";
  }
  if (!values.b2cPrice) {
    errors.b2cPrice = "Required";
  }

  return errors;
};

const PriceSetting = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  useEffect(() => {}, []);

  const [disableField, setdisableField] = useState(false);
  const [dataId, setdataId] = useState("");

  const editData = (val) => {
    axios
      .post(requests.getApiRateList, { apiRateSettingId: 0 })
      .then((response) => {
        const tempData = response.data;
        const filterData = tempData.filter(
          (item) => item.apiRateSettingId == val
        );

        initializeData(filterData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const initializeData = (filterData) => {
    props.initialize({
      apiRateSettingId: filterData[0].apiRateSettingId,
      apiPrice: filterData[0].apiPrice,
      agentPrice: filterData[0].agentPrice,
      b2cPrice: filterData[0].b2cPrice,
    });

    setdisableField(true);
  };

  const SetApiPrice = (values, dispatch) => {
    const apiPriceData = {
      apiRateSettingId: dataId,
      apiPrice: values.apiPrice,
      agentPrice: values.agentPrice,
      b2cPrice: values.b2cPrice,
    };

    if (values.pill == 1) {
      axios
        .post(requests.setApiRate, values)
        .then((response) => {
          if (response.data.errCode == 0) {
            Swal.fire({
              title: "success!", //'Good job!',
              text: "Price Added Successfully", //'You clicked the button.',
              icon: "success", //'success'
            });
            dispatch(reset("PriceSetting"));
            window.location.reload();
          } else if (response.data.errCode == 151) {
            Swal.fire({
              title: "warning!", //'Good job!',
              text: "Price Is Already Added", //'You clicked the button.',
              icon: "warning", //'success'
            });
            dispatch(reset("PriceSetting"));
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (values.pill == 2) {
      axios
        .post(requests.updateApiRate, values)
        .then((response) => {
          if (response.data.errCode == 0) {
            Swal.fire({
              title: "success!", //'Good job!',
              text: "Price Updated Successfully", //'You clicked the button.',
              icon: "success", //'success'
            });
            dispatch(reset("PriceSetting"));
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const DeleteApiPrice = (values) => {
    console.log("Delete", values);
  };

  return (
    <>
      <Card>
        <Form>
          <CardBody>
            <Row>
              <p>{props.editDataId}</p>
              <Col>
                <Field
                  name="apiPrice"
                  type="text"
                  label="API Price"
                  component={
                    disableField == false
                      ? RenderField.RenderTextField
                      : RenderField.RenderDisableField
                  }
                />
              </Col>
              <Col>
                <Field
                  name="agentPrice"
                  type="text"
                  label="Agent Price"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col>
                <Field
                  name="b2cPrice"
                  type="text"
                  label="B2C Price"
                  component={RenderField.RenderTextField}
                />
              </Col>
            </Row>
            <div className="float-right">
              <Button
                color="success"
                disabled={submitting}
                onClick={handleSubmit((values) =>
                  SetApiPrice({
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
                  SetApiPrice({
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
        </Form>
      </Card>

      <PriceSettingTable editData={editData} />
    </>
  );
};
export default reduxForm({
  form: "PriceSetting",
  validate,
  // onSubmitSuccess: AfterSubmit,
})(PriceSetting);

import { Form, Field, reduxForm } from "redux-form";
import { CardBody, Card, Button, Row, Col, Label } from "reactstrap";
import RenderField from "../../../formcomponent/formfields/RenderField";
import axios from "axios";
import requests from "../../../../utils/Requests";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Converter } from "any-number-to-words";
import { useHistory } from "react-router-dom";

const validate = (values) => {
  const errors = {};
  if (!values.agencyId) {
    errors.agencyId = "Required";
  }
  if (!values.paymentType) {
    errors.paymentType = "Required";
  }
  if (!values.topupAmount) {
    errors.topupAmount = "Required";
  }
  if (!values.trnRemarks) {
    errors.trnRemarks = "Required";
  }

  return errors;
};

const PaymentCreationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  useEffect(() => {
    getagency();
  }, []);
  const converter = new Converter();
  let history = useHistory();
  let attraction = { attractionsId: 1 };
  const [agencyList, setagencyList] = useState([]);
  const [agencyPayemntDetails, setagencyPayemntDetails] = useState([]);
  const getagency = () => {
    axios
      .post(requests.getagencylist, {
        attractionsId: 1,
        secretKey: requests.apiKey,
      })
      .then((res) => {
        setagencyPayemntDetails(res.data);
        let values = [...agencyList];
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
  const [balance, setbalance] = useState();
  const [utilized, setutilized] = useState();
  const paymentType = [
    //online, cash, payment by link , check
    { name: "SELECT", value: "" },
    { name: "ONLINE", value: "ONLINE" },
    { name: "CASH", value: "CASH" },
    { name: "CHEQUE", value: "CHEQUE" },
    { name: "ADJUSTMENT", value: "ADJUSTMENT" },
    { name: "PAYMENT LINK VIA STRIPE", value: "PAYMENT LINK VIA STRIPE" },
    {
      name: "BANK TRANSFER TO EMIRATES NBD BANK",
      value: "BANK TRANSFER TO EMIRATES NBD BANK",
    },
    { name: "BANK TRANSFER TO RAK BANK", value: "BANK TRANSFER TO RAK BANK" },
  ];
  const getagentdetail = (val) => {
    //agencyId , currentBalance, creditUtilized currentBalance
    const toursfilter = agencyPayemntDetails.filter(
      (payment) => payment.agencyId == val
    );
    setbalance(toursfilter[0].currentBalance);
    setutilized(toursfilter[0].creditUtilized);
  };

  const pamentTopup = (values, dispatch) => {
    const toursfilter = agencyPayemntDetails.filter(
      (payment) => payment.agencyId == values.agencyId
    );

    const dataSubmit = {
      agencyId: values.agencyId,
      topupAmount: values.topupAmount,
      paymentType: values.paymentType,
      paymentRemarks: values.paymentRemarks,
      agencyEmail: toursfilter[0].agencyEmail,
      secretKey: requests.apiKey,
    };

    axios
      .post(requests.setAgencyCreditLimit, dataSubmit)
      .then((response) => {
        successAlert("success", "Payment Added To Agent", "success");
        setbalance(0);
        setutilized(0);
        dispatch(props.reset());
        history.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [numToWord, setnumToWord] = useState("");
  const numberToWord = (e) => {
    // console.log(e)
    setnumToWord(e);
  };
  const successAlert = (t, e, i) => {
    Swal.fire({
      title: t, //'Good job!',
      text: e, //'You clicked the button.',
      icon: i, //'success'
    });
  };

  return (
    <>
      <Card>
        <Form onSubmit={handleSubmit(pamentTopup.bind(this))}>
          <CardBody>
            <Row>
              <Col xs={4}>
                {/* <Field
                  name="agencyId"
                  type="select"
                  customfeild={agencyList}
                  label="Agency Name"
                  onChange={(e) => getagentdetail(e.target.value)}
                  component={RenderField.renderOptionField}
                /> */}
                <Field
                  name="agencyId"
                  label="Agency Name"
                  component={RenderField.RenderSelectField}
                  options={agencyList}
                  onChange={(e) => getagentdetail(e)}
                />
              </Col>

              <Col xs={4}>
                <Label>Balance Amount</Label>
                <input
                  className="form-control"
                  defaultValue={balance}
                  type="text"
                  placeholder="Balance Amount"
                  readOnly
                />
              </Col>
              <Col xs={4}>
                <Label>Utilized Amount</Label>

                <input
                  className="form-control"
                  defaultValue={utilized}
                  type="text"
                  placeholder="Utilized Amount"
                  readOnly
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <Field
                  name="paymentType"
                  type="select"
                  label="Payment Type"
                  customfeild={paymentType}
                  component={RenderField.renderOptionField}
                />
              </Col>
              <Col xs={4}>
                <Field
                  name="topupAmount"
                  type="text"
                  label="Top Up Amount"
                  onChange={(e) => numberToWord(e.target.value)}
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col xs={4}>
                <br />
                <label>{numToWord && converter.toWords(numToWord)}</label>
              </Col>
            </Row>
            <Field
              name="paymentRemarks"
              type="textarea"
              label="Remark"
              component={RenderField.RenderTextField}
            />
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
  form: "PaymentCreationForm",
  validate,
})(PaymentCreationForm);

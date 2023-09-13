import {
  Card,
  CardBody,
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import { reduxForm, Form, Field, reset } from "redux-form";
import RenderField from "../../../formcomponent/formfields/RenderField";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Agencyuserform from "./Agencyuserform";
import FromSubmitToApi from "../../../../utils/FromSubmitToApi";
import axios from "axios";
import requests from "../../../../utils/Requests";
import Agencyuserlisttable from "../agency_user_list_table";
import { useHistory } from "react-router";

const validate = (values) => {
  const errors = {};
  if (!values.agencyName) {
    errors.agencyName = "Required";
  }
  if (!values.agencyCode) {
    errors.agencyCode = "Required";
  }
  if (!values.agencyCountry) {
    errors.agencyCountry = "Required";
  }
  if (!values.agencyCity) {
    errors.agencyCity = "Required";
  }
  if (!values.agencyAddress) {
    errors.agencyAddress = "Required";
  }
  if (!values.agencyEmail) {
    errors.agencyEmail = "Required";
  }
  if (!values.agencyPhoneNumber) {
    errors.agencyPhoneNumber = "Required";
  }
  if (!values.agencyWebsite) {
    errors.agencyWebsite = "Required";
  }
  if (!values.agencyCompanyType) {
    errors.agencyCompanyType = "Required";
  }
  if (!values.agencyTranNumber) {
    errors.agencyTranNumber = "Required";
  }
  // if (!values.agencyPassword ) {
  //   errors.agencyPassword = "Required";
  // }

  if (!values.agencyPassword) {
    errors.agencyPassword = "Required";
  } else if (values.agencyPassword.length < 8) {
    errors.agencyPassword = "Minimum be 8 characters or more";
  } else if (!/[A-Z]/.test(values.agencyPassword)) {
    errors.agencyPassword = "Minimum one upper Case";
  } else if (
    !/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/.test(values.agencyPassword)
  ) {
    errors.agencyPassword = "Minimum one special character";
  }
  // if(values.agencyPassword == RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")){
  //   errors.agencyPassword = "Password Must Contain 8 Charecter With [ a-z],[A-Z],[0-1],[!@#$%^&*]";
  // }
  if (
    !values.agencyConfirmPassword ||
    values.agencyConfirmPassword != values.agencyPassword
  ) {
    errors.agencyConfirmPassword = "Required";
  }
  if (!values.agencyCreditType) {
    errors.agencyCreditType = "Required";
  }
  // if (!values.creditLimit) {
  //   errors.creditLimit = "creditLimit";
  // }
  return errors;
};

const Agencycreationform = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  let history = useHistory();

  const [modal, setModal] = useState(false);

  const toggleModel = () => setModal(!modal);

  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const [isLoading, setisLoading] = useState(true);
  const [postReq, setpostReq] = useState();
  useEffect(() => {
    if (props.agentId == "null") {
      props.initialize({
        active_status: true,
        secretKey: requests.apiKey,
      });
      setisLoading(false);
      setpostReq(requests.postagencycreation);
    } else {
      getgentdetail();
      setpostReq(requests.updateAgencyDetails);
    }
    // {
    //   props.agentId == "null" ? {setisLoading(false);} : {getgentdetail();}
    // }
  }, []);

  let agentId = {
    agencyId: props.agentId,
    secretKey: requests.apiKey,
    withPassword: true,
  };
  //console.log(agentId);

  let agentDetail;
  const getgentdetail = async () => {
    await axios
      .post(requests.getagencydetail, agentId)
      .then((res) => {
        console.log(res.data);
        agentDetail = res.data;

        initialValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const initialValues = () => {
    // eslint-disable-next-line no-lone-blocks

    props.initialize({
      agencyId: props.agentId,
      agencyName: agentDetail.agencyName,
      agencyCode: agentDetail.agencyCode,
      agencyCountry: agentDetail.agencyCountry,
      agencyCity: agentDetail.agencyCity,
      agencyAddress: agentDetail.agencyAddress,
      agencyEmail: agentDetail.agencyEmail,
      agencyPhoneNumber: agentDetail.agencyPhoneNumber,
      agencyWebsite: agentDetail.agencyWebsite,
      agencyCompanyType: agentDetail.agencyCompanyType,
      agencyPassword: agentDetail.agencyPassword,
      agencyConfirmPassword: agentDetail.agencyPassword,
      agencyTranNumber: agentDetail.agencyTranNumber,
      agencyCreditType: agentDetail.agencyCreditType,
      creditLimit: agentDetail.creditLimit,
      creditUtilized: agentDetail.creditUtilized,
      currentBalance: agentDetail.currentBalance,
      activeStatus: agentDetail.activeStatus,
      secretKey: requests.apiKey,
    });
  };
  // if(isLoading){
  //   return(<>
  //   <p>Loading ...</p>
  //   </>)

  const [Data, setData] = useState({
    country: "",
    region: "",
  });
  const creditType = [
    {
      value: "",
      name: "SELECT",
    },
    {
      value: "PREPAID",
      name: "PREPAID",
    },
    {
      value: "CREDIT",
      name: "CREDIT",
    },
  ];

  const aciveStatus = [
    { value: "", name: "" },
    { value: true, name: "Active" },
    { value: false, name: "InActive" },
  ];

  // const handleFormValueUpdate = (e) => {
  //   const newdata = { ...Data };
  //   newdata[e.target.id] = e.target.value;
  //     setData(newdata)
  //     console.log(newdata);
  // };

  const handleFormValueUpdate = (id, value) => {
    const newdata = { ...Data };
    newdata[id] = value;
    setData(newdata);
  };

  const agencyCreation = (values) => {
    //  console.log("butten pressed")

    //  console.log(`${JSON.stringify(values, null, 2)}`);

    axios
      .post(postReq, values)
      .then((response) => {
        // console.log(response);
        // console.log(response.data)
        // console.log("response")

        if (response.status == 200) {
          Swal.fire({
            title: "success!", //'Good job!',
            text: "New Agency Created Successfully", //'You clicked the button.',
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
      {/* <h2>{props.agentId}</h2> */}
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div className="float-right">
                <Button color="primary" onClick={toggleModel}>
                  Create User
                </Button>
              </div>
            </Col>
          </Row>
          <Modal
            isOpen={modal}
            toggle={toggleModel}
            className="modal-dialog modal-lg"
          >
            <ModalHeader toggle={toggleModel}>Create New User</ModalHeader>
            <ModalBody>
              <Agencyuserform
                id={props.agentId}
                onSubmit={FromSubmitToApi.agencyUser}
              />
            </ModalBody>
          </Modal>

          <Form onSubmit={handleSubmit(agencyCreation.bind(this))}>
            <Row>
              <Col xs={3}>
                <Field
                  name="agencyName"
                  type="text"
                  label="Name"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col xs={3}>
                <Field
                  name="agencyCode"
                  type="text"
                  label="Code"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col xs={3}>
                <Field
                  name="agencyCountry"
                  type="text"
                  label="Country"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col xs={3}>
                <Field
                  name="agencyCity"
                  type="text"
                  label="City"
                  component={RenderField.RenderTextField}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <Field
                  name="agencyAddress"
                  type="textarea"
                  label="Address"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col xs={3}>
                <Field
                  name="agencyEmail"
                  type="text"
                  label="Email"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col xs={3}>
                <Field
                  name="agencyPhoneNumber"
                  type="number"
                  label="Contact Number"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col xs={3}>
                <Field
                  name="agencyWebsite"
                  type="text"
                  label="Website"
                  component={RenderField.RenderTextField}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <Field
                  name="agencyCompanyType"
                  type="text"
                  label="Company Type"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col xs={3}>
                <Field
                  name="agencyTranNumber"
                  type="text"
                  label="TRN Number"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col xs={3}>
                <Field
                  name="agencyPassword"
                  type="password"
                  label="Password"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col xs={3}>
                <Field
                  name="agencyConfirmPassword"
                  type="password"
                  label="Confirm Password"
                  component={RenderField.RenderTextField}
                />
              </Col>
            </Row>
            <Row>
              <Label>Credit Limit</Label>
              <Col xs={3}>
                <Field
                  name="agencyCreditType" // 1 prepaid, 2 Credit
                  type="select"
                  customfeild={creditType}
                  label="Credit Type"
                  component={RenderField.renderOptionField}
                />
              </Col>
              <Col xs={3}>
                <Field
                  name="creditLimit"
                  type="text"
                  label="Credit Amount"
                  component={RenderField.RenderTextField}
                />
              </Col>
              <Col xs={3}>
                <Field
                  name="creditUtilized"
                  type="number"
                  label="Utilized Amount"
                  component={RenderField.RenderDisableField}
                />
              </Col>
              <Col xs={3}>
                <Field
                  name="currentBalance"
                  type="number"
                  label="Balance Amount"
                  component={RenderField.RenderDisableField}
                />
                {/* <input type="text" name="test"/> */}
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <Field
                  name="activeStatus"
                  type="select"
                  label="Active Status"
                  customfeild={aciveStatus}
                  component={RenderField.renderOptionField}
                />
                {/* <input type="text" name="test"/> */}
              </Col>
            </Row>

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
          </Form>
        </CardBody>
      </Card>

      <Agencyuserlisttable agentId={agentId} />
    </>
  );
};

export default reduxForm({
  form: "Agencycreationform",
  validate,
})(Agencycreationform);

import { Card, CardBody, Button, Row, Col } from "reactstrap";
import { Form, Field, reduxForm, reset } from "redux-form";
import { useEffect, useState } from "react";
import RenderField from "../../../formcomponent/formfields/RenderField";
import axios from "axios";
import requests from "../../../../utils/Requests";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
const AfterSubmit = (result, dispatch) => {
  dispatch(reset("Agencyuserform"));
  //window.location.href = "/success";
};

const validate = (values) => {
  const errors = {};
  if (!values.userFirstName) {
    errors.userFirstName = "Required";
  }
  if (!values.userLastName) {
    errors.userLastName = "Required";
  }
  if (!values.userEmail) {
    errors.userEmail = "Required";
  }

  if (!values.userPassword  ) {
    errors.userPassword = "Required";
  }else if (values.userPassword.length < 8) {
    errors.userPassword = 'Minimum be 8 characters or more'
  } else if(!/[A-Z]/.test(values.userPassword)){
    errors.userPassword = 'Minimum one upper Case'
  }else if(!/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/.test(values.userPassword)){
    errors.userPassword = 'Minimum one special character'
  }
  if (!values.password || values.userPassword != values.password) {
    errors.password = "PassWord Not Match";
  }
  if (!values.userRoleId) {
    errors.userRoleId = "Required";
  }

  return errors;
};

const Agencyuserform = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  let history = useHistory();
  //requests.postagencyuser   --- create new user
  //
  useEffect(() => {
    getUserRoles();
    // console.log("Props", props);
    // setagencyRootId(props.id);
    if (props.id == 0) {
      // console.log("root Agent ID", props.rootAgentId.agencyId);
      // console.log("Sub User Id", props.subUserId);
      getRootAgent(props.rootAgentId.agencyId, props.subUserId);
    } else {
      // console.log("New User", props.id);
      props.initialize({ agencyId: props.id });
    }
    // console.log("Root Agent Id", props.rootAgentId.agencyId);
    // console.log("Sub User Id", props.subUserId);
    // {
    //   props.id == "null"
    //     ? setLoading(false)
    //     : props.initialize({ agencyId: props.id });
    // }
    // console.log("agency id", props.id);
    // // console.log("agency User Id", props.agentIdedit);
    // apiCall();
    // getRootAgent(props.rootAgentId.agencyId);
  }, []);

  let userDetail;
  const [agency, setagency] = useState([
    { name: "Select User Role", value: "" },
  ]);

  const [agencyStatus, setagencyStatus] = useState([
    { name: "Active", value: true },
    { name: "In-Active", value: false },
  ]);

  const getUserRoles = () => {
    axios
      .post(requests.getuserlist, { userRolesId: 1 })
      .then((res) => {
        const values = [...agency];
        values.length = 0;
        values.push({
          name: "Select User Role",
          value: "",
        });
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            name: res.data[i].userRolesName,
            value: res.data[i].userRolesId,
          });
        }
        setagency(values);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRootAgent = (agencyID, subAgentId) => {
 
    axios
      .post(requests.getagencyuserlistforagency, { agencyId: agencyID })
      .then((response) => {
       
        initialObject(response.data, subAgentId);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const initialObject = (userList, subAgentId) => {
  
    const agentForEdit = userList.filter(
      (user) => user.agencyUserId == subAgentId
    );
   
    

    props.initialize({
      agencyId: agentForEdit[0].agencyId,
      agencyUserId: agentForEdit[0].agencyUserId,
      userEmail: agentForEdit[0].userEmail,
      userFirstName: agentForEdit[0].userFirstName,
      userLastName: agentForEdit[0].userLastName,
      userPassword: agentForEdit[0].userPassword,
      password: agentForEdit[0].userPassword,
      userRoleId: agentForEdit[0].userRoleId,
      activeStatus: agentForEdit[0].activeStatus,
    });
  };
  // const getAgencyUserForEdit = () => {
  //   axios
  //     .post()
  //     .then(() => {})
  //     .catch(() => {});
  // };

  const agencyUserCreation = (values) => {
   


  
    axios
      .post(requests.postagencyuser, values)
      .then((response) => {
    
        if (response.status == 200) {
          Swal.fire({
            title: "Success", //'Good job!',
            text: "Agency Added", //'You clicked the button.',
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
      {/* <h2>{props.id}</h2> */}
      <Form onSubmit={handleSubmit(agencyUserCreation.bind(this))}>
        <Field
          name="agencyId"
          type="hidden"
          component={RenderField.RenderTextField}
        />
        <Row>
          <Col xs={4}>
            <Field
              name="userFirstName"
              type="text"
              label="First Name"
              component={RenderField.RenderTextField}
            />
          </Col>
          <Col xs={4}>
            <Field
              name="userLastName"
              type="text"
              label="Last Name"
              component={RenderField.RenderTextField}
            />
          </Col>

          <Col xs={4}>
            <Field
              name="userEmail"
              type="text"
              label="Email"
              component={RenderField.RenderTextField}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={4}>
            <Field
              name="userPassword"
              type="password"
              label="Password"
              component={RenderField.RenderTextField}
            />
          </Col>
          <Col xs={4}>
            <Field
              name="password"
              type="password"
              label="Confirm Password"
              component={RenderField.RenderTextField}
            />
          </Col>

          <Col xs={4}>
            <Field
              name="userRoleId"
              type="select"
              customfeild={agency}
              label="User Role"
              component={RenderField.renderOptionField}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              name="activeStatus"
              type="select"
              customfeild={agencyStatus}
              label="Status"
              component={RenderField.renderOptionField}
            />
          </Col>
        </Row>

        <div className="float-right">
          <Button color="primary" disabled={submitting}>
            Save
          </Button>{" "}
        </div>
      </Form>
    </>
  );
};
export default reduxForm({
  form: "Agencyuserform",

  validate,
  asyncBlurFields: ["ticketName"],
  onSubmitSuccess: AfterSubmit,
})(Agencyuserform);

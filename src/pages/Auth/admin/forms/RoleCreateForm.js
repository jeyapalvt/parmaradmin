import { Form, Field, reduxForm, reset } from "redux-form";
import { CardBody, Card, Button } from "reactstrap";
import RenderField from "../../../formcomponent/formfields/RenderField";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import requests from "../../../../utils/Requests";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
// const AfterSubmit = (result, dispatch) => {
//     dispatch(reset("RoleCreateForm"));
//   //  window.location.href = "/success";
//   };

const validate = (values) => {
  const errors = {};

  if (!values.userRolesName) {
    errors.userRolesName = "Required";
  }
  if (!values.userRolesDescription) {
    errors.userRolesDescription = "Required";
  }

  return errors;
};

const RoleCreateForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  let { id } = useParams();
  let history = useHistory();
  useEffect(() => {
    if (id != "null") {
      getUser(id);
    }
  }, []);
  let userDetail;
  const getUser = (roleID) => {
    //  console.log("grid is ready");

    axios
      .post(requests.getuserrolesdetail, { userRolesId: roleID })
      .then((res) => {
        userDetail = res.data;
        initialValues();
     
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const initialValues = () => {
    props.initialize({
      userRolesId: userDetail.userRolesId,
      userRolesName: userDetail.userRolesName,
      userRolesDescription: userDetail.userRolesDescription,
    });
  };
  const createRole = (values) => {
    axios
      .post(requests.postuserrolecreation, values)
      .then((response) => {
        if (response.status == 200) {
          Swal.fire({
            title: "success!", //'Good job!',
            text: "New Role Created Successfully", //'You clicked the button.',
            icon: "success", //'success'
          });
          history.goBack();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const goback = () => {
    history.goBack();
  };

  return (
    <>
      <Card>
        <Form onSubmit={handleSubmit(createRole.bind(this))}>
          <Field
            name="userRolesId"
            type="hidden"
            component={RenderField.RenderTextField}
          />
          <CardBody>
            <Field
              name="userRolesName"
              type="text"
              label="Role Name"
              component={RenderField.RenderTextField}
            />
            <br />
            <Field
              name="userRolesDescription"
              label="Role Description"
              type="textarea"
              component={RenderField.RenderTextField}
            />

            <div className="float-right">
              <Button color="primary" disabled={submitting}>
                Save
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
    </>
  );
};

export default reduxForm({
  form: "RoleCreateForm",
  validate,
  // onSubmitSuccess: AfterSubmit,
})(RoleCreateForm);

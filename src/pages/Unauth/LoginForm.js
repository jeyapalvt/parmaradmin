import { useState } from "react";

import { Form, Field, reduxForm } from "redux-form";
import { Button } from "reactstrap";
import RenderField from "../formcomponent/formfields/RenderField";
import { Alert } from "reactstrap";
import axios from "axios";
import requests from "../../utils/Requests";
import encryptStorage from "../../utils/EncryptStorage";
const LoginForm = (props) => {
  // const [LoginData, setLoginData] = useState({
  //   empName: "",
  //   empPass: "",
  // });
  // const { LoginUser } = UseAuth();
  // const handleForm = (e) => {
  //   const newdata = { ...LoginData };

  //   console.log(newdata.empName);
  //   newdata[e.target.id] = e.target.value;

  //   console.log(newdata);
  // };
  // const submitForm = (e) => {
  //   e.preventDefault();
  //   LoginUser(LoginData);
  //   // loginuser(Data);
  // };
  const [loading, setloading] = useState(true);
  const { handleSubmit, pristine, reset, submitting } = props;
  const [alertTime, setalertTime] = useState(0);
  const logindata = (values) => {
    //     User Name : itteamparmar@gmail.com
    //     Password : Dubai@2022
    //     User Name : parmarjis@gmail.com
    // Password : Parmar@2022
    const userData = {
      userEmail: values.username,
      userPassword: values.password,
    };

    // console.log("userData", userData);
    // if (
    //   values.username === "ta.jeyapal@gmail.com" &&
    //   values.password === "jeyapalsenest@mail.com"
    // ) {
    //   sessionStorage.setItem("login", 1);
    //   window.location.reload();
    //   window.location.href = "/";
    // }

    axios
      .post(requests.getUserData, userData)

      .then((response) => {
        console.log("user Data", response.data);
        if (response.data.errCode == 0) {
          encryptStorage.setItem("DFuck", response.data);
          sessionStorage.setItem("login", 1);
          window.location.reload();
          window.location.href = "/";
        } else {
          setalertTime(1);

          setTimeout(function () {
            setalertTime(0);
          }, 5000);
          sessionStorage.setItem("login", 0);
        }
      })
      .catch((error) => {
        setalertTime(1);

        setTimeout(function () {
          setalertTime(0);
        }, 5000);
        sessionStorage.setItem("login", 0);
      });
  };

  return (
    <>
      <div className="login-page">
        <div className="login-box ">
          {/* /.login-logo */}
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <div className="h1">
                <b>Parmar Tourism</b>
              </div>
            </div>
            <div className="card-body">
              <p className="login-box-msg">Sign in to start your session</p>
              {/* <form onSubmit={(e) => submitForm(e)}> */}
              {alertTime == 1 ? (
                <>
                  <Alert color="danger">
                    <p>Invalid Username Or Password</p>
                  </Alert>
                </>
              ) : null}
              <Form onSubmit={handleSubmit(logindata.bind(this))}>
                <div>
                  <Field
                    name="username"
                    type="text"
                    label="User Name"
                    component={RenderField.RenderTextField}
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    type="password"
                    label="Password"
                    component={RenderField.RenderTextField}
                  />
                </div>
                {/* <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary"></div>
                  </div>
                 
                  <div className="col-4">
                    <Button color="primary" disabled={submitting}>
                      Sign In
                    </Button>{" "}
                  </div>
               
                </div> */}

                <div className="float-right">
                  <Button color="primary" disabled={submitting}>
                    Sign In
                  </Button>{" "}
                </div>
              </Form>

              {/* /.social-auth-links */}
              <p className="mb-1">
                {/* <Link to="/forget-Password">I forgot my password</Link> */}
              </p>
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </div>
      </div>
    </>
  );
};

export default reduxForm({
  form: "LoginForm",
})(LoginForm);

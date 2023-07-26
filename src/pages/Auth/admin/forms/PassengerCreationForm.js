import { Form, Field, reduxForm } from "redux-form";
import { CardBody, Card, Button } from "reactstrap";
import RenderField from "../../../formcomponent/formfields/RenderField";

const validate = (values) => {
  const errors = {};
  if (!values.roleName) {
    errors.roleName = "Required";
  }
  if (!values.roleDescription) {
    errors.roleDescription = "Required";
  }

  return errors;
};
const PassengerCreationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <>
      <Card>
        <Form
          onSubmit={(event) => {
            handleSubmit(event).then(reset);
          }}
        >
          <CardBody>
            <Field
              name="roleName"
              type="text"
              label="Role Name"
              component={RenderField.RenderTextField}
            />
            <br />
            <Field
              name="roleDescription"
              label="ROle Description"
              type="textarea"
              component={RenderField.RenderTextField}
            />
          </CardBody>
          <div className="float-right">
            <Button color="primary" disabled={submitting || pristine}>
              Save
            </Button>{" "}
            <Button
              color="primary"
              onClick={reset}
              disabled={submitting || pristine}
            >
              Cancel
            </Button>{" "}
          </div>
          <br />
          <br />
          &nbsp;&nbsp;
        </Form>
      </Card>
    </>
  );
};

export default reduxForm({
  validate,
  form: "PassengerCreationForm",
})(PassengerCreationForm);

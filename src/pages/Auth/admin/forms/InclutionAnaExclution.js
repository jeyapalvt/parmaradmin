import { Form, Field, reduxForm } from "redux-form";
import { CardBody, Card, Button } from "reactstrap"
import RenderField from "../../../formcomponent/formfields/RenderField";
const InclutionAndExclution = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (<>

        <Card>
            <Form onSubmit={handleSubmit}>


                <CardBody>

                    <Field
                        name="inclution"
                        type="text"
                        label="Inclusion"
                        component={RenderField.RenderTextField} /><br />
                    <Field
                        name="exclution"
                        label="Exclusion"
                        type="textarea"
                        component={RenderField.RenderTextField} />

                </CardBody>
                <div className="float-right">
                    <Button color="primary" disabled={submitting}>
                        Save
                    </Button>{" "}
                    <Button color="primary" disabled={submitting}>
                        Cancel
                    </Button>{" "}
                </div><br /><br />&nbsp;&nbsp;
            </Form>
        </Card>

    </>);
}

export default reduxForm({
    form: "InclutionAndExclution",

})(InclutionAndExclution);
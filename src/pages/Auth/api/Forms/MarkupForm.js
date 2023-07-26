import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Form, Field, reduxForm, reset } from "redux-form";
const ApiMarkupForm =(props)=>{
    const { handleSubmit, pristine, reset, submitting } = props;
    return(
        <>
            <Card>
                <CardBody>
                    
                </CardBody>
            </Card>
        </>
    )

}
export default reduxForm({
    form: "ApiMarkupForm",
    // validate,
    // onSubmitSuccess: AfterSubmit,
  })(ApiMarkupForm);
  
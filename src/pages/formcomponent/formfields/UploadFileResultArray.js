const UploadFileRsultArray = () => {
    return (<>

    </>);
}

export default UploadFileRsultArray;




import { Field } from "redux-form";
import RenderField from "./RenderField";
import { useState } from "react";
import {
  Card,
  Label,
  Row,
  Col,
  CardBody,
  Button,
  CardHeader,
  CardTitle,
  CardText,
} from "reactstrap";
import InclutionExclution from "./InclutionExclution";
// const renderSubFields = (Ticket, index, fields,) => (
//   <div key={(index, Ticket)}>
//     {/* <button
//         type="button"{ fields, }
//         title="Remove Member"
//         onClick={() => fields.remove(index)}
//       /> */}

//     <Row>
//       <Col xs={2}>
//         {" "}
//         <br /> &nbsp; &nbsp;
//         <Label>Ticket #{index + 1}</Label>
//         {/* {console.log(fields.get(index).type)} */}
//       </Col>
//       <Col xs={3}>
//         <Field
//           name={`${Ticket}.number`}
//           type="text"
//           component={RenderField.RenderTextField}
//           placeholder={`${Ticket}.number`}
//           label=""
//         />
//       </Col>
//       <Col xs={3}>
//         <Field
//           name={`${Ticket}.lastName`}
//           type="text"
//           component={RenderField.RenderTextField}
//           label=""
//         />
//       </Col>
//       <Col xs={3}> </Col>
//     </Row>
//   </div >
// );

const RenderArrayField = ({ fields, meta: { error, submitFailed } }) => {
  const [tktCountField, settktCountField] = useState();
  const renderTicketEntryField = (e) => {
    fields.removeAll();
    for (let i = 0; i < tktCountField; i++) {
      fields.push({ type: "a" });
    }
  };
  const resetField = (e) => {
    fields.removeAll();
  };

  return (
    <>
      <Row>
        <Col xs={3}>
          <Field
            name="totalTickets"
            type="number"
            onChange={(e) => settktCountField(e.target.value)}
            component={RenderField.RenderTextField}
          />
        </Col>

        <Col xs={2}>
          {" "}
          <br />
          {/* <Button color="primary" onClick={(e) => renderTicketEntryField(e)}>
            Add Tickets
          </Button>{" "} */}
        </Col>
      
        <Col xs={2}><br />
          <Button color="primary" onClick={() => fields.push({})}>
            Add Extra one
          </Button>{" "}
        </Col>
        {submitFailed && error && <span>{error}</span>}
        <Col xs={2}><br />
          {" "}
          {/* <Button color="primary" onClick={(e) => resetField(e)}>
            Reset
          </Button>{" "} */}
        </Col>
        {error && { error }}

      </Row>

      {fields.map((member, index) => (
      <li key={index}>
       
        <h4>Member #{index + 1}</h4>
        <Field
          name={`${member}.firstName`}
          type="text"
          component={RenderField.RenderTextField}
          label="First Name"
        />
        <Field
          name={`${member}.lastName`}
          type="text"
          component={RenderField.RenderTextField}
          label="Last Name"
        />
     
      </li>
    ))}


      {/* <div className="tkt-scrollable">{fields.map(renderSubFields)}</div> */}
    </>
  );
};

export default RenderArrayField;

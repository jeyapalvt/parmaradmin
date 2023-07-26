import { Field } from "redux-form";
import RenderField from "./RenderField";
import { useState } from "react";
import { Row, Col, Button } from "reactstrap";

const RenderArrayField = ({
  fields,
  meta: { touched, error, submitFailed },
}) => {
  const [tktCountField, settktCountField] = useState();
  const renderTicketEntryField = (e) => {
    fields.removeAll();
    for (let i = 0; i < tktCountField; i++) {
      fields.push(); //add extra value   fields.push({ type: "a" });
    }
  };
  const resetField = (e) => {
    fields.removeAll();
  };

  const tktCatogery = [
    { name: "ADULT", value: "ADULT" },
    { name: "CHILD", value: "CHILD" },
  ];

  return (
    <ul>
      <li>
        <Col xs={3}>
          <Field
            name="totalTickets"
            type="number"
            onChange={(e) => settktCountField(e.target.value)}
            component={RenderField.RenderTextField}
          />
          {(touched || submitFailed) && error && <span>{error}</span>}
        </Col>

        <Col xs={2}>
          {" "}
          <br />
          <Button color="primary" onClick={(e) => renderTicketEntryField(e)}>
            Add Tickets
          </Button>{" "}
        </Col>
      </li>
      {fields.map((member, index) => (
        <li key={index}>
          <Row>
            <Col xs={2}>
              {" "}
              <br />
              <h4>Ticket #{index + 1}</h4>
            </Col>
            <Col xs={3}>
              {" "}
              <Field
                name={`${member}.ticketNumber`}
                type="text"
                component={RenderField.RenderTextField}
                label="Ticket Number"
              />
            </Col>
            {/* <Col xs={3}>
              {" "}
              <Field
              name={`${member}.adultOrChild`}
              type="select"
              customfeild={tktCatogery}
              component={RenderField.renderOptionField}
              label="Select Catogery"
            />
            </Col> */}
          </Row>
        </li>
      ))}
    </ul>
  );
};

export default RenderArrayField;

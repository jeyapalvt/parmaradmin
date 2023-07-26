import { Field } from "redux-form";
import RenderField from "./RenderField";
import { useState } from "react";
import { Label, Row, Col, Button } from "reactstrap";

import DropZoneSingleRender from "./dropzonSingle/DropZoneSingleRender";
const renderSubFields = (Tourpack, index, fields) => (
  <div key={(index, Tourpack)}>
    <Button color="primary" type="button" onClick={() => fields.remove(index)}>
      Remove
    </Button>

    <Row>
      <Field
        name={`${Tourpack}.packageDayOrdinal`}
        type="hidden"
        component={RenderField.RenderTextField}
        placeholder={`${Tourpack}.packageDayOrdinal`}
      />

      <Col xs={6}>
        <Field
          name={`${Tourpack}.packageDayHeading`}
          type="text"
          component={RenderField.RenderTextField}
          label="Title"
        />
      </Col>
      <Col xs={6}>
        <Field
          name={`${Tourpack}.packageDayActivity`}
          type="textarea"
          component={RenderField.RenderTextField}
          label="Description"
        />
      </Col>
      <br />
      <Label>Thumbnail Image</Label>
      <Field
        name={`${Tourpack}.packageSitePhoto`}
        component={DropZoneSingleRender}
      />
    </Row>
  </div>
);

const TourpackArrayField = ({ fields, meta: { error, submitFailed } }) => {
  const [tktCountField, settktCountField] = useState();
  const renderTourpackEntryField = (e) => {
    fields.removeAll();
    for (let i = 0; i < tktCountField; i++) {
      //   fields.push({ type: "a" });
      fields.push();
    }
  };
  const resetField = (e) => {
    fields.removeAll();
  };

  return (
    <>
      <Row>
        <Col xs={3}>
          {/* <Label> Number Of Days</Label> */}
          <Field
            name="tourNofDays"
            type="number"
            onChange={(e) => settktCountField(e.target.value)}
            component={RenderField.RenderTextField}
          />
        </Col>

        <Col xs={2}>
          {" "}
          <br />
          <Button color="primary" onClick={(e) => renderTourpackEntryField(e)}>
            Add pack
          </Button>{" "}
        </Col>
        <Col xs={2}>
          <br />
          {/* <Button color="primary" onClick={fields.push}>
            Add Extra one
          </Button>{" "} */}
        </Col>
        <Col xs={2}>
          <br />{" "}
          {/* <Button color="primary" onClick={(e) => resetField(e)}>
            Reset
          </Button>{" "} */}
        </Col>
        {error && { error }}
      </Row>

      <div className="tkt-scrollable">{fields.map(renderSubFields)}</div>
    </>
  );
};

export default TourpackArrayField;

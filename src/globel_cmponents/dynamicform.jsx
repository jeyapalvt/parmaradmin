import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Form, Button, Row, Col } from "react-bootstrap";

const Dynamicform = () => {
  const [bookRoomData, setBookRoomData] = useState([
    { roomType: "", roomNumber: 0, guest: 0 },
  ]);

  const handleChange = (index, event) => {
    const values = [...bookRoomData];
    if (event.target.name === "roomType") {
      values[index].roomType = event.target.value;
    } else if (event.target.name === "roomNumber" && event.target.value > 0) {
      values[index].roomNumber = event.target.value;
    } else if (event.target.name === "guest" && event.target.value > 0) {
      values[index].guest = event.target.value;
    }

    setBookRoomData(values);
  };

  const handleAddFields = () => {
    const values = [...bookRoomData];
    values.push({ roomType: "", roomNumber: 0, guest: 0 });
    setBookRoomData(values);
  };

  const handleRemoveFields = () => {
    const values = [...bookRoomData];
    if (values.length > 1) values.pop();
    setBookRoomData(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(bookRoomData, null, 2));
  };

  return (
    <Form>
      {bookRoomData.map((data, i) => {
        return (
          <Row className="mt-3" key={i}>
            <Col xs={4}>
              <Form.Group controlId="formRoomType">
                <Form.Label>Room Type</Form.Label>
                <Form.Control
                  as="select"
                  name="roomType"
                  value={data.roomType}
                  onChange={(event) => handleChange(i, event)}
                >
                  {/* <option value="gg" disabled>Select Room Type</option> */}
                  <option value="Room type 1">Room type 1</option>
                  <option value="Room type 2">Room type 2</option>
                  <option value="Room type 3">Room type 3</option>
                  <option value="Room type 4">Room type 4</option>
                  <option value="Room type 5">Room type 5</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="formBasicRoom">
                <Form.Label>Rooms</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Select no of room"
                  name="roomNumber"
                  value={data.roomNumber}
                  onChange={(event) => handleChange(i, event)}
                />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="formBasicGuest">
                <Form.Label>Guests</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Select no of guest"
                  name="guest"
                  value={data.guest}
                  onChange={(event) => handleChange(i, event)}
                />
              </Form.Group>
            </Col>
          </Row>
        );
      })}
      <Row>
        <Col className="pt-3 d-flex justify-content-between">
          <Button variant="warning" onClick={handleAddFields}>
            Add More
          </Button>
          <Button variant="danger" onClick={handleRemoveFields}>
            Remove
          </Button>
        </Col>
      </Row>
      <Button
        className="mt-5"
        variant="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Form>
  );
};

export default Dynamicform;

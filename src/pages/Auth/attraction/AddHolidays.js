import React, { useState, useEffect } from "react";
import { Row, Col, Button, FormGroup, Input } from "react-bootstrap";
import { Label } from "reactstrap";
import RenderField from "../../formcomponent/formfields/RenderField";
import { reduxForm, Form, Field } from "redux-form";
import axios from "axios";
import requests from "../../../utils/Requests";
import Titlebanner from "../../../globel_cmponents/title_banner";
import Swal from "sweetalert2";
const AddHolidays = (props) => {
  const { handleSubmit, pristine, reset, submitting, attId } = props;

  useEffect(() => {
    //getHolidays();
    getTktList();
    getAttList();
  }, []);

  const [tktOrAtt, settktOrAtt] = useState("");
  const [holydayList, setholydayList] = useState([]);

  const [attList, setattList] = useState([]);

  const getAttList = async () => {
    await axios
      .post(requests.getAttractionAllForList, { attractionsId: 1 })
      .then((res) => {
        const values = [...attList];
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            label: res.data[i].attName,
            value: res.data[i].attractionsId,
          });
          // console.log(values);
        }
        setattList(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [totalTickets, settotalTickets] = useState([]);
  const [ticktData, setticktData] = useState([]);
  const [selectedTktData, setselectedTktData] = useState([]);
  const getTktList = async () => {
    axios
      .post(requests.gettickettypelist, { userRolesId: 1, platformId: 1 })
      .then((response) => {
        console.log("iasbiabdxa", response.data);
        setticktData(response.data);
        const values = [...totalTickets];
        for (let i = 0; i < response.data.length; i++) {
          values.push({
            label: response.data[i].ttTicketType,
            value: response.data[i].ticketTypeId,
          });
          // console.log(values);
        }
        settotalTickets(values);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getHolidays = (id) => {
    let tempTktData;
    if (tktOrAtt == "2") {
      tempTktData = ticktData.filter((item) => item.ticketTypeId === id);

      setselectedTktData(tempTktData);

      axios
        .post(requests.getAttractionHolidayListDto, {
          attractionId: tempTktData[0].ttAttractionId,
        })
        .then((res) => {
          setholydayList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(requests.getAttractionHolidayListDto, { attractionId: id })
        .then((res) => {
          setholydayList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const HolidayCreation = (values) => {
    const submitHolidays = {
      attractionId:
        tktOrAtt == "1"
          ? values.attractionId
          : selectedTktData[0].ttAttractionId,
      startDate: values.startDate,
      endDate: values.endDate,
      ticketTypeId: tktOrAtt == "2" ? values.ticketTypeId : 0,
    };

    axios
      .post(requests.setAttractionHolidayListDto, submitHolidays)
      .then((res) => {
        Swal.fire({
          title: "success!", //'Good job!',
          text: "Created Successfully", //'You clicked the button.',
          icon: "success", //'success'
        });
        // getHolidays();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeHolydays = (id) => {
    axios
      .post(requests.removeAttractionHolidayListDto, {
        attractionHolidayId: id,
      })
      .then((res) => {
        getHolidays();
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
  return (
    <div>
      <Titlebanner title="Set Holidays" />
      <Row>
        <Col xs="3">
          {" "}
          <Label>Select One</Label>
        </Col>
        <Col xs="3">
          <FormGroup check>
            <Label check>
              <input
                type="radio"
                name="tktOrAtt"
                value="1"
                onChange={(e) => settktOrAtt(e.target.value)}
              />{" "}
              Set For Attraction
            </Label>
          </FormGroup>
        </Col>
        <Col xs="3">
          <FormGroup check>
            <Label check>
              <input
                type="radio"
                name="tktOrAtt"
                value="2"
                onChange={(e) => settktOrAtt(e.target.value)}
              />{" "}
              Set For Ticket
            </Label>
          </FormGroup>
        </Col>
        <Col xs="3"></Col>
      </Row>

      {tktOrAtt != "" && (
        <Row>
          {tktOrAtt == "1" && (
            <Field
              name="attractionId"
              label="Select Attraction"
              component={RenderField.RenderSelectField}
              options={attList}
              onChange={(e) => getHolidays(e)}
            />
          )}
          {tktOrAtt == "2" && (
            <Field
              name="ticketTypeId"
              label="Select Ticket"
              component={RenderField.RenderSelectField}
              options={totalTickets}
              onChange={(e) => getHolidays(e)}
            />
          )}
          <Col xs={3}>
            <Label>Set Holiydays</Label>
          </Col>
          <Col xs={3}>
            <Field
              name="startDate"
              type="date"
              component={RenderField.RenderTextField}
              label="Start Date"
            />
          </Col>
          <Col xs={3}>
            <Field
              name="endDate"
              type="date"
              component={RenderField.RenderTextField}
              label="End Date"
            />
          </Col>
          <Col xs={3}>
            <br />
            <Button
              color="primary"
              disabled={submitting}
              onClick={handleSubmit((values) =>
                HolidayCreation({
                  ...values,
                })
              )}
            >
              Save
            </Button>{" "}
          </Col>
        </Row>
      )}

      <Row xs={4}>
        {holydayList &&
          holydayList.map((item) => (
            <Col key={item.attractionHolidayId}>
              <Label>From</Label>
              {item.startDate} <Label>To</Label>
              {item.endDate}
              <button
                type="button"
                onClick={() => removeHolydays(item.attractionHolidayId)}
              >
                X
              </button>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default reduxForm({
  form: "AddHolidays",
  //onSubmitSuccess: afterSubmit,
})(AddHolidays);

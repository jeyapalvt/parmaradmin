import { Field } from "redux-form";
import RenderField from "./RenderField";
import { useState, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import axios from "axios";
import requests from "../../../utils/Requests";
const ComboFieldArray = ({
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
  const [attList, setattList] = useState([{ name: "select", value: 0 }]);

  const [tkttypeTemp, settkttypeTemp] = useState({
    tktlist0: [{}],
    tktlist1: [{}],
    tktlist2: [{}],
    tktlist3: [{}],
    tktlist4: [{}],
    tktlist5: [{}],
  });
  const getTciketForAttraction = (attId, tktValue) => {
    console.log(attId);
    console.log(tktValue);
    console.log(tktValue.slice(16, 17));
    let temptktName = tktValue.slice(16, 17);

    let tktlist = "tktlist";

    console.log("tktlist", tktlist + [temptktName]);

    // if(tktValue.slice(16, 17) == 1){
    //     console.log("11111111111111111111111111111111")
    // }
    axios
      .post(requests.getTicketTypeListByAttraction, { ttAttractionId: attId })
      .then((res) => {
        //   const values = [...tkttypeTemp];
        //   values.length = 0;
        const values = [];
        values.push({
          name: "Select Ticket Type",
          value: "",
        });

        for (let i = 0; i < res.data.length; i++) {
          values.push({
            name: res.data[i].ttTicketType,
            value: res.data[i].ticketTypeId,
          });

          console.log(values);
        }

        settkttypeTemp((...prevState) => ({
          ...prevState,
          [tktlist]: values,
        }));

        //   settkttypeTemp((prevState)=>({
        //     ...prevState,
        //     [j]:values

        //   }));
      })
      .catch((err) => {});
  };
  const [attractionList, setattractionList] = useState([]);
  const getallAttraction = () => {
    axios
      .post(requests.getAttractionListForUpdate, {
        attractionId: 1,
      })
      .then((res) => {
        let values = [...attractionList];
        values.push({
          name: "All",
          value: 0,
        });
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            name: res.data[i].attName,
            value: res.data[i].attractionsId,
          });
        }
        setattractionList(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("useeffect");
    getallAttraction();
  }, []);

  return (
    <ul>
      <li>
        <Col xs={3}>
          <Field
            name="totalPack"
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
            Add Attraction
          </Button>{" "}
        </Col>
      </li>
      {fields.map((member, index) => (
        <li key={index}>
          <Row>
            <Col xs={2}>
              {" "}
              <br />
              <h4>Pack #{index + 1}</h4>
            </Col>
            <Col xs={3}>
              {" "}
              <Field
                name={`${member}.attractionId`}
                type="select"
                customfeild={attractionList}
                component={RenderField.renderOptionField}
                label="Select Attraction"
                onChange={(e) => getTciketForAttraction(e.target.value, member)}
              />
            </Col>

            <Col xs={3}>
              {" "}
              {/* 
              {console.log("ssssssssssssss",tkttypeTemp.tktlist+`${index}`}
{console.log("Submit Data", `${JSON.stringify(tkttypeTemp.tktlist+`${index}`, null, 2)}`)}
            {  console.log("111111111111111tktlist"+`${index}`)} */}
              {/* <Field
                name={`${member}.ticketTypeId`}
                type="select"
                customfeild={tkttypeTemp.tktlist+`${index}`}
              
                component={RenderField.renderOptionField}
                label="Select Ticket"
              /> */}
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

export default ComboFieldArray;

import Titlebanner from "../../../globel_cmponents/title_banner";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import requests from "../../../utils/Requests";
// class AdminRoleProLinks extends React.Component  {
//   state = {
//     selected: [options[0]],
// };

// onChange = (selected) => {
//     console.log(selected);
//     this.setState({ selected });
// };

//   render() {

//   const { selected } = this.state;

const AdminRoleProLinks = () => {
  const [selectedvalue, setselectedvalue] = useState();

  const handleChange = (selected) => {
    setselectedvalue(selected);
   
  };
  const options = [
    { value: "one", label: "Option One" },
    { value: "two", label: "Option Two" },
  ];
  
  useEffect(() => {
    apiCall();
  }, []);
  let userDetail;
  const [agency, setagency] = useState([{ name: "", value: "" }]);
  const [Userlist, setUserlist] = useState([]);
  let attraction = { attractionsId: 1 };
  const apiCall = () => {
    //  console.log("grid is ready");

    axios
      .post(requests.getuserlist, attraction)
      .then((res) => {
        userDetail =res.data;
        const values = [...agency];
        for (let i = 0; i < res.data.length; i++) {
          // console.log(res.data[i].attName);
          // console.log(res.data[i].attractionsId);
          values.push({
            name: res.data[i].userRolesName,
            value: res.data[i].userRolesId,
          });
       
        }
        setagency(values);
       
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Titlebanner title="Role Program Link" />
      <Row>
        <Col>
          <FormGroup>
            <Label for="exampleSelect">Select</Label>
            <Input type="select" name="select" id="exampleSelect">
              {agency.map((agencylist, i) => (
                <option>{agencylist.name}</option>
              ))}
            </Input>
          </FormGroup>
        </Col>

        <Col>
          {" "}
          <DualListBox
            options={options}
            selected={selectedvalue}
            simpleValue={false}
            onChange={handleChange}
            canFilter
          />
        </Col>
      </Row>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
      &nbsp; &nbsp; &nbsp;
      <button type="submit" className="btn btn-primary" data-dismiss="modal">
        Cancel
      </button>
    </>
  );
};
export default AdminRoleProLinks;

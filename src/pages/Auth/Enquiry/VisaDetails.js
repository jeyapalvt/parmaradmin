import React, { useEffect, useState } from "react";
import Titlebanner from "../../../globel_cmponents/title_banner";
import { useParams } from "react-router-dom";
import requests from "../../../utils/Requests";
import axios from "axios";
import { Row, Col, Label } from "reactstrap";

const VisaDetails = () => {
  let { id } = useParams();
  useEffect(() => {
    getVisa();
  }, []);

  const [visaData, setvisaData] = useState([""]);
  const getVisa = () => {
    axios
      .post(requests.getVisaEnquiryList, { enquiryId: 1 })
      .then((response) => {
        const tempData = response.data;
        const filterData = tempData.filter((item) => item.visaEnquiryId == id);
        setvisaData(filterData);
        // console.log("sodghsd1121231264213614  86134 61 sdiudshi", filterData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let dob, passportIssueDate, passportExpiryDate;
  if (visaData != "") {
    dob = visaData[0].dateOfBirth.slice(0, 10);
    passportIssueDate = visaData[0].passportIssueDate.slice(0, 10);
    passportExpiryDate = visaData[0].passportExpiryDate.slice(0, 10);
  }
  return (
    <>
      <Titlebanner title="Visa Enquiry Detail" />
      <Row>
        <Col>
          <Row>
            <Col>
              <Label>First Name</Label>
            </Col>
            <Col>
              <p>{visaData && visaData[0].firstName}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Middle Name</Label>
            </Col>
            <Col>
              <p>{visaData && visaData[0].middleName}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Last Name</Label>
            </Col>
            <Col>
              <p>{visaData && visaData[0].lastName}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Birth Date</Label>
            </Col>
            <Col>
              <p>{dob}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Gender</Label>
            </Col>
            <Col>
              <p>{visaData && visaData[0].gender}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Birth City</Label>
            </Col>
            <Col>
              <p>{visaData && visaData[0].birthCity}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Birth Country</Label>
            </Col>
            <Col>
              <p>{visaData && visaData[0].birthCountry}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Nationality</Label>
            </Col>
            <Col>
              <p>{visaData && visaData[0].nationality}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Contact</Label>
            </Col>
            <Col>
              <p>{visaData && visaData[0].phoneNumber}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Contact 2</Label>
            </Col>
            <Col>
              <p>{visaData && visaData[0].alternateNumber}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Email</Label>
            </Col>
            <Col>
              <p>{visaData && visaData[0].eMail}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Passport Number</Label>
            </Col>
            <Col>
              <p>{visaData && visaData[0].passportNumber}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Passport Issue Country</Label>
            </Col>
            <Col>
              <p>{visaData && visaData[0].passportCountry}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Passport Issue Date</Label>
            </Col>
            <Col>
              <p>{visaData && passportIssueDate}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Passport Expiry Date</Label>
            </Col>
            <Col>
              <p>{visaData && passportExpiryDate}</p>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Label>Passport Image Front</Label>
            {visaData && (
              <img
                src={
                  "https://parmartours.com:8443/filestorage/parmartour/images/" +
                  visaData[0].visaPassportFrontImage
                }
                width="100px"
                height="250px"
                alt="placeholder grey 100px"
              />
            )}
          </Row>
          <Row>
            <Label>Passport Image Back</Label>
            {visaData && (
              <img
                src={
                  "https://parmartours.com:8443/filestorage/parmartour/images/" +
                  visaData[0].visaPassportBackImage
                }
                width="100px"
                height="250px"
                alt="placeholder grey 100px"
              />
            )}
          </Row>
          <Row>
            <Label>Applicant Image </Label>
            {visaData && (
              <img
                src={
                  "https://parmartours.com:8443/filestorage/parmartour/images/" +
                  visaData[0].visaPhoto
                }
                width="100px"
                height="250px"
                alt="placeholder grey 100px"
              />
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default VisaDetails;

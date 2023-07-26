import React, { useState, useEffect } from "react";
import requests from "../../../../utils/Requests";
import axios from "axios";
import { Field, reduxForm, reset } from "redux-form";
import { Form, Button, Row, Col } from "reactstrap";
import RenderField from "../../../formcomponent/formfields/RenderField";
import Swal from "sweetalert2";
const ConnectToApi = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  useEffect(() => {
    getallparkgroup();
  }, []);
  const [parkGroup, setparkGroup] = useState([
    {
      name: "Select Group",
      value: "",
    },
  ]);
  const [attractionList, setattractionList] = useState([
    { name: "", value: "" },
  ]);

  const getallparkgroup = async () => {
    await axios
      .post(requests.getallparkgroup, { attractionsId: 1 })
      .then((res) => {
        const values = [...parkGroup];
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            name: res.data[i].grpName,
            value: res.data[i].attractionGroupId,
          });
        }
        setparkGroup(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //getAttractionListForUpdate

  const [updateAttraction, setupdateAttraction] = useState([]);
  const getattractionbygroup = async (groupId) => {
    await axios
      .post(requests.getAttractionListForUpdate, { attractionId: 1 })
      .then((res) => {
        setupdateAttraction(res.data);
        let attObj = res.data;
        const attFilter = attObj.filter(
          (tempAttObj) => tempAttObj.attGroup == groupId
        );

        const values = [...attractionList];
        values.length = 0;
        values.push({
          name: "Select Attraction",
          value: "",
        });
        for (let i = 0; i < attFilter.length; i++) {
          values.push({
            name: attFilter[i].attName,
            value: attFilter[i].attractionsId,
          });
        }
        setattractionList(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const connettoapi = [
    {
      name: "Select ",
      value: "",
    },
    {
      name: "Connect With Api",
      value: true,
    },
    {
      name: "Local Inventory",
      value: false,
    },
    // {
    //   name: "Both",
    //   value: "",
    // },
  ];
  const [submitObj, setsubmitObj] = useState([]);
  const filteratt = (attid) => {
    const finalObject = updateAttraction.filter(
      (attObj) => attObj.attractionsId == attid
    );

    setsubmitObj(finalObject);
  };
  const connectwithapi = (values, dispatch) => {
    //     attractionsId: "",
    // attName: "",
    // attDescription: "",
    // adultPrice: 0​
    // agencyId: 0
    // agencyUserId: 0
    // attAddress: null
    // attBannerImage: null,
    // attCity: "ABU-DHABI"
    // attCodeFormat: "1"
    // attConnectWithApi: false
    // attCountryCode: "UAE"
    // attDefaultPrice: 0
    // attDescription: ""
    // attEntryTime: null
    // attGroup: 9
    // attLogo: null
    // attName: "WARNER BROS WITH MEAL"
    // attOffersAndDiscount: true
    // attSitePhoto: null
    // attTermsAndCondition: "NILL"
    // attThumbnailImage: null
    // attTicketFormat: null
    // attTopAttractions: true
    // attTopDestination: false
    // attUpComingTours: false
    // attractionsId: 19
    // attstatus: null
    // b2bAdultBookFeePercent: 0
    // b2bAdultDisPrice: 0
    // b2bAdultPrice: 0
    // b2bChildBookFeePercent: 0
    // b2bChildDisPrice: 0
    // b2bChildPrice: 0
    // b2cAdultBookFeePercent: 0
    // b2cAdultPrice: 0
    // b2cChildBookFeePercent: 0
    // b2cChildPrice: 0
    // childPrice: 0
    // errorCode: 0
    // errorMessage: null
    // filesStorage: Array []
    // markupDiscountId: 0
    // price: 0
    // statusActive: false
    // ticketId: 0
    // ticketTypeId: 0  console.log(values);

    const submitData = {
      attractionsId: submitObj[0].attractionsId,
      attName: submitObj[0].attName,
      attCountryCode: submitObj[0].attCountryCode,
      attCity: submitObj[0].attCity,
      attrAddress: submitObj[0].attrAddress,
      attConnectWithApi: values.attConnectWithApi,
      attGroup: submitObj[0].attGroup,
      statusActive: submitObj[0].statusActive,
      attCodeFormat: submitObj[0].attCodeFormat,
      attDefaultPrice: submitObj[0].attDefaultPrice,
      adultPrice: submitObj[0].adultPrice,
      childPrice: submitObj[0].childPrice,
      attTicketFormat: submitObj[0].attTicketFormat,
      attTopAttractions: submitObj[0].attTopAttractions,
      attTopDestination: submitObj[0].attTopDestination,
      attOffersAndDiscount: submitObj[0].attOffersAndDiscount,
      attUpComingTours: submitObj[0].attUpComingTours,
      attDescription: submitObj[0].attDescription,
      attTermsAndCondition: submitObj[0].attTermsAndCondition,
      attThumbnailImage: submitObj[0].attThumbnailImage,
      attBannerImage: submitObj[0].attBannerImage,
      attLogo: submitObj[0].attLogo,
      attSitePhoto: submitObj[0].attSitePhoto,
      b2bAdultBookFeePercent: values.b2bAdultBookFeePercent,
      b2bChildBookFeePercent: values.b2bChildBookFeePercent,
      b2cAdultBookFeePercent: values.b2cAdultBookFeePercent,
      b2cChildBookFeePercent: values.b2cChildBookFeePercent,
      // filesStorage: JSON.stringify(attImageList).replace("\\", "")
      filesStorage: submitObj[0].filesStorage,
      platformId: 1,
    };

    axios
      .post(requests.updateattraction, submitData)
      .then((response) => {
        Swal.fire({
          title: "Success", //'Good job!',
          text: "Attraction Maked connect with API successfully", //'You clicked the button.',
          icon: "success", //'success'
        });
        dispatch(reset());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Form onSubmit={handleSubmit(connectwithapi.bind(this))}>
        <Field
          name="attGroup"
          type="select"
          customfeild={parkGroup}
          component={RenderField.renderOptionField}
          onChange={(e) => getattractionbygroup(e.target.value)}
          label="Select Attraction Group "
        />

        <Field
          name="attractionId"
          type="select"
          customfeild={attractionList}
          component={RenderField.renderOptionField}
          label="Select Attraction "
          onChange={(e) => filteratt(e.target.value)}
        />

        <Field
          name="attConnectWithApi"
          type="select"
          customfeild={connettoapi}
          component={RenderField.renderOptionField}
          label="Ticket Operation"
        />

        <Row>
          <Col sm={6}>
            <Field
              name="b2bAdultBookFeePercent"
              type="text"
              label="B2b Adult Book FeePercent"
              component={RenderField.RenderTextField}
            />
          </Col>
          <Col sm={6}>
            <Field
              name="b2bChildBookFeePercent"
              type="text"
              label="B2b Child Book FeePercent"
              component={RenderField.RenderTextField}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Field
              name="b2cAdultBookFeePercent"
              type="text"
              label="B2c Adult Book FeePercent"
              component={RenderField.RenderTextField}
            />
          </Col>
          <Col sm={6}>
            <Field
              name="b2cChildBookFeePercent"
              type="text"
              label="B2c Child Book FeePercent"
              component={RenderField.RenderTextField}
            />
          </Col>
        </Row>

        <div className="float-right">
          <Button color="primary" disabled={submitting}>
            Save
          </Button>{" "}
          &nbsp; &nbsp;&nbsp;
          <Button
            color="danger"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Cancel
          </Button>{" "}
        </div>
      </Form>
    </>
  );
};
export default reduxForm({
  form: "ConnectToApi",
})(ConnectToApi);

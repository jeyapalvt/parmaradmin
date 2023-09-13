import React, { useState, useEffect } from "react";
import Titlebanner from "../../../globel_cmponents/title_banner";
import { Card, CardBody, Col, Row, Button, Label } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import RenderField from "../../formcomponent/formfields/RenderField";
import axios from "axios";
import requests from "../../../utils/Requests";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import DropZoneSingleRender from "../../formcomponent/formfields/dropzonSingle/DropZoneSingleRender";
const CreateHotel = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const history = useHistory();
  const [aminitiesList, setaminitiesList] = useState([]);
  const [thumbnailImage, setthumbnailImage] = useState();
  const [bannerImage, setbannerImage] = useState();
  const { id } = useParams();
  useEffect(() => {
    getAllAminities();

    console.log(id);
    if (id !== "null") {
      getHoteldetails();
    }
  }, [id]);

  const getAllAminities = () => {
    axios
      .post(requests.getAmenitiesList, { amenitiesId: 1 })
      .then((res) => {
        setaminitiesList(res.data);
        console.log("aminities", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [hotelDetail, sethotelDetail] = useState([]);

  const getHoteldetails = () => {
    axios
      .post(requests.getHotelList, { hotelId: 1 })
      .then((res) => {
        const tempVal = res.data;
        const tempHotel = tempVal.filter((item) => item.hotelId == id);
        console.log("temp", tempHotel);
        initializeData(tempHotel);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const initializeData = (tempHotel) => {
    const timeStart = tempHotel[0].checkinTime;
    const startTime = timeStart.split(":");
    const timeEnd = tempHotel[0].checkoutTime;
    const endTime = timeEnd.split(":");
    console.log("startTime[0]", startTime[0]);

    setthumbnailImage(tempHotel[0].thumbnailImage);
    setbannerImage(tempHotel[0].bannerImage);
    props.initialize({
      hotelId: tempHotel[0].hotelId,
      hotelName: tempHotel[0].hotelName,
      hotelCity: tempHotel[0].hotelCity,
      hotelAddress: tempHotel[0].hotelAddress,
      propertyType: tempHotel[0].propertyType,
      supplier: tempHotel[0].supplier,
      catogery: tempHotel[0].catogery,
      paymentOptions: tempHotel[0].paymentOptions,
      policyAndTerms: tempHotel[0].policyAndTerms,
      hotelWebsite: tempHotel[0].hotelWebsite,
      eMailId: tempHotel[0].eMailId,
      contactName: tempHotel[0].contactName,
      contactNumber: tempHotel[0].contactNumber,
      statusActive: tempHotel[0].statusActive,
      startingPrice: tempHotel[0].startingPrice,
      checkinTime: null,
      checkoutTime: null,
      amenitiesList: tempHotel[0].amenitiesId,
      thumbnailImage: tempHotel[0].thumbnailImage,
      bannerImage: tempHotel[0].bannerImage,
      ciHour: startTime[0],
      ciMinute: startTime[1],
      ciAmPm: startTime[2],
      coHour: endTime[0],
      coMinute: endTime[1],
      coAmPm: endTime[2],
    });
  };
  const hour = [
    { name: "", value: "" },
    { name: "01", value: "01" },
    { name: "02", value: "02" },
    { name: "03", value: "03" },
    { name: "04", value: "04" },
    { name: "05", value: "05" },
    { name: "06", value: "06" },
    { name: "07", value: "07" },
    { name: "08", value: "08" },
    { name: "09", value: "09" },
    { name: "10", value: "10" },
    { name: "11", value: "11" },
    { name: "12", value: "12" },
  ];
  const minute = [
    { name: "", value: "" },
    { name: "00", value: "00" },
    { name: "05", value: "05" },
    { name: "10", value: "10" },
    { name: "15", value: "15" },
    { name: "20", value: "20" },
    { name: "25", value: "25" },
    { name: "30", value: "30" },
    { name: "35", value: "35" },
    { name: "40", value: "40" },
    { name: "45", value: "45" },
    { name: "50", value: "50" },
    { name: "55", value: "55" },
  ];
  const amOrpm = [
    { name: "", value: "" },
    { name: "AM", value: "AM" },
    { name: "PM", value: "PM" },
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (itemId) => {
    console.log("aixbauvxiavcxiavcs", itemId);
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };
  const postToApi = (values) => {
    console.log("values", values);
    let updatedList = aminitiesList;
    updatedList = updatedList.filter((item) =>
      selectedItems.includes(item.amenitiesId)
    );

    console.log("22222");
    const checkinTime =
      values.ciHour + ":" + values.ciMinute + ":" + values.ciAmPm;
    console.log("33333", checkinTime);
    const checkoutTime =
      values.coHour + ":" + values.coMinute + ":" + values.coAmPm;
    console.log("444444", checkoutTime);
    const submitObject = {
      hotelName: values.hotelName,
      hotelCity: values.hotelCity,
      hotelAddress: values.hotelAddress,
      propertyType: values.propertyType,
      supplier: values.supplier,
      catogery: values.catogery,
      paymentOptions: values.paymentOptions,
      policyAndTerms: values.policyAndTerms,
      hotelWebsite: values.hotelWebsite,
      eMailId: values.eMailId,
      contactName: values.contactName,
      contactNumber: values.contactNumber,
      statusActive: values.statusActive,
      checkinTime: checkinTime,
      checkoutTime: checkoutTime,
      amenitiesList: updatedList,
      thumbnailImage: values.thumbnailImage,
      bannerImage: values.bannerImage,
      startingPrice: values.startingPrice,
    };

    console.log("submitObject", submitObject);
    axios
      .post(requests.createHotel, submitObject)
      .then((res) => {
        if (res.data.errCode === 200) {
          Swal.fire("success", "Hotel Added", "success");
          history.push("/hotel/list-hotel");
        }

        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Titlebanner title="Create Hotel" />
      <Card>
        <CardBody>
          <Row>
            <Col>
              <Field
                name="hotelName"
                label="Name"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Field
                name="hotelCity"
                label="City"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Field
                name="hotelAddress"
                label="Address"
                component={RenderField.RenderTextField}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Field
                name="propertyType"
                label="Property Type"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Field
                name="supplier"
                label="Supplier"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Field
                name="catogery"
                label="Catogery"
                component={RenderField.RenderTextField}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Field
                name="paymentOptions"
                label="Payment Options"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Field
                name="statusActive"
                label="Active Status"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Field
                name="startingPrice"
                label="Starting Price"
                component={RenderField.RenderTextField}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  {" "}
                  <Field
                    label="Check In(Hour) "
                    name="ciHour"
                    component={RenderField.renderOptionField}
                    customfeild={hour}
                  />
                </Col>
                <Col>
                  {" "}
                  <Field
                    label="Check In(Minute)"
                    name="ciMinute"
                    component={RenderField.renderOptionField}
                    customfeild={minute}
                  />
                </Col>
                <Col>
                  {" "}
                  <Field
                    label="AM/PM"
                    name="ciAmPm"
                    component={RenderField.renderOptionField}
                    customfeild={amOrpm}
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  {" "}
                  <Field
                    label="Check Out(Hour) "
                    name="coHour"
                    component={RenderField.renderOptionField}
                    customfeild={hour}
                  />
                </Col>
                <Col>
                  {" "}
                  <Field
                    label="Check Out(Minute)"
                    name="coMinute"
                    component={RenderField.renderOptionField}
                    customfeild={minute}
                  />
                </Col>
                <Col>
                  {" "}
                  <Field
                    label="AM/PM"
                    name="coAmPm"
                    component={RenderField.renderOptionField}
                    customfeild={amOrpm}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Field
                name="hotelWebsite"
                label="Web Site"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Field
                name="eMailId"
                label="Email"
                component={RenderField.RenderTextField}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Field
                name="contactName"
                label="Contact Person Name"
                component={RenderField.RenderTextField}
              />
            </Col>
            <Col>
              <Field
                name="contactNumber"
                label="Contact Person Number"
                component={RenderField.RenderTextField}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {thumbnailImage != null ? (
                <img
                  src={
                    "https://parmartours.com:8443/filestorage/parmartour/images/" +
                    thumbnailImage
                  }
                  width="100px"
                  height="100px"
                  alt="placeholder grey 100px"
                />
              ) : null}
              <br />
              <Label> Thumbnail Image </Label>
              <Field
                // key="field"
                name="thumbnailImage"
                component={DropZoneSingleRender}
              />
            </Col>
            <Col>
              {bannerImage != null ? (
                <img
                  src={
                    "https://parmartours.com:8443/filestorage/parmartour/images/" +
                    bannerImage
                  }
                  width="100px"
                  height="100px"
                  alt="placeholder grey 100px"
                />
              ) : null}
              <br />
              <Label>Banner Image(1920X350 for best Look) </Label>
              <Field
                // key="field"
                name="bannerImage"
                component={DropZoneSingleRender}
              />
            </Col>
          </Row>

          <Row>
            {aminitiesList.map((item, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.amenitiesId)}
                  onChange={() => handleCheckboxChange(item.amenitiesId)}
                />
                {item.amenitiesName}
              </Col>
            ))}
          </Row>
          <Row>
            <Col>
              <Field
                name="policyAndTerms"
                label="Terms & Conditions"
                type="textarea"
                component={RenderField.RenderTextareaField}
              />
            </Col>
          </Row>
          <div className="float-right">
            <Button
              color="primary"
              onClick={handleSubmit((values) =>
                postToApi({
                  ...values,
                  pill: 1,
                })
              )}
            >
              Save
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default reduxForm({
  form: "CreateHotel",
})(CreateHotel);

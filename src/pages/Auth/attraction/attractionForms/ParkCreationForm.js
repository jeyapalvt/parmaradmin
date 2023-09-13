import {
  Card,
  CardBody,
  Button,
  Row,
  Col,
  Form,
  Label,
  Input,
  Alert,
} from "reactstrap";

import { Field, reduxForm, reset } from "redux-form";
import "bootstrap/dist/css/bootstrap.min.css";
import RenderField from "../../../formcomponent/formfields/RenderField";
import { useState, useEffect } from "react";
import EditorField from "../../../formcomponent/editorfield/EditorField";
import RenderImageUploadField from "../../../formcomponent/formfields/RenderImageUploadField";
import axios from "axios";
import requests from "../../../../utils/Requests";
import DropZoneSingleRender from "../../../formcomponent/formfields/dropzonSingle/DropZoneSingleRender";

import EditorFieldComponent from "../../../formcomponent/editorfield/EditorFieldComponent";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import OldImg from "./OldImg";
import AddHolidays from "../AddHolidays";

const afterSubmit = (result, dispatch) => {
  dispatch(reset("ParkCreationForm"));
  //window.location.href="/success";
};

const validate = (values) => {
  const errors = {};
  if (!values.attName) {
    errors.attName = "Required";
  }
  if (!values.attCountryCode) {
    errors.attCountryCode = "Required";
  }
  if (!values.attCity) {
    errors.attCity = "Required";
  }
  // if (!values.attrAddress) {
  //   errors.attrAddress = "Required";
  // }
  if (!values.attGroup) {
    errors.attGroup = "Required";
  }
  if (!values.statusActive) {
    errors.statusActive = "Required";
  }
  if (!values.attCodeFormat) {
    errors.attCodeFormat = "Required";
  }

  if (!values.adultPrice) {
    errors.adultPrice = "Required";
  }
  if (!values.childPrice) {
    errors.childPrice = "Required";
  }
  if (!values.attTicketFormat) {
    errors.attTicketFormat = "Required";
  }
  // if (!values.attThumbnailImage) {
  //   errors.attThumbnailImage = "Required";
  // }
  // if (!values.attBannerImage) {
  //   errors.attBannerImage = "Required";
  // }
  // if (!values.attLogo) {
  //   errors.attLogo = "Required";
  // }
  // if (!values.attSitePhoto) {
  //   errors.attSitePhoto = "Required";
  // }
  // if (!values.filesStorage) {
  //   errors.filesStorage = "Required";
  // }
  if (!values.attDescription) {
    errors.attDescription = "Required";
  }
  if (!values.attTermsAndCondition) {
    errors.attTermsAndCondition = "Required";
  }
  return errors;
};
const ParkCreationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const tktFormet = [
    { value: "", name: "" },
    { value: 2, name: "Ferrari" },
    { value: 1, name: "Dubai" },
    { value: 4, name: "Expo" },
    { value: 3, name: "Others" },
    { value: 5, name: "Burj khalifa" },
  ];
  const activeStatus = [
    { value: "", name: "" },
    { value: true, name: "Active" },
    { value: false, name: "InActive" },
  ];

  const [isLoading, setLoading] = useState(true);
  const history = useHistory();
  const [req, setreq] = useState();

  useEffect(() => {
    // eslint-disable-next-line no-lone-blocks
    // window.scroll(0, 0);
    if (props.attid == "null") {
      setLoading(false);
      setreq(requests.postattraction);
    } else {
      getAttraction();
      setreq(requests.updateattraction);
    }
    getGroup();
  }, []);

  let attDetail;
  let img1, img2, img3, img4;

  const [groupList, setgroupList] = useState([{ name: "", value: "" }]);
  let attraction = { attractionsId: props.attid };
  let atId = props.attid;

  // for set and remove current images of attraction

  const [pics, setPics] = useState([]);

  const removeImage = (id, e) => {
    //e.preventdefault();

    setPics((oldState) => oldState.filter((item) => item.id !== id));

    return false;
  };

  // other current images
  const [ThumbnailImage, setThumbnailImage] = useState();
  const [BannerImage, setBannerImage] = useState();
  const [Logo, setLogo] = useState();
  const [SitePhoto, setSitePhoto] = useState();
  const [getImageList, setgetImageList] = useState(false);
  const [connectWithApi, setconnectWithApi] = useState(false);
  const [alertUser, setalertUser] = useState(false);
  let testImage;
  const getAttraction = async () => {
    await axios
      .post(requests.getAttractionListForUpdate, attraction)
      .then((res) => {
        attDetail = res.data;
        const toursfilter = attDetail.filter(
          (attdetail) => attdetail.attractionsId == atId
        );

        console.log("toursfilter", toursfilter);
        initialValues(toursfilter);
        setThumbnailImage(toursfilter[0].attThumbnailImage);
        setBannerImage(toursfilter[0].attBannerImage);
        setLogo(toursfilter[0].attLogo);
        setSitePhoto(toursfilter[0].attSitePhoto);
        setgetImageList(true);

        const tempImg = [...pics];
        for (let i = 0; i < toursfilter[0].filesStorage.length; i++) {
          tempImg.push({
            id: toursfilter[0].filesStorage[i].fileStorageId, //fileStorageId
            imgUrl: toursfilter[0].filesStorage[i].fileName,
          });
        }

        setPics(tempImg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGroup = () => {
    axios
      .post(requests.getallparkgroup, attraction)
      .then((res) => {
        const values = [...groupList];
        for (let i = 0; i < res.data.length; i++) {
          // console.log(res.data[i].attName);
          // console.log(res.data[i].attractionsId);
          values.push({
            name: res.data[i].grpName,
            value: res.data[i].attractionGroupId,
          });
        }
        setgroupList(values);

        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [b2bAdultBookFeePercent, setb2bAdultBookFeePercent] = useState();
  const [b2bChildBookFeePercent, setb2bChildBookFeePercent] = useState();
  const [b2cAdultBookFeePercent, setb2cAdultBookFeePercent] = useState();
  const [b2cChildBookFeePercent, setb2cChildBookFeePercent] = useState();

  const initialValues = (toursfilter) => {
    // eslint-disable-next-line no-lone-blocks

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
    // ticketTypeId: 0

    // private int adultPrice;
    // private int childPrice;
    // private int b2bAdultBookFeePercent;
    // private int b2bChildBookFeePercent;
    // private int b2cAdultBookFeePercent;
    // private int b2cChildBookFeePercent
    console.log("------>", toursfilter[0]);
    if (props.attid != "null") {
      props.initialize({
        attractionsId: props.attid,
        attName: toursfilter[0].attName,
        attCountryCode: toursfilter[0].attCountryCode,
        attCity: toursfilter[0].attCity,
        showOpenAndDated: toursfilter[0].showOpenAndDated,
        attCodeFormat: toursfilter[0].attCodeFormat,
        attDefaultPrice: toursfilter[0].attDefaultPrice,
        attTicketFormat: toursfilter[0].attTicketFormat,
        attrAddress: toursfilter[0].attrAddress,
        attGroup: toursfilter[0].attGroup,
        adultPrice: toursfilter[0].adultPrice,
        childPrice: toursfilter[0].childPrice,
        b2bAdultBookFeePercent: toursfilter[0].b2bAdultBookFeePercent,
        b2bChildBookFeePercent: toursfilter[0].b2bChildBookFeePercent,
        b2cAdultBookFeePercent: toursfilter[0].b2cAdultBookFeePercent,
        b2cChildBookFeePercent: toursfilter[0].b2cChildBookFeePercent,
        attlocation: toursfilter[0].attlocation,
        statusActive: toursfilter[0].statusActive,
        attTopAttractions: toursfilter[0].attTopAttractions,
        attTopDestination: toursfilter[0].attTopDestination,
        attDescription: toursfilter[0].attDescription,
        attOffersAndDiscount: toursfilter[0].attOffersAndDiscount,
        attUpComingTours: toursfilter[0].attUpComingTours,
        attTermsAndCondition: toursfilter[0].attTermsAndCondition,
        attConnectWithApi: toursfilter[0].attConnectWithApi,
        alertUser: toursfilter[0].alertUser,
        alertMessage: toursfilter[0].alertMessage,
        openTicketOption: toursfilter[0].openTicketOption,
        addrLatitude: toursfilter[0].addrLatitude,
        addrLongitude: toursfilter[0].addrLongitude,
      });
      setalertUser(toursfilter[0].alertUser);
      setconnectWithApi(toursfilter[0].attConnectWithApi);
      setb2bAdultBookFeePercent(toursfilter[0].b2bAdultBookFeePercent);
      setb2bChildBookFeePercent(toursfilter[0].b2bChildBookFeePercent);
      setb2cAdultBookFeePercent(toursfilter[0].b2cAdultBookFeePercent);
      setb2cChildBookFeePercent(toursfilter[0].b2cChildBookFeePercent);
    }

    setLoading(false);
  };

  if (isLoading) {
    return (
      <>
        {/*     
    <ul className="loadinglist">
    
    <div id="panel">
      <span id="loading1">
        <span id="outerCircle" />
        <span id="innerCircle">
          <span id="center" />
        </span>
      </span>
    </div>
 
</ul> */}
      </>
    );
  }

  const parkcretaion = (values, dispatch) => {
    //fileStorageId
    // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    // window.alert(req);
    // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);

    const attImageList = [];
    if (pics != "") {
      for (let i = 0; i < pics.length; i++) {
        attImageList.push({ fileStorageId: pics[i].id });
      }
    }
    if (values.filesStorage != "") {
      for (let i = 0; i < values.filesStorage.length; i++) {
        attImageList.push({
          fileStorageId: values.filesStorage[i].fileStorageId,
        });
      }
    }

    if (values.attThumbnailImage != null) {
      img1 = values.attThumbnailImage;
    } else {
      img1 = ThumbnailImage;
    }

    if (values.attBannerImage != null) {
      img2 = values.attBannerImage;
    } else {
      img2 = BannerImage;
    }
    if (values.attLogo != null) {
      img3 = values.attLogo;
    } else {
      img3 = Logo;
    }
    if (values.attSitePhoto != null) {
      img4 = values.attSitePhoto;
    } else {
      img4 = SitePhoto;
    }

    // console.log("Number of Files", values.filesStorage[1].fileStorageId)

    const attractionOldImage = JSON.stringify(attImageList);
    // console.log("Before Convert ", attImageList);
    // console.log(JSON.parse(attImageList));
    // console.log("After Convert ", JSON.stringify(attImageList));

    //     private int adultPrice;
    // private int childPrice;
    // private int b2bAdultBookFeePercent;
    // private int b2bChildBookFeePercent;
    // private int b2cAdultBookFeePercent;
    // private int b2cChildBookFeePercent;

    const submitData = {
      attractionsId: props.attid,
      attName: values.attName,
      attCountryCode: values.attCountryCode,
      attCity: values.attCity,
      attrAddress: values.attrAddress,
      attConnectWithApi: connectWithApi,
      showOpenAndDated: values.showOpenAndDated,
      attGroup: values.attGroup,
      statusActive: values.statusActive,
      attCodeFormat: values.attCodeFormat,
      attDefaultPrice: values.attDefaultPrice,
      adultPrice: values.adultPrice,
      childPrice: values.childPrice,
      attTicketFormat: values.attTicketFormat,
      attTopAttractions: values.attTopAttractions,
      attTopDestination: values.attTopDestination,
      attOffersAndDiscount: values.attOffersAndDiscount,
      attUpComingTours: values.attUpComingTours,
      attDescription: values.attDescription,
      attTermsAndCondition: values.attTermsAndCondition,
      openTicketOption: values.openTicketOption,
      alertUser: values.alertUser,
      alertMessage: values.alertMessage,
      attlocation: values.attlocation,
      attThumbnailImage: img1,
      attBannerImage: img2,
      attLogo: img3,
      attSitePhoto: img4,

      b2bAdultBookFeePercent: b2bAdultBookFeePercent,
      b2bChildBookFeePercent: b2bChildBookFeePercent,
      b2cAdultBookFeePercent: b2cAdultBookFeePercent,
      b2cChildBookFeePercent: b2cChildBookFeePercent,
      // filesStorage: JSON.stringify(attImageList).replace("\\", "")
      filesStorage: JSON.parse(attractionOldImage),
      platformId: 1,
      addrLatitude: values.addrLatitude,
      addrLongitude: values.addrLongitude,
    };

    // console.log(`You Values:\n\n${JSON.stringify(values, null, 2)}`);

    // console.log(`You submitData:\n\n${JSON.stringify(submitData, null, 2)}`);
    axios
      .post(req, submitData)
      .then((res) => {
        console.log(res.data);
        successAlert(
          "Success",
          "New Attraction Created Successfully",
          "success"
        );
        history.goBack();
        // dispatch(reset());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const successAlert = (t, e, i) => {
    Swal.fire({
      title: t, //'Good job!',
      text: e, //'You clicked the button.',
      icon: i, //'success'
    });
  };

  return (
    <>
      {/* <p>Test{props.attid}</p> */}
      {/* <Form onSubmit={handleSubmit(parkcretaion.bind(this))}> */}
      <Form>
        <Card>
          <CardBody>
            <Field
              name="attractionsId"
              type="hidden"
              component={RenderField.RenderTextField}
            />
            <Row form>
              <Col sm={4}>
                <Field
                  name="attName"
                  type="text"
                  component={RenderField.RenderTextField}
                  label="Attraction Name "
                />
              </Col>

              <Col sm={4}>
                <Field
                  name="attCountryCode"
                  type="text"
                  component={RenderField.RenderTextField}
                  label="Country "
                />
              </Col>
              <Col sm={4}>
                <Field
                  name="attCity"
                  type="text"
                  component={RenderField.RenderTextField}
                  label="City "
                />
              </Col>
              <br />
              <Col sm={4}>
                <Field
                  name="attrAddress"
                  type="textarea"
                  component={RenderField.RenderTextField}
                  label="Park Address"
                />
              </Col>
              <Col sm={4}>
                <Field
                  name="attGroup"
                  type="select"
                  customfeild={groupList}
                  component={RenderField.renderOptionField}
                  label="Park Group"
                />
              </Col>
              <Col sm={4}>
                <Field
                  name="statusActive"
                  type="select"
                  customfeild={activeStatus}
                  component={RenderField.renderOptionField}
                  label="Active Status"
                />
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <br />
                <label>
                  <Field
                    name="attCodeFormat"
                    component="input"
                    type="radio"
                    value="1"
                  />{" "}
                  QR CODE{" "}
                  <img
                    src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"
                    width="50px"
                    height="30px"
                  />
                </label>
              </Col>

              <Col sm={2}>
                <br />
                <label>
                  <Field
                    name="attCodeFormat"
                    component="input"
                    type="radio"
                    value="2"
                  />{" "}
                  BAR CODE{" "}
                  <img
                    src="https://www.incimages.com/uploaded_files/image/1920x1080/*Barcode_32896.jpg"
                    width="50px"
                    height="30px"
                  />
                </label>
              </Col>
              <Col sm={2}>
                <Field
                  name="adultPrice"
                  type="text"
                  component={RenderField.RenderTextField}
                  label="Adult Price"
                />
              </Col>
              <Col sm={2}>
                <Field
                  name="childPrice"
                  type="text"
                  component={RenderField.RenderTextField}
                  label="Child Price"
                />
              </Col>
              <Col sm={4}>
                <Field
                  name="attTicketFormat"
                  type="select"
                  customfeild={tktFormet}
                  component={RenderField.renderOptionField}
                  label="Ticket Formet "
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Label>Allow To Open Tickets</Label>
              <Col xs={6}>
                <Field
                  name="openTicketOption"
                  type="checkbox"
                  component={RenderField.RendercheckboxField}
                  label="For Open And Dated Ticket Allow To Book"
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Field
                  name="attlocation"
                  type="text"
                  component={RenderField.RenderTextField}
                  label="Location"
                />
              </Col>
              <Col>
                {/* <Field
                  name="addrLongitude"
                  type="text"
                  component={RenderField.RenderTextField}
                  label="Longitude"
                /> */}
              </Col>
            </Row>
            <br />
            <Row>
              <Label>Select Catogery</Label>
              <Col xs={3}>
                <Field
                  name="attTopAttractions"
                  type="checkbox"
                  component={RenderField.RendercheckboxField}
                  label="Top Attractions"
                />
              </Col>
              <Col xs={3}>
                <Field
                  name="attTopDestination"
                  type="checkbox"
                  component={RenderField.RendercheckboxField}
                  label="Top Destination"
                />
              </Col>{" "}
              <Col xs={3}>
                <Field
                  name="attOffersAndDiscount"
                  type="checkbox"
                  component={RenderField.RendercheckboxField}
                  label="Offers And Discount"
                />
              </Col>{" "}
              <Col xs={3}>
                {" "}
                <Field
                  name="attUpComingTours"
                  type="checkbox"
                  component={RenderField.RendercheckboxField}
                  label="UpComing Tours"
                />
              </Col>
            </Row>
            <br />
            <br />
            {/* {props.attid != "null" && <AddHolidays attId={props.attid} />} */}

            <br />

            <Row>
              <Col>
                {ThumbnailImage != null ? (
                  <img
                    src={
                      "https://parmartours.com:8443/filestorage/parmartour/images/" +
                      ThumbnailImage
                    }
                    width="100px"
                    height="100px"
                    alt="placeholder grey 100px"
                  />
                ) : null}
                <br />
                <Label>Attraction Thumbnail Image </Label>
                <Field
                  // key="field"
                  name="attThumbnailImage"
                  component={DropZoneSingleRender}
                />
              </Col>
              <Col>
                {BannerImage != null ? (
                  <img
                    src={
                      "https://parmartours.com:8443/filestorage/parmartour/images/" +
                      BannerImage
                    }
                    width="100px"
                    height="100px"
                    alt="placeholder grey 100px"
                  />
                ) : null}
                <br />
                <Label>Attractoion Banner Image(1920X570 for best Look) </Label>
                <Field
                  // key="field"
                  name="attBannerImage"
                  component={DropZoneSingleRender}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {Logo != null ? (
                  <img
                    src={
                      "https://parmartours.com:8443/filestorage/parmartour/images/" +
                      Logo
                    }
                    width="100px"
                    height="100px"
                    alt="placeholder grey 100px"
                  />
                ) : null}
                <br />
                <Label>Attraction Logo(For Ticket) </Label>
                <Field
                  // key="field"
                  name="attLogo"
                  component={DropZoneSingleRender}
                />
              </Col>
              <Col>
                {SitePhoto != null ? (
                  <img
                    src={
                      "https://parmartours.com:8443/filestorage/parmartour/images/" +
                      SitePhoto
                    }
                    width="100px"
                    height="100px"
                    alt="placeholder grey 100px"
                  />
                ) : null}
                <br />
                <Label>Attraction Main Image (For Ticket)</Label>
                <Field
                  // key="field"
                  name="attSitePhoto"
                  component={DropZoneSingleRender}
                />
              </Col>
            </Row>

            <OldImg currentImage={pics} removeImage={removeImage} />

            <Label>Attraction Gallary Images </Label>
            <Field
              // key="field"
              name="filesStorage"
              component={RenderImageUploadField}
            />
            <br />
            <Label>Attraction Description</Label>
            <EditorField
              key="field"
              name="attDescription"
              id="inputEditorText"
              disabled={false}
              component={EditorFieldComponent}
              placeholder="Type here"
            />
            <br />
            <Field
              name="attTermsAndCondition"
              type="textarea"
              component={RenderField.RenderTextareaField}
              label="Terms And Conditions"
            />

            <Row>
              <Col xs={6}>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Label
                    for="exampleSelect"
                    style={{
                      marginRight: "30px",
                      marginTop: "20px",
                    }}
                  >
                    Alert User Message
                  </Label>

                  <Field
                    name="alertUser"
                    id="alertUser"
                    type="checkbox"
                    component={RenderField.RenderTextField}
                    onChange={() => setalertUser(!alertUser)}
                  />
                </div>
              </Col>
            </Row>
            <br />
            {alertUser === true && (
              <Row>
                <Label>Alert Message</Label>
                <EditorField
                  key="field"
                  name="alertMessage"
                  id="inputEditorText"
                  disabled={false}
                  component={EditorFieldComponent}
                  placeholder="Type here"
                />
              </Row>
            )}

            <br />
            {/* {parkGroup.map((pklist, i) => (
              <div key={i}>
               
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <Field
                  name={pklist.name}
                  type="checkbox"
                  component={RenderField.RendercheckboxField}
                  label={pklist.value}
                />
                    </span>
                  </div>
              
                  <Field
               name={`${pklist.name}.price`}
              type="text"
              component={RenderField.inputWithCheckBoxField}
            
            />
                </div>
              </div>
            ))} */}

            <br />
            <br />
            <br />
            <div className="float-right">
              <Button
                color="primary"
                disabled={submitting}
                onClick={handleSubmit((values) =>
                  parkcretaion({
                    ...values,
                  })
                )}
              >
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
          </CardBody>
        </Card>
      </Form>
    </>
  );
};

export default reduxForm({
  form: "ParkCreationForm",
  validate,
  //onSubmitSuccess: afterSubmit,
})(ParkCreationForm);

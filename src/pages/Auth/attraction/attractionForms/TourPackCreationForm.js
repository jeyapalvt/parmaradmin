import {
  Card,
  CardBody,
  Button,
  Row,
  Col,
  Form,
  Label,
  Input,
} from "reactstrap";

import { Field, reduxForm, FieldArray, clearSubmitErrors } from "redux-form";
import "bootstrap/dist/css/bootstrap.min.css";
import RenderField from "../../../formcomponent/formfields/RenderField";
import { useState, useEffect } from "react";
import EditorField from "../../../formcomponent/editorfield/EditorField";
import RenderImageUploadField from "../../../formcomponent/formfields/RenderImageUploadField";
import TourpackArrayField from "../../../formcomponent/formfields/TourpackArrayField";
import DropZoneSingleRender from "../../../formcomponent/formfields/dropzonSingle/DropZoneSingleRender";
import requests from "../../../../utils/Requests";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
const validate = (values) => {
  const errors = {};
  if (!values.tourName) {
    errors.tourName = "Required";
  }
  if (!values.tourCountryCode) {
    errors.tourCountryCode = "Required";
  }
  if (!values.tourCity) {
    errors.tourCity = "Required";
  }
  if (!values.attGroup) {
    errors.attGroup = "Required";
  }
  if (!values.attrStatus) {
    errors.attrStatus = "Required";
  }
  if (!values.tourTicketFormat) {
    errors.tourTicketFormat = "Required";
  }
  if (!values.tourPrice) {
    errors.tourPrice = "Required";
  }
  if (!values.tourDescription) {
    errors.tourDescription = "Required";
  }
  return errors;
};
const TourPackCreationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const history = useHistory();
  const [parkGroup, setparkGroup] = useState([]);

  const aciveStatus = [
    { value: "", name: "" },
    { value: true, name: "Active" },
    { value: false, name: "InActive" },
  ];
  const codeformet = [
    { value: "", name: "" },
    { value: 1, name: "QR Code" },
    { value: 2, name: "Bar Code" },
  ];

  const FILE_FIELD_NAME = "files";
  useEffect(() => {}, []);

  const imgfield = null;

  const [Loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    {
      id == "null" ? setLoading(false) : getAttraction();
    }
    getTourGroup();
  }, []);
  let attDetail;

  let attraction = { tourPackageId: id };

  const getTourGroup = () => {
    axios
      .post(requests.getTourCategoryList, { userListId: 0 })
      .then((res) => {
        let tempVal = [...parkGroup];
        tempVal.push({
          name: " Select Group",
          value: "",
        });
        for (let i = 0; i < res.data.length; i++) {
          //tourCategoryId, categoryName
          tempVal.push({
            name: res.data[i].categoryName,
            value: res.data[i].tourCategoryId,
          });
        }
        setparkGroup(tempVal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAttraction = async () => {
    await axios
      .post(requests.getTourPackageSingle, attraction)
      .then((res) => {
        attDetail = res.data;
        initialValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const initialValues = (tourPack) => {
    // eslint-disable-next-line no-lone-blocks
    // {
    //   id
    //     ? props.initialize({
    //         tourPackageId: props.tourPackageId,
    //         tourName: attDetail.tourName,
    //       })
    //     : props.initialize({});
    // }

    props.initialize({
      tourPackageId: tourPack.tourPackageId,
      tourName: tourPack.tourName,
      tourCountryCode: tourPack.tourCountryCode,
      tourCity: tourPack.tourCity,
      tourGroup: tourPack.tourGroup,
      tourStatus: tourPack.tourStatus,
      tourTicketFormat: tourPack.tourTicketFormat,
      tourPrice: tourPack.tourPrice,
      tourTermsAndCondition: tourPack.tourTermsAndCondition,
      tourLogo: tourPack.tourLogo,
      tourThumbnailImage: tourPack.tourThumbnailImage,
      tourBannerImage: tourPack.tourBannerImage,
      tourSitePhoto: tourPack.tourSitePhoto,
      tourDescription: tourPack.tourDescription,
      packageDetail: tourPack.packageDetail,
    });
    setLoading(false);
  };

  //   axios
  //   .post(requests.posttourpackage, values)
  //   .then((res) => {
  //     console.log(res.data);
  //     window.alert(`Successfully Created`);
  //     dispatch(props.reset());
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     window.alert(`Error`);
  //   });
  // }
  const tourPackCreation = (values) => {
    const tourPackData = {
      tourPackageId: "",
      tourName: values.tourName,
      tourCountryCode: values.tourCountryCode,
      tourCity: values.tourCity,
      tourGroup: values.tourGroup,
      tourStatus: values.tourStatus,
      tourTicketFormat: values.tourTicketFormat,
      tourPrice: values.tourPrice,
      tourTermsAndCondition: values.tourTermsAndCondition,
      tourLogo: values.tourLogo,
      tourThumbnailImage: values.tourThumbnailImage,
      tourBannerImage: values.tourBannerImage,
      tourSitePhoto: values.tourSitePhoto,
      tourDescription: values.tourDescription,
      packageDetail: values.packageDetail,
    };

    const submitData = {
      ...values,
      platformId: 1,
    };

    // console.log(`You submitted:\n\n${JSON.stringify(submitData, null, 2)}`);
    axios
      .post(requests.posttourpackage, submitData)
      .then((res) => {
        // console.log("res", res.data);

        Swal.fire({
          title: "success!", //'Good job!',
          text: "Created Successfully", //'You clicked the button.',
          icon: "success", //'success'
        });
        history.push("/attraction/tour-pack-list");
      })
      .catch((err) => {
        console.log(err);
        // window.alert(`Error`);
      });
  };
  return (
    <>
      <Form onSubmit={handleSubmit(tourPackCreation.bind(this))}>
        <Card>
          <CardBody>
            <Field
              name="tourPackageId"
              type="hidden"
              component={RenderField.RenderTextField}
            />
            <Row>
              <Col xs={4}>
                <Field
                  name="tourName"
                  type="text"
                  component={RenderField.RenderTextField}
                  label="Tour Name "
                />
              </Col>
              <Col xs={4}>
                <Field
                  name="tourCountryCode"
                  type="text"
                  // customfeild={countryList}
                  component={RenderField.RenderTextField}
                  label="Country "
                />
              </Col>
              <Col xs={4}>
                <Field
                  name="tourCity"
                  type="text"
                  // customfeild={cityList}
                  component={RenderField.RenderTextField}
                  label="City "
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <Field
                  name="tourGroup"
                  type="select"
                  customfeild={parkGroup}
                  component={RenderField.renderOptionField}
                  label="Tour Group"
                />
              </Col>
              <Col xs={4}>
                <Field
                  name="tourStatus"
                  type="select"
                  customfeild={aciveStatus}
                  component={RenderField.renderOptionField}
                  label="Active Status"
                />
              </Col>
              <Col xs={4}>
                <Field
                  name="tourTicketFormat"
                  type="select"
                  customfeild={codeformet}
                  component={RenderField.renderOptionField}
                  label="Code Format"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <Field
                  name="tourPrice"
                  type="number"
                  component={RenderField.RenderTextField}
                  label="Price "
                />
              </Col>
              <Col xs={8}>
                <Field
                  name="tourTermsAndCondition"
                  type="textarea"
                  component={RenderField.RenderTextField}
                  label="Terms And Conditions "
                />
              </Col>
            </Row>

            <br />
            <Row>
              <Col xs={6}>
                <Label>Logo</Label>
                <Field
                  // key="field"
                  name="tourLogo"
                  component={DropZoneSingleRender}
                />
              </Col>
              <Col xs={6}>
                <Label>Thumbnail Image</Label>
                <Field
                  // key="field"
                  name="tourThumbnailImage"
                  component={DropZoneSingleRender}
                />
              </Col>
            </Row>

            <br />
            <Row>
              <Col xs={6}>
                <Label>Banner Image</Label>
                <Field
                  // key="field"
                  name="tourBannerImage"
                  component={DropZoneSingleRender}
                />
              </Col>
              <Col xs={6}>
                <Label>Site Photos</Label>
                <Field
                  // key="field"
                  name="tourSitePhoto"
                  component={DropZoneSingleRender}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Label>Description</Label>
              <EditorField
                key="field"
                name="tourDescription"
                id="inputEditorText"
                disabled={false}
                component={RenderField.RenderTextField}
                placeholder="Type here"
              />
            </Row>
            <Label> Day Planing</Label>
            <FieldArray name="packageDetail" component={TourpackArrayField} />
            <br />
            <div className="float-right">
              <Button color="primary" disabled={submitting}>
                Save
              </Button>{" "}
            </div>
            <br />
            <br />
          </CardBody>
        </Card>
      </Form>
    </>
  );
};

export default reduxForm({
  form: "TourPackCreationForm",
  validate,
})(TourPackCreationForm);

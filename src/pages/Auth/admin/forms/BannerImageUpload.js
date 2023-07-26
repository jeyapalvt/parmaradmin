/** @format */

import React, { useEffect, useState } from "react";
import { reduxForm, Form, Field } from "redux-form";
import DropZoneBannerRender from "../../../formcomponent/formfields/dropzonSingle/DropZoneBannerRender";
import { Label } from "reactstrap";
import { Row, Col, Button, Card, CardBody } from "reactstrap";
import axios from "axios";
import requests from "../../../../utils/Requests";
import OldImg from "../../attraction/attractionForms/OldImg";
const BannerImageUpload = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  useEffect(() => {
    getOldImage();
  }, []);
  const [mainImage, setmainImage] = useState([]);
  const [sideOne, setsideOne] = useState([]);
  const [sideTwo, setsideTwo] = useState([]);
  const getOldImage = () => {
    //uploadWebsiteBannerImages
    let tempdata = [],
      tempListOne = [],
      tempListTwo = [],
      tempListThree = [];
    axios
      .post(requests.getWebsiteBannerImagesList, { websiteSettingsId: 0 })
      .then((response) => {
        tempdata = response.data;
        for (let i = 0; i < tempdata.length; i++) {
          if (tempdata[i].category == "bannerImageMain") {
            tempListOne.push({
              id: tempdata[i].websiteSettingsId,
              imgUrl: tempdata[i].fileName,
            });
          }
          if (tempdata[i].category == "bannerImageRightTop") {
            tempListTwo.push({
              id: tempdata[i].websiteSettingsId,
              imgUrl: tempdata[i].fileName,
            });
          }
          if (tempdata[i].category == "bannerImageRightBottom") {
            tempListThree.push({
              id: tempdata[i].websiteSettingsId,
              imgUrl: tempdata[i].fileName,
            });
          }
        }

        // console.log(tempListOne)
        // console.log(tempListTwo)
        // console.log(tempListThree)
        setmainImage(tempListOne);
        setsideOne(tempListTwo);
        setsideTwo(tempListThree);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onSubmit = (values, dispatch) => {
    //console.log(values);
    const submitData = [
      // {
      //   websiteSettingsId: "",
      //   category: "",
      //   ordinal: "",
      //   fileName: "",
      //   fileId: "",
      //   errorCode: "",
      // },
    ];
    for (let i = 0; i < values.bannerImageMain.length; i++) {
      submitData.push({
        fileName: values.bannerImageMain[i].fileName,
        fileId: values.bannerImageMain[i].fileStorageId,
        category: "bannerImageMain",
      });
    }
    for (let i = 0; i < values.bannerImageRightTop.length; i++) {
      submitData.push({
        fileName: values.bannerImageRightTop[i].fileName,
        fileId: values.bannerImageRightTop[i].fileStorageId,
        category: "bannerImageRightTop",
      });
    }
    for (let i = 0; i < values.bannerImageRightBottom.length; i++) {
      submitData.push({
        fileName: values.bannerImageRightBottom[i].fileName,
        fileId: values.bannerImageRightBottom[i].fileStorageId,
        category: "bannerImageRightBottom",
      });
    }

    axios
      .post(requests.uploadWebsiteBannerImages, submitData)
      .then((response) => {
        getOldImage();
        props.dispatch(reset);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeImage = (idVal) => {
    axios
      .post(requests.removeWebsiteBannerImagesList, {
        websiteSettingsId: idVal,
      })
      .then((response) => {
        getOldImage();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Card>
        <CardBody>
          <Form>
            <Row>
              <Col>
                <Label>Left Carousel Image</Label>
                <Field
                  name="bannerImageMain"
                  component={DropZoneBannerRender}
                />

                <OldImg currentImage={mainImage} removeImage={removeImage} />
              </Col>
              <Col>
                <Label>Right Top Image</Label>
                <Field
                  name="bannerImageRightTop"
                  component={DropZoneBannerRender}
                />

                <OldImg currentImage={sideOne} removeImage={removeImage} />

                <Label>Right Carousel Image</Label>
                <Field
                  name="bannerImageRightBottom"
                  component={DropZoneBannerRender}
                />

                <OldImg currentImage={sideTwo} removeImage={removeImage} />
              </Col>
            </Row>
            <br />
            <br />
            <div className="float-right">
              <Button
                color="primary"
                className="btn btn-yellow"
                onClick={handleSubmit((values) =>
                  onSubmit({
                    ...values,
                    pill: 1,
                  })
                )}
              >
                Save
              </Button>
              &nbsp; &nbsp;&nbsp;
              <Button
                color="danger"
                onClick={reset}
                disabled={submitting || pristine}
              >
                Cancel
              </Button>{" "}
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default reduxForm({
  form: "BannerImageUpload",
})(BannerImageUpload);

/** @format */

import React, { useEffect, useState } from "react";
import { reduxForm, Form, Field } from "redux-form";
import DropZoneBannerRender from "../../formcomponent/formfields/dropzonSingle/DropZoneBannerRender";
import { Label } from "reactstrap";
import { Row, Col, Button, Card, CardBody } from "reactstrap";
import axios from "axios";
import requests from "../../../utils/Requests";
import OldImg from "../attraction/attractionForms/OldImg";
import Titlebanner from "../../../globel_cmponents/title_banner";
const BannerImageBtoC = (props) => {
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
          if (tempdata[i].category == "bannerImageBtoc") {
            tempListOne.push({
              id: tempdata[i].websiteSettingsId,
              imgUrl: tempdata[i].fileName,
            });
          }
        }

        // console.log(tempListOne)
        // console.log(tempListTwo)
        // console.log(tempListThree)
        setmainImage(tempListOne);
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
    for (let i = 0; i < values.bannerImageBtoc.length; i++) {
      submitData.push({
        fileName: values.bannerImageBtoc[i].fileName,
        fileId: values.bannerImageBtoc[i].fileStorageId,
        category: "bannerImageBtoc",
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
          <Titlebanner title="Banner Image For BtoC website" />
          <Form>
            <Row>
              <Col>
                <Label>Banner Image (SIZE SHOULT BE 1920PX X 860PX)</Label>
                <Field
                  name="bannerImageBtoc"
                  component={DropZoneBannerRender}
                />

                <OldImg currentImage={mainImage} removeImage={removeImage} />
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
  form: "BannerImageBtoC",
})(BannerImageBtoC);

/** @format */

import React, { useEffect, useState } from "react";
import { reduxForm, Field, Form } from "redux-form";
import { Card, CardBody, Button, Row, Col, Label, Alert } from "reactstrap";
import axios from "axios";
import requests from "../../../../utils/Requests";
import RenderExcelBarcodeField from "../../../formcomponent/ExcelUpload/RenderExcelBarcodeField";
import RenderField from "../../../formcomponent/formfields/RenderField";
import Swal from "sweetalert2";
const FormAddonBarCodeForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  useEffect(() => {
    getAttGroup();
  }, []);
  const [parkGroup, setparkGroup] = useState([]);
  const [attractionList, setattractionList] = useState([]);
  const [addonList, setaddonList] = useState([]);
  const [showDublicate, setshowDublicate] = useState("");
  const getAttGroup = () => {
    axios
      .post(requests.getallparkgroup, { attractionsId: 1 })
      .then((response) => {
        const values = [...parkGroup];
        values.length = 0;
        for (let i = 0; i < response.data.length; i++) {
          values.push({
            label: response.data[i].grpName,
            value: response.data[i].attractionGroupId,
          });
          // console.log(values);
        }
        setparkGroup(values);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAttractionList = (idVal) => {
    axios
      .post(requests.getattractionallbygroup, { attGroup: idVal })
      .then((response) => {
        const values = [...attractionList];
        values.length = 0;
        values.push({
          name: "Select",
          value: "",
        });
        for (let i = 0; i < response.data.length; i++) {
          values.push({
            name: response.data[i].attName,
            value: response.data[i].attractionsId,
          });
          // console.log(values);
        }
        setattractionList(values);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAddonList = async (idVal) => {
    await axios
      .post(requests.setaddonformlist, { attractionId: idVal })
      .then((response) => {
        const values = [...addonList];
        values.length = 0;
        values.push({
          name: "Select",
          value: "",
        });
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].barcodeAvailable == true) {
            values.push({
              name: response.data[i].addonName,
              value: response.data[i].addonFormId,
            });
          }

          // console.log(values);
        }

        setaddonList(values);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = (values, dispatch) => {
    // console.log(`${JSON.stringify(values, null, 2)}`);
    axios
      .post(requests.setAddonBarcode, values)
      .then((response) => {
        console.log(response.data);

        //101 -> List empty, 100-> somehing went wrong , 102- dublicate
        if (response.data.errCode == 0) {
          Swal.fire({
            title: "Success", //'Good job!',
            text: "Your Barcode Uploaded", //'You clicked the button.',
            icon: "success", //'success'
          });
          dispatch(reset("FormAddonBarCodeForm"));
        } else if (response.data.errCode == 100) {
          Swal.fire({
            title: "Error", //'Good job!',
            text: "Something Went Wrong", //'You clicked the button.',
            icon: "error", //'success'
          });
        } else if (response.data.errCode == 101) {
          Swal.fire({
            title: "Waring", //'Good job!',
            text: "List Empty! Verify Your Exacel data uploaded properly", //'You clicked the button.',
            icon: "waring", //'success'
          });
        } else if (response.data.errCode == 102) {
          // Swal.fire({
          //   title: "Waring", //'Good job!',
          //   text: "Dublicate Tickets Found", //'You clicked the button.',
          //   icon: "waring", //'success'
          // });
          setshowDublicate(response.data);
        } else if (response.data.errCode == 103) {
          Swal.fire({
            title: "Waring", //'Good job!',
            text: "All Tickets Are Dublicates", //'You clicked the button.',
            icon: "waring", //'success'
          });
        }
      })
      .catch((error) => {});
  };

  const reSubmit = (values, dispatch) => {
    axios
      .post(requests.setAddonBarcode, showDublicate)
      .then((response) => {
        //101 -> List empty, 100-> somehing went wrong , 102- dublicate
        if (response.data.errCode == 0) {
          Swal.fire({
            title: "Success", //'Good job!',
            text: "Your Barcode Uploaded", //'You clicked the button.',
            icon: "success", //'success'
          });
          dispatch(reset("FormAddonBarCodeForm"));
        } else if (response.data.errCode == 100) {
          Swal.fire({
            title: "Error", //'Good job!',
            text: "Something Went Wrong", //'You clicked the button.',
            icon: "error", //'success'
          });
        } else if (response.data.errCode == 101) {
          Swal.fire({
            title: "Waring", //'Good job!',
            text: "List Empty! Verify Your Exacel data uploaded properly", //'You clicked the button.',
            icon: "waring", //'success'
          });
        } else if (response.data.errCode == 102) {
          // Swal.fire({
          //   title: "Waring", //'Good job!',
          //   text: "Dublicate Tickets Found", //'You clicked the button.',
          //   icon: "waring", //'success'
          // });
          setshowDublicate(response.data);
        } else if (response.data.errCode == 103) {
          Swal.fire({
            title: "Waring", //'Good job!',
            text: "All Tickets Are Dublicates", //'You clicked the button.',
            icon: "waring", //'success'
          });
        }
      })
      .catch((error) => {});
  };
  return (
    <>
      <Card>
        <CardBody>
          <Form>
            <Row>
              <Col>
                <Field
                  name='attGroupId'
                  label='Attraction Group'
                  component={RenderField.RenderSelectField}
                  options={parkGroup}
                  onChange={(e) => getAttractionList(e)}
                />
              </Col>
              <Col>
                <Field
                  name='attractionId'
                  label='Attraction '
                  type='select'
                  component={RenderField.renderOptionField}
                  customfeild={attractionList}
                  onChange={(e) => getAddonList(e.target.value)}
                />
              </Col>
              <Col>
                <Field
                  name='addonId'
                  label='Add On '
                  type='select'
                  component={RenderField.renderOptionField}
                  customfeild={addonList}
                  // onChange={(e) => getAddonList(e)}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <Field
                  name='addonPrice'
                  label='Addon Price '
                  type='text'
                  component={RenderField.RenderTextField}

                  // onChange={(e) => getAddonList(e)}
                />
              </Col>
              <Col sm={8}>
                <Field name='barCodeList' component={RenderExcelBarcodeField} />
              </Col>
            </Row>

            {showDublicate == "" && (
              <div className='float-right'>
                <Button
                  color='primary'
                  className='btn btn-yellow'
                  onClick={handleSubmit((values) =>
                    onSubmit({
                      ...values,
                      pill: 1,
                    })
                  )}>
                  Save
                </Button>
                &nbsp; &nbsp;&nbsp;
                <Button
                  color='danger'
                  onClick={reset}
                  disabled={submitting || pristine}>
                  Cancel
                </Button>{" "}
              </div>
            )}

            {showDublicate != "" && (
              <>
                <Row>
                  <Col>
                    <Alert color='danger'>Dublicate Tickets Found</Alert>
                    {showDublicate.duplicateBarCodeList.map((tktNum) => (
                      <p>{tktNum}</p>
                    ))}
                  </Col>
                  <Col>
                    <Alert color='primary'>New Tickets</Alert>
                    {showDublicate.barCodeList.map((tktNum) => (
                      <p>{tktNum}</p>
                    ))}
                  </Col>
                </Row>
                <div className='float-right'>
                  <Button
                    color='primary'
                    className='btn btn-yellow'
                    onClick={handleSubmit((values) =>
                      reSubmit({
                        ...values,
                        pill: 1,
                      })
                    )}>
                    Proceed To Save
                  </Button>
                  &nbsp; &nbsp;&nbsp;
                  <Button
                    color='danger'
                    onClick={reset}
                    disabled={submitting || pristine}>
                    Cancel
                  </Button>{" "}
                </div>
              </>
            )}
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default reduxForm({
  form: "FormAddonBarCodeForm",
})(FormAddonBarCodeForm);

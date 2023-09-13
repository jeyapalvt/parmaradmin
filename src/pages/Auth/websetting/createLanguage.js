import React, { useEffect, useState } from "react";
import Titlebanner from "../../../globel_cmponents/title_banner";
import axios from "axios";
import requests from "../../../utils/Requests";
import { reduxForm, Field } from "redux-form";
import { Row, Col, Button } from "reactstrap";
import RenderField from "../../formcomponent/formfields/RenderField";
import CountryList from "./countryList";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import CountryCode from "./CountryCode";
const validate = (values) => {
  const errors = {};
  if (!values.langCode) {
    errors.langCode = "Required";
  }
  if (!values.langCountry) {
    errors.langCountry = "Required";
  }
  if (!values.langStatus) {
    errors.langStatus = "Required";
  }
  return errors;
};
const CreateLanguage = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const history = useHistory();
  const [languageOption, setlanguageOption] = useState([]);
  const [allList, setallList] = useState([]);
  const [selectedLanguage, setselectedLanguage] = useState();
  const [nativeLanguage, setnativeLanguage] = useState();
  const [selectedCounty, setselectedCounty] = useState();
  const [editLanguage, seteditLanguage] = useState();
  const [buttonPressed, setbuttonPressed] = useState(false);
  let { id } = useParams();
  useEffect(() => {
    getLanguageListFromgoogle();
    if (id != "null") {
      getLanguageDetails();
    }
  }, []);

  const langStatus = [
    { name: "select", value: "" },
    { name: "Active", value: true },
    { name: "InActive", value: false },
  ];
  const getLanguageListFromgoogle = () => {
    axios
      .post(requests.getLanguagesListFromGoogle, { languageId: 1 })
      .then((res) => {
        console.log(res.data);
        let tempArr = res.data;
        setallList(res.data);
        let values = [];
        values.push({ name: "select", value: "" });
        for (let i = 0; i < tempArr.length; i++) {
          values.push({
            name: tempArr[i].langName,
            value: tempArr[i].langCode,
          });
        }
        setlanguageOption(values);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getNativeLanguage = (e) => {
    console.log("idbywucvuywcv", e.target.value);
    const tempLanguage = allList.find(
      (item) => item.langCode == e.target.value
    );

    console.log("after filter", tempLanguage);
    setselectedLanguage(tempLanguage);
    const tempObject = {
      transFromText: tempLanguage.langName,
      transFromLang: "en",
      transToLang: tempLanguage.langCode,
    };

    console.log("post object", tempObject);
    axios
      .post(requests.translateText, tempObject)
      .then((res) => {
        console.log(res.data);
        setnativeLanguage(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getLanguageDetails = () => {
    axios
      .post(requests.getLanguagesList, { languageId: 0 })
      .then((res) => {
        const tempList = res.data;
        const languageDetail = tempList.find((item) => item.languageId == id);
        console.log("languageDetail", languageDetail);
        seteditLanguage(languageDetail);
        intialData(languageDetail);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const intialData = (data) => {
    props.initialize({
      languageId: data.languageId,
      langCode: data.langCode,
      langCountry: data.langCountry,
      langName: data.langName,
      langStatus: data.langStatus,
      langNameInNaviteLang: data.langNameInNaviteLang,
    });
  };

  const submitToApi = (values) => {
    setbuttonPressed(true);
    if (id !== "null") {
      console.log("iabXISBCSBC", id);
      const postObject = {
        languageId: values.languageId,
        langCode: values.langCode,
        langName: values.langName,
        langNameInNaviteLang: values.langNameInNaviteLang,
        langCountry: values.langCountry,
        langStatus: values.langStatus,
      };
      console.log(`You Values:\n\n${JSON.stringify(postObject, null, 2)}`);

      axios
        .post(requests.editLanguages, postObject)
        .then((res) => {
          console.log(res.data);
          if (res.data.errCode == 200) {
            setbuttonPressed(false);
            Swal.fire("success", "Language details updated success", "success");
            history.goBack();
          } else if (res.data.errCode == 281) {
            setbuttonPressed(false);
            Swal.fire("error", "Language Already added", "error");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const postObject = {
        langCode: selectedLanguage.langCode,
        langName: selectedLanguage.langName,
        langNameInNaviteLang: nativeLanguage.transToText,
        langCountry: values.langCountry,
        langStatus: values.langStatus,
      };
      console.log(`You Values new:\n\n${JSON.stringify(postObject, null, 2)}`);

      axios
        .post(requests.createLanguages, postObject)
        .then((res) => {
          console.log(res.data);
          if (res.data.errCode == 200) {
            setbuttonPressed(false);
            Swal.fire("success", "New language added success", "success");
            history.goBack();
          } else if (res.data.errCode == 281) {
            setbuttonPressed(false);
            Swal.fire("error", "Language Already added", "error");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deleteRecord = (values) => {
    console.log("va;ues", values);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(requests.deleteLanguages, { languageId: values.languageId })
          .then((res) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            history.goBack();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  return (
    <div>
      <Titlebanner title="Create New" />

      <Row>
        <Col>
          <Field
            label="Language List"
            name="langCode"
            type="select"
            customfeild={languageOption}
            disabled={id == "null" ? false : true}
            component={RenderField.renderOptionField}
            onChange={(e) => getNativeLanguage(e)}
          />
        </Col>
        <Col>
          <Field
            label="Country"
            name="langCountry"
            type="select"
            customfeild={CountryList}
            component={RenderField.renderOptionField}
          />
        </Col>
        <Col>
          <Field
            label="Active Status"
            name="langStatus"
            type="select"
            customfeild={langStatus}
            component={RenderField.renderOptionField}
          />
        </Col>
        <div className="float-right">
          <Button
            color="primary"
            //disabled={submitting}
            disabled={buttonPressed == true || submitting}
            onClick={handleSubmit((values) =>
              submitToApi({
                ...values,
              })
            )}
          >
            {buttonPressed == true ? "Please Wait" : "Save"}
          </Button>{" "}
          &nbsp; &nbsp;&nbsp;
          {id != "null" && (
            <Button
              color="danger"
              onClick={handleSubmit((values) =>
                deleteRecord({
                  ...values,
                })
              )}
            >
              Delete
            </Button>
          )}{" "}
          &nbsp; &nbsp;&nbsp;
          {/* <Button
            color="danger"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Cancel
          </Button>{" "} */}
        </div>
      </Row>
    </div>
  );
};

export default reduxForm({
  form: "CreateLanguage",
  validate,
})(CreateLanguage);

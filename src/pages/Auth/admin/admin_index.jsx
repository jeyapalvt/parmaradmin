import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import FromSubmitToApi from "../../../utils/FromSubmitToApi";
import { useState } from "react";
import axios from "axios";
import BookingForm from "../booking/BookingForm";
import Swal from "sweetalert2";
import requests from "../../../utils/Requests";
import ImageUploader from "react-images-upload";
import Imgupload from "./forms/Imgupload";
const AdminIndex = (props) => {
  const img = [
    "https://media.smarteragent.com/unsafe/http://cdn.photos.sparkplatform.com/fl/20190819183614687947000000-o.jpg",
    "https://media.smarteragent.com/unsafe/http://cdn.photos.sparkplatform.com/fl/20190819183639357715000000-o.jpg",
    "https://media.smarteragent.com/unsafe/http://cdn.photos.sparkplatform.com/fl/20190819183701098384000000-o.jpg",
  ];
  const [pictures, setPictures] = useState(img);
  const [defaultImages, setdefaultImages] = useState(img);
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const confirmUpload = () => {
    // successAlert();
    console.warn("Confirm Upload =>", [...pictures]);
    console.log([...pictures]);
    let len = pictures.length;
    console.log("length", len);
    console.log(pictures[0]);
    for (let i = 0; i < len; i++) {
      console.log(i);
      if (pictures[i].length == 0) {
        console.log("00000000000000");
      } else {
        console.log("file..........................");
        console.log("pic Data", pictures[i].length);

        for (let j = 0; j < pictures[i].length; j++) {
          let formdata = new FormData();
          formdata.append("file", pictures[i][j]);
          axios
            .post(requests.image + "v1.0/fileupload", formdata, {
              headers: headers,
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err.data);
            });
        }
      }
    }
  };

  const onDrop = (picture) => {
    console.log("pictures filter", picture);
    // if (picture != null) {
    //   setPictures([...pictures, picture]);
    // } else {
    //   setPictures([...pictures]);
    // }
    // console.log(picture);
  };

  //   const successAlert = () => {
  //     Swal.fire({
  //         title: 'Good job!',
  //         text: 'You clicked the button.',
  //         icon: 'success'
  //       });
  // }

  return (
    <>
      {" "}
      <button onClick={confirmUpload}>Confirm upload</button>
      <ImageUploader
        {...props}
        withIcon={false}
        withPreview={true}
        onChange={onDrop}
        defaultImages={pictures}
        // imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        //  maxFileSize={5242880}
      />
    </>
  );
};

export default AdminIndex;

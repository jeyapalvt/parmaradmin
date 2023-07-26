import Dropzone from "react-dropzone-uploader";
import requests from "../../../../utils/Requests";
import { useState, useEffect } from "react";
const DropZoneForBanner = (props) => {
  useEffect(() => {}, []);
  const fileStorageId = [];

  const getUploadParams = ({ meta, file }) => {
    return {
      url: requests.image + "v1.0/fileupload",
      //"http://66.29.149.191:8080/parmartour/v1.0/fileupload",
      file,
    };
  };

  const handleChangeStatus = ({ xhr }, status) => {
    if (status === "done") {

      console.log("Banner",JSON.parse(xhr.response));
      const fileElement = {
        fileStorageId: JSON.parse(xhr.response).fileStorageId,
        fileName: JSON.parse(xhr.response).fileName,
      };

      fileStorageId.push(fileElement);
    
    } else {
    }
  };

  // const { value, onChange } = props;
  props.onChange(fileStorageId);

  return (
    <>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        accept="image/*"
      />
    </>
  );
};
export default DropZoneForBanner;

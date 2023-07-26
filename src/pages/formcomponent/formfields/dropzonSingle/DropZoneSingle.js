import { useState, useEffect } from "react";
import Dropzone from "react-dropzone-uploader";
import requests from "../../../../utils/Requests";

const DropZoneSingle = (props) => {
  useEffect(() => {
    // inifile= new File([buf], 'image_data_url.jpg', { type: 'image/jpeg' })
  }, []);
  const [imgRes, setimgRes] = useState();
  const getUploadParams = ({ meta, file }) => {
  
    return {
      url: requests.image + "v1.0/fileupload",
      //"http://66.29.149.191:8080/parmartour/v1.0/fileupload",
      file,
    };
  };

  const handleChangeStatus = ({ xhr }, status) => {
    if (status === "done") {
      // console.log(JSON.parse(xhr.response));
      // console.log(JSON.parse(xhr.response).fileName);
      //  setfilename(JSON.parse(xhr.response).fileName);
      let imgname = JSON.parse(xhr.response).fileName;
      setimgRes(imgname);

      // const newdata={...Data}
      // newdata[target.id] = (JSON.parse(xhr.response).fileStorageId)
      // setData(newdata)

      // const imgurl = (JSON.parse(xhr.response).fileStorageId)
      // const fileElement = {
      //     fileStorageId: JSON.parse(xhr.response).fileStorageId,
      // };
      // fileStorageId.push(fileElement);
      // console.log(fileStorageId);
    } else {
    }
  };

  const { value, onChange } = props;
  props.onChange(imgRes);

  return (
    <>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        maxFiles={1}
        accept="image/*"
      />
    </>
  );
};
export default DropZoneSingle;

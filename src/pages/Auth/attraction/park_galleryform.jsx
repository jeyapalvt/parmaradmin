import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { useState } from "react";
const Parkgalleryform = () => {
      // Payload data and url to upload files
  const getUploadParams = ({ meta, file }) => {
    return { url: "http://66.29.149.191:8080:8080/fileuploadtest/upload", file };
  };

  // Return the current status of files being uploaded
  const handleChangeStatus = ({ meta, file, xhr }, status) => {
   // console.log(status, meta, file);
    if (status === 'done'){
      // console.log( JSON.parse(xhr.response));      
    // console.log(JSON.parse(xhr.response).message);
      
    }  
  };
  const [imagelink, setimagelink] = useState([{
      imglink:''
  }]);


    return ( <>
        <label htmlFor="exampleInputEmail1">Park Gallery Images</label>
                <Dropzone
                  getUploadParams={getUploadParams}
                  onChangeStatus={handleChangeStatus}
                  // onSubmit={handleSubmit}
                  accept="image/*,audio/*,video/*"
                />
    </> );
}
 
export default Parkgalleryform;
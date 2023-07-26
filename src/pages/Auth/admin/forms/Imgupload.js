import {useState} from 'react'
import ImageUploader from "react-images-upload";
const Imgupload = (props) => {
    const [pictures, setPictures] = useState([]);
    const onDrop = picture => {
        setPictures([...pictures, picture]);
        console.log(picture);
      
      };
    return ( <>
     <ImageUploader
      {...props}
      withIcon={false}
      withPreview={true}
      onChange={onDrop}
      defaultImages={props.defaultImages}
      // imgExtension={[".jpg", ".gif", ".png", ".gif"]}
    //  maxFileSize={5242880}
    />
    </> );
}
 
export default Imgupload;
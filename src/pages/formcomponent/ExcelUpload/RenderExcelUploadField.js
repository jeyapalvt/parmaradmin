import { Field } from "redux-form";
import RenderExcelUplad from "./RenderExcelUpload";

const RenderExcelUploadField = (props) => {
  return <Field {...props} component={RenderExcelUplad} />;
};

export default RenderExcelUploadField;

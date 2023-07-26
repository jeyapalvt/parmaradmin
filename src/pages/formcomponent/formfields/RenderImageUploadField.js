import RenderDrop from "./RenderDrop";
import { Field } from "redux-form";
const RenderImageUploadField = (props) => {
  return <Field {...props} component={RenderDrop} />;
};

export default RenderImageUploadField;

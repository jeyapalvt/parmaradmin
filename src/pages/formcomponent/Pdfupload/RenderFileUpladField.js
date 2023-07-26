import { Field } from "redux-form";
import RenderFileUpload from "./RenderFileUplad";

const RenderFileUpladField = (props) => {
    return (<Field {...props} component={RenderFileUpload} />);
}

export default RenderFileUpladField;
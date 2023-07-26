import { Field } from "redux-form";

import FileUpFerField from "./FileUpFerField";


const FileUpFerRen = (props) => {
    return (<Field {...props} component={FileUpFerField} />);
}

export default FileUpFerRen;
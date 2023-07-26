import { Field } from "redux-form";
import FileUpExpoField from "./FileUpExpoField";


const FIleUpExpoRen = (props) => {
    return (<Field {...props} component={FileUpExpoField} />);
}

export default FIleUpExpoRen;

import { Field } from "redux-form";
import DropZoneRender from "./DropZoneRender";
const DropZoneSingleRender = (props) => {
    return <Field {...props} component={DropZoneRender} />
}

export default DropZoneSingleRender;
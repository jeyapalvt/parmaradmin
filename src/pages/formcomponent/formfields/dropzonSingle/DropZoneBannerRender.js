
import { Field } from "redux-form";
import DropZoneForBannerField from "./DropZoneForBannerField";
const DropZoneBannerRender = (props) => {
    return <Field {...props} component={DropZoneForBannerField} />
}

export default DropZoneBannerRender;
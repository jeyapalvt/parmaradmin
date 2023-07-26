import { Field } from "redux-form";
import RenderExcelBarcode from "./RenderExcelBarcode";


const RenderExcelBarcodeField = (props) => {
    return (<Field {...props} component={RenderExcelBarcode} />);
}

export default RenderExcelBarcodeField;
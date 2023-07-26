import ExcelForBarcode from "./ExcelForBarcode";

const RenderExcelBarcode = (props) => {
    const { placeholder, input: { value, onChange }, disabled, id } = props;
    return (
        <ExcelForBarcode
            id={id}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    );
}

export default RenderExcelBarcode;

import ExcelUpload from "./ExcelUplad";

const RenderExcelUplad = (props) => {
  const {
    placeholder,
    input: { value, onChange },
    disabled,
    id,
  } = props;
  return (
    <ExcelUpload
      id={id}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default RenderExcelUplad;

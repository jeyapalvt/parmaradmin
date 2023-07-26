import FileUpload from "./FileUpload";

const RenderFileUpload = (props) => {
    const { placeholder, input: { value, onChange }, disabled, id } = props;
    return (
        <FileUpload
            id={id}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    );
}

export default RenderFileUpload;
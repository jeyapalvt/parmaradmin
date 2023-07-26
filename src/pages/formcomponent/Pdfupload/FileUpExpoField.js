import FileUpExpo from "./FileUpExpo";


const FileUpExpoField = (props) => {
    const { placeholder, input: { value, onChange }, disabled, id } = props;
    return (
        <FileUpExpo
            id={id}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    );
}

export default FileUpExpoField;
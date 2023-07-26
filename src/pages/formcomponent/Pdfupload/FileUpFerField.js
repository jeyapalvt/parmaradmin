
import FileUpFer from "./FileUpFer";


const FileUpFerField = (props) => {
    const { placeholder, input: { value, onChange }, disabled, id } = props;
    return (
        <FileUpFer
            id={id}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    );
}

export default FileUpFerField;
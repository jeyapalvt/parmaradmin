
import DropZoneSingle from "./DropZoneSingle";

const DropZoneRender = (props) => {
    const { placeholder, input: { value, onChange }, disabled, id } = props;

    //  console.log(value);
    return (<>
        <DropZoneSingle
            id={id}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    </>);
}

export default DropZoneRender;
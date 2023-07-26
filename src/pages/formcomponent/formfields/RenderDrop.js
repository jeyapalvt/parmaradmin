import RenderImageUploder from "./DropZoneImgUploader";

const RenderDrop = (props) => {
  const {
    placeholder,
    input: { value, onChange },
    disabled,
    id,
  } = props;

  //  console.log(value);
  return (
    <>
      <RenderImageUploder
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default RenderDrop;

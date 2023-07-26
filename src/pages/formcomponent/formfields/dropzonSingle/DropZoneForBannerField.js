import DropZoneForBanner from "./DropZoneForBanner";


const DropZoneForBannerField = (props) => {
  const {
    placeholder,
    input: { value, onChange },
    disabled,
    id,
  } = props;

  //  console.log(value);
  return (
    <>
      <DropZoneForBanner
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default DropZoneForBannerField;

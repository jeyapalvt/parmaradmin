import { Label, FormGroup, Input } from "reactstrap";
import Select from "react-select";
const RenderTextField = ({
  input,
  label,
  type,
  disabled,
  meta: { asyncValidating, touched, error },
}) => (
  <div>
    <Label>{label}</Label>{" "}
    {touched && error && <span className="error text-danger">{error}</span>}
    <FormGroup>
      <div className={asyncValidating ? "async-validating" : ""}>
        <Input {...input} type={type} placeholder={label} disabled={disabled} />
      </div>
    </FormGroup>
  </div>
);

const RenderTextareaField = ({
  input,
  label,
  type,
  meta: { asyncValidating, touched, error },
}) => (
  <div>
    <FormGroup>
      <Label>{label}</Label>{" "}
      {touched && error && <span className="error text-danger">{error}</span>}
      <Input {...input} type={type} placeholder={label} rows="10" />
    </FormGroup>
  </div>
);

const renderOptionField = ({
  input,
  label,
  type,
  customfeild,
  meta: { asyncValidating, touched, error },
}) => (
  <div>
    <label>{label}</label>{" "}
    {touched && error && <span className="error text-danger">{error}</span>}
    <FormGroup>
      <div className={asyncValidating ? "async-validating" : ""}>
        {/* <Label for={label}>{label}</Label> */}
        <Input {...input} type={type} placeholder={label} data-allow-clear={1}>
          {customfeild.map((optvalue, key) => (
            <option key={key} name={optvalue.value} value={optvalue.value}>
              {optvalue.name}
            </option>
          ))}
        </Input>
      </div>
    </FormGroup>
  </div>
);

const RenderRadioField = ({
  input,
  type,
  icon,
  radioName,
  value,
  label,
  options,
  disabled,
  meta: { asyncValidating, touched, error },
}) => (
  <div style={{ display: "flex" }}>
    <div className="single-widget-search-input-title">{label}</div>{" "}
    &nbsp;&nbsp;&nbsp;
    <input
      {...input}
      type={type}
      disabled={disabled}
      value={options}
      name={radioName}
    />
    &nbsp;&nbsp;&nbsp;
    {touched && error && <span className="error text-danger">{error}</span>}
  </div>
);

const RenderDisableField = ({
  input,
  label,
  type,

  meta: { asyncValidating, touched, error },
}) => (
  <div>
    <FormGroup>
      <div className={asyncValidating ? "async-validating" : ""}>
        <Label for={label}>{label}</Label>
        {}
        <Input {...input} type={type} name={label} disabled />
      </div>
    </FormGroup>
  </div>
);

// const RenderSelectField = (props ) => {
//   const { input, options } = props;
//   console.log("props",props)
//   return (
//     <Select
//       {...input}
//       // onChange={(event, value) => input.onChange(value)}
//       // onChange={value => input.onChange(value)}
//       value={options.find(c => c.value === input.value)}
//                         onChange={val => input.onChange(val.value)}
//       onBlur={() => input.onBlur(input.value)}
//       options={options}
//     />
//   )
//   };

const RenderSelectField = ({
  input,
  label,
  type,
  isDisabled,
  options,
  meta: { asyncValidating, touched, error },
}) => (
  <div>
    <Label>{label}</Label>{" "}
    {touched && error && <span className="error text-danger">{error}</span>}
    <FormGroup>
      <Select
        {...input}
        // onChange={(event, value) => input.onChange(value)}
        //onChange={value => input.onChange(value)}
        value={options.find((c) => c.value === input.value[0])}
        onChange={(val) => input.onChange(val.value)}
        // onBlur={() => input.onBlur(input.value)}
        onBlur={(event) => event.preventDefault()}
        options={options}
        isDisabled={isDisabled}
      />
    </FormGroup>
  </div>
);

const inputWithCheckBoxField = ({
  input,
  label,
  type,
  meta: { asyncValidating, touched, error },
}) => (
  <div>
    {touched && error && <span>{error}</span>}
    <input
      {...input}
      type={type}
      placeholder={label}
      className="form-control"
    />
  </div>
);

// const RendercheckboxField = ({
//   input,
//   label,
//   type,
//   customfeild,
//   meta: { asyncValidating, touched, error },
// }) => (
//   <div>

//     <input type="checkbox" {...input} /> &nbsp;&nbsp;&nbsp;&nbsp;
//       {label}
//       <div className="err-msg">
//     {touched && error && <span >{error}</span>}

//     </div>
//   </div>
// );
const RendercheckboxField = ({
  input,
  label,
  type,
  checked,
  customfeild,
  meta: { asyncValidating, touched, error },
}) => (
  <div>
    <input type="checkbox" {...input} checked={checked} />{" "}
    &nbsp;&nbsp;&nbsp;&nbsp;
    {label}
    <div className="err-msg">{touched && error && <span>{error}</span>}</div>
  </div>
);
export default {
  RenderTextField,
  renderOptionField,
  RenderRadioField,
  RenderDisableField,
  RendercheckboxField,
  inputWithCheckBoxField,
  RenderTextareaField,
  RenderSelectField,
};

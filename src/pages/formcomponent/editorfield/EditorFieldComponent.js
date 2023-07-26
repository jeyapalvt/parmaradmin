import React from "react";

import NoteEditor from "./NoteEditor";

const EditorFieldComponent = (props) => {
  // const { placeholder, input: { onChange, value }, disabled, id } = props;
  const {
    meta: { touched, error },
    input,
  } = props;
  return (
    <NoteEditor
      // id={id}
      // disabled={disabled}
      // placeholder={placeholder}
      // onChange={onChange}
      // value={value}
      // input={{...input}}
      onChange={input.onChange}
      value={input.value}
      touched={touched}
      error={error}
      input={{ ...input }}
    />
  );
};

export default EditorFieldComponent;

import { useState } from "react";
const Formone = ({ updateParentabc, Test }) => {
  return (
    <>
      <p>{Test}</p>
      <label>contact</label>
      <input type="text" name="contact" onChange={updateParentabc} />

      <br />
      <label>email</label>
      <input type="text" name="email" onChange={updateParentabc} />
    </>
  );
};

export default Formone;

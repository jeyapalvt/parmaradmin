import { useState, useEffect } from "react";
import validation from "./validation";
const Formtwo = ({ parantcallback }) => {
  const [Data, setData] = useState({
    empName: "",
    empPass: "",
  });
  const [logindata, setlogindata] = useState([]);

  const handleForm = (e) => {
    const newdata = { ...Data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  };
  const submitForm = (e) => {
    e.preventDefault();

    parantcallback();
  };
  return (
    <>
      <form onSubmit={(e) => submitForm(e)}>
        <input
          placeholder="Name"
          type="text"
          onChange={(e) => handleForm(e)}
          id="empName"
          value={Data.empName}
        ></input>
        <input
          placeholder="Pass"
          type="text"
          onChange={(e) => handleForm(e)}
          id="empPass"
          value={Data.empPass}
        ></input>
        <button>Submit</button>
      </form>
    </>
  );
};

export default Formtwo;

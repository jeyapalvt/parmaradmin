import Formone from "./formone";
import Formtwo from "./formtwo";
import { useState } from "react";
const Formthree = () => {
  const [dataabc, updataabc] = useState({});
  const updateParent = (e) => {
    updataabc({ ...dataabc, [e.target.name]: e.target.value });
  };

  const [ValueOne, setValueOne] = useState("value one");

  const alertParentData = () => {
    // window.alert(dataabc);
    setValueOne("Value two");
  };
  return (
    <div className="parent">
      <h3>Parent Component</h3>
      Data Stored in Parent State:
      <br />
      {JSON.stringify(dataabc)}
      <br />
      <br />
      <p>FOrm one</p>
      <Formone updateParentabc={updateParent} Test={ValueOne} />
      <br />
      <br />
      <p>FOrm two</p>
      <button onClick={alertParentData}>Alert Data</button>
    </div>
  );
};

export default Formthree;

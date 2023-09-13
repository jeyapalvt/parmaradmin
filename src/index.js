import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./utils/store";
import App from "./App";
import { AuthProvider } from "./utils/auth_context";

// const test = "production";
// if (test === "production") {
//   console.error = () => {};
//   console.log = () => {};
//   console.warn = () => {};
//   console.debug = () => {};
// }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

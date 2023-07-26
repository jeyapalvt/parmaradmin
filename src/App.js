import UnAuthIndex from "./pages/Unauth/un_auth_index";
import AuthIndex from "./pages/Auth/auth_index";
import { UseAuth } from "./utils/auth_context";
import store from "./utils/store";
import { Provider } from "react-redux";
import cryptoRandomString from 'crypto-random-string';
import { useEffect } from 'react';
function App() {
  const { isLoggedIn } = UseAuth({});
  let user = sessionStorage.getItem("login");
  let randomString = cryptoRandomString({ length: 100, type: 'url-safe' });
  sessionStorage.setItem("randomString", randomString);
  useEffect(() => {
    //7849
  }, []);
  return (
    <Provider store={store}>
      {/* {console.log(`${isLoggedIn}`)} */}
      {user == 1 ? <AuthIndex /> : <UnAuthIndex />}
      {/* <AuthIndex /> */}
    </Provider>
  );
}

export default App;

const { createContext, useContext, useState } = require("react");

const AuthContext = createContext({});
const AuthProvider = (props) => {
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const LoginUser = (LoginData) => {

        setisLoggedIn(true)

    }
    const LogoutUser = () => {
        setisLoggedIn(false);
    }
    const AuthContextValue = {
        isLoggedIn,
        LoginUser,
        LogoutUser
    }



    return <AuthContext.Provider value={AuthContextValue} {...props} />;
}

const UseAuth = () => useContext(AuthContext);
export { UseAuth, AuthProvider }
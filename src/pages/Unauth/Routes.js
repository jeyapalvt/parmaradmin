import Forgetpassword from "./forget_pass";
import LoginPage from "./login";





const routes = [

  {
    path: '/user-login',
    component: LoginPage,
  },
  {
    path : '/forget-Password',
    component: Forgetpassword
  }


];
export default routes;

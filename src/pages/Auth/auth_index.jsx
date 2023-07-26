import AsideNav from "./frames/aside_nav";
 import Container from "./frames/container";
import Footer from "./frames/footer";
import TopNav from "./frames/header_nav";
import { BrowserRouter } from "react-router-dom";
//import WithRouterApp from "./frames/container";
const AuthIndex = () => {
  
  return (
    <>
      <div className="wrapper">
        <div className="preloader flex-column justify-content-center align-items-center">
          <img
            className="animation__shake"
            src="dist/img/ParmarLogo.png"
            alt="ParmarLogo"
            height={60}
            width={60}
          />
        </div>
        <BrowserRouter>
          <TopNav />
          <AsideNav />
          <Container />
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
};

export default AuthIndex;

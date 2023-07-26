/** @format */

import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Redirect,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import RouteWithSubRoute from "../../../utils/route_with_sub_route";
import routes from "../route/Routes";
import NotFound from "../../not_found";
import Chart from "../chaert/chart";
import SideMenu from "../route/sidemenu";
import accountsMenu from "../route/accountsMenu";
import BackOfficeAdmin from "../route/backOfficeAdmin";
import encryptStorage from "../../../utils/EncryptStorage";
import Dashboard from "../../../globel_cmponents/dashboard";
import ItteamMenu from "../route/itteamMenu"
const Container = () => {
  const [auth, setauth] = useState(false);
  const [tempauth, settempauth] = useState(true);
  useEffect(() => {
    const currentUrl = window.location.href;
    const pathname = window.location.pathname;
    // console.log("current url", currentUrl);
    // console.log("Path Name", pathname);
    // console.log(pathname.split("/"));
    // console.log(pathname.split("/")[2]);

    // console.log("SideMenu", SideMenu);

    const loginDetails = encryptStorage.getItem("DFuck");
    let userType = JSON.parse(loginDetails);

    let tempMenu;

    if (userType.userType == 1) {
      tempMenu = SideMenu;
    } else if (userType.userType == 2) {
      tempMenu = accountsMenu;
    } else if (userType.userType == 3) {
      tempMenu = BackOfficeAdmin;
     
      
    } else if(userType.userType == 4){
      tempMenu = ItteamMenu;
    }


    for (let i = 0; i < tempMenu.length; i++) {
      settempauth(false);
      if (tempMenu[i].fixMenu == true) {
        if (pathname.split("/")[2] == tempMenu[i].path.split("/")[2]) {
          setauth(true);
        break;
        }
      }

      for (let j = 0; j < tempMenu[i].SideMenu.length; j++) {
        // console.log(tempMenu[i].SideMenu[j].path);
        // console.log(tempMenu[i].SideMenu[j].path.split("/")[2]);

        if (
          pathname.split("/")[2] == tempMenu[i].SideMenu[j].path.split("/")[2]
        ) {
          setauth(true);
          break;
        }
      }
    }

    // if(a != 1){
    // setauth(true)
    // }else{
    //   setauth(false)
    // }
  });

  return (
    <>
      <div class='content-wrapper'>
        <section class='content'>
          <div class='container-fluid'>
            {tempauth ? (
              <>
                <Switch>
                  <Route exact path='/'>
                    <Redirect to='/dashboard/index' />
                  </Route>
                </Switch>
              </>
            ) : (
              <>
                {auth ? (
                  <>
                    <Switch>
                      <Route exact path='/'>
                        <Redirect to='/dashboard/index' />
                      </Route>

                      {/* <Redirect exact from="/" to='/dashboard/index' /> */}

                      {routes.map((route, i) => (
                        <RouteWithSubRoute key={i} {...route} />
                      ))}
                      <Route component={NotFound} />
                    </Switch>
                  </>
                ) : (
                  <>
                    <Switch>
                      <Route component={NotFound} />
                    </Switch>
                  </>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

//const WithRouterApp = withRouter(Container);

export default withRouter(Container);

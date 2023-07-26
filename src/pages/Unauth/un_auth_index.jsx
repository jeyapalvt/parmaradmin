import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import routes from "./Routes";
import RouteWithSubRoute from "../../utils/route_with_sub_route";
import NotFound from "../not_found";
const UnAuthIndex = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/user-login" />
          {routes.map((route, i) => (
            <RouteWithSubRoute key={i} {...route} />
          ))}
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default UnAuthIndex;

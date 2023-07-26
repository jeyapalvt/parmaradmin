import { Route } from "react-router";
const RouteWithSubRoute = (route) => {
    return (

        <Route
         path={route.path}
            render={(props) => (
                <route.component {...props}  routes={route.routes} />
            )}
        />
    );
}

export default RouteWithSubRoute;
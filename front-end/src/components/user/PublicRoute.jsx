import React from "react";
import { Route, Redirect } from "react-router-dom";
import { IsLogin } from "./IsLogin";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        IsLogin() && restricted ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
export default PublicRoute;

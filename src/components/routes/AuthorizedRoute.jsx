import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthorizedRoute =  ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={(props) => {
      return localStorage.getItem("accessToken") ? <Component {...props}/> : <Redirect to="/login" />;
    }} />
  );
};

export default AuthorizedRoute;
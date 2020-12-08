import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const UserPrivateRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);
  const { token } = user;

  return token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <Redirect to="/login" />
  );
};

export default UserPrivateRoute;

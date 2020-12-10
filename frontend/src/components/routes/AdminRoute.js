import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AdminRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);
  const { token, role } = user;

  return token && role === "admin" ? (
    <Route {...rest} render={() => children} />
  ) : (
    <Redirect to="/login" />
  );
};

export default AdminRoute;

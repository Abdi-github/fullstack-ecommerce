import react, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentAdmin } from "../../functions/auth";
import { Redirect, Route } from "react-router-dom";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          //   console.log("CURRENT ADMIN RES", res);
          setIsAdmin(true);
        })
        .catch((error) => {
          console.log("ADMIN ROUTE ERR", error);
          setIsAdmin(false);
        });
    }
  }, [user]);

  return isAdmin ? <Route {...rest} /> : <Redirect to="/login" />;
};

export default AdminRoute;

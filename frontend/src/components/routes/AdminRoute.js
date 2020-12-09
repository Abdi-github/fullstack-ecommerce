import react, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentAdmin } from "../../functions/auth";
import { Redirect, Route } from "react-router-dom";

// const AdminRoute = ({ children, ...rest }) => {
//   const { user } = useSelector((state) => ({ ...state }));
//   const [isAdmin, setIsAdmin] = useState(false);

//   const { token } = user;
//   useEffect(() => {
//     if (token) {
//       currentAdmin(token)
//         .then((res) => {
//           //   console.log("CURRENT ADMIN RES", res);
//           setIsAdmin(true);
//         })
//         .catch((error) => {
//           console.log("ADMIN ROUTE ERR", error);
//           setIsAdmin(false);
//         });
//     }
//   }, [token]);

//   return isAdmin ? <Route {...rest} /> : <Redirect to="/login" />;
// };

// export default AdminRoute;

//   const user = useSelector((state) => state.user);
//   const { token } = user;

//   return token ? (
//     <Route {...rest} render={() => children} />
//   ) : (
//     <Redirect to="/login" />
//   );
const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  //   const [isAdmin, setIsAdmin] = useState(false);

  const { token, role } = user;

  return token && role === "admin" ? (
    <Route {...rest} render={() => children} />
  ) : (
    <Redirect to="/login" />
  );
};

export default AdminRoute;

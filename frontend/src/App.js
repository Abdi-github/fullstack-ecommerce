import react, { useEffect } from "react";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/HomePage";
import { Switch, Route } from "react-router-dom";
import Header from "./components/nav/Header";
import RegisterCompletePage from "./pages/auth/RegisterCompletePage";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import { currentUser } from "./functions/auth";
import UserDashboardPage from "./pages/user/UserDashboardPage";
import PasswordUpdatePage from "./pages/user/PasswordUpdatePage";
import WishListPage from "./pages/user/WishListPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdatePage from "./pages/admin/category/CategoryUpdatePage";
import AdminRoute from "./components/routes/AdminRoute";
import UserPrivateRoute from "./components/routes/UserPrivateRoute";
import SubCategoryCreatePage from "./pages/admin/subCategory/SubCategoryCreatePage";
import SubCategoryUpdatePage from "./pages/admin/subCategory/SubCategoryUpdatePage";
import ProductCreatePage from "./pages/admin/product/ProductCreatePage";

function App() {
  const dispatch = useDispatch();

  // Check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const tokenResult = await user.getIdTokenResult();
        console.log("user", user);
        currentUser(tokenResult.token)
          .then((res) => {
            console.log("ADD-UPDATE RESPONSE", res);

            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: tokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((error) => console.log(error));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register/complete" component={RegisterCompletePage} />
        <Route path="/forgot/password" component={ForgotPasswordPage} />
        <UserPrivateRoute
          path="/user/dashboard"
          component={UserDashboardPage}
        />
        <UserPrivateRoute
          path="/user/password-update"
          component={PasswordUpdatePage}
        />
        <UserPrivateRoute path="/user/wishlist" component={WishListPage} />
        <AdminRoute path="/admin/dashboard" component={AdminDashboardPage} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdatePage}
        />
        <AdminRoute
          exact
          path="/admin/subCategory"
          component={SubCategoryCreatePage}
        />
        <AdminRoute
          exact
          path="/admin/subCategory/:slug"
          component={SubCategoryUpdatePage}
        />
        <AdminRoute exact path="/admin/product" component={ProductCreatePage} />
      </Switch>
    </>
  );
}

export default App;

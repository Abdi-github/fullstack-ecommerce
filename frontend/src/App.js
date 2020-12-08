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
import UserHistoryPage from "./pages/user/UserHistoryPage";
import UserPrivateRoute from "./components/routes/UserPrivateRoute";

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
  }, []);
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register/complete" component={RegisterCompletePage} />
        <Route path="/forgot/password" component={ForgotPasswordPage} />
        <UserPrivateRoute path="/user/history" component={UserHistoryPage} />
      </Switch>
    </>
  );
}

export default App;

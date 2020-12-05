import react, { useEffect } from "react";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/HomePage";
import { Switch, Route } from "react-router-dom";
import Header from "./components/nav/Header";
import RegisterCompletePage from "./pages/auth/RegisterCompletePage";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  // Check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const tokenResult = await user.getIdTokenResult();
        console.log("user", user);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: tokenResult.token,
          },
        });
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
      </Switch>
    </>
  );
}

export default App;

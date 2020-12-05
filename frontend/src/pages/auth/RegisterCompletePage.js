import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const RegisterCompletePage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // console.log(window.localStorage.getItem("emailForRegistration"));
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      console.log("RESULT", result);
      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        // console.log(user);
        await user.updatePassword(password);
        const tokenResult = await user.getIdTokenResult();
        // redux store
        console.log("user", user, "tokenResult", tokenResult);
        // redirect
        props.history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <ToastContainer />
          <h4>Complete Registration</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control mb-3"
              value={email}
              disabled
            />

            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              autoFocus
            />

            <button type="submit" className="btn btn-raised btn-block mt-3">
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompletePage;

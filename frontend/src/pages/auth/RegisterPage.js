import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const RegisterPage = ({ history }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`
    );
    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };

  const user = useSelector((state) => state.user);
  const { token } = user;
  useEffect(() => {
    if (token) history.push("/");
  }, [token, history]);

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <ToastContainer />
          <h4>Register</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoFocus
            />

            <button type="submit" className="btn btn-raised btn-block mt-3">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

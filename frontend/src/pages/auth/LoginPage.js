import React, { useEffect, useState } from "react";
import { auth, provider } from "../../firebase";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

import { addUpdateUser } from "../../functions/auth";

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState("enatfikkir@yahoo.com");
  const [password, setPassword] = useState("111111");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/dashboard");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table(email, password);

    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      // console.log(user.email);
      const tokenResult = await user.getIdTokenResult();

      // console.log(tokenResult);
      // console.log(tokenResult.token);

      addUpdateUser(tokenResult.token)
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
          roleBasedRedirect(res);
        })
        .catch((error) => console.log(error));

      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    auth
      .signInWithPopup(provider)
      .then(async (result) => {
        const { user } = result;
        const tokenResult = await user.getIdTokenResult();

        addUpdateUser(tokenResult.token)
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
            roleBasedRedirect(res);
          })
          .catch();
        // history.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const user = useSelector((state) => state.user);
  const { token } = user;
  useEffect(() => {
    if (token) history.push("/");
  }, [token]);

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <ToastContainer />
          {loading ? <Loading /> : <h4>Login</h4>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                autoFocus
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
              />
            </div>

            <br />
            <Button
              onClick={handleSubmit}
              type="primary"
              className="mb-3"
              block
              shape="round"
              icon={<MailOutlined />}
              size="large"
              disabled={!email || password.length < 6}
            >
              Login with Email/Password
            </Button>
            <Button
              onClick={handleGoogleLogin}
              type="danger"
              className="mb-3"
              block
              shape="round"
              icon={<GoogleOutlined />}
              size="large"
            >
              Login with Google
            </Button>

            <Link to="/forgot/password" className="float-right text-danger">
              Forgot Password
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

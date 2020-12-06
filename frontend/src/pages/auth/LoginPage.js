import React, { useState } from "react";
import { auth, provider } from "../../firebase";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState("enatfikkir@yahoo.com");
  const [password, setPassword] = useState("111111");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: tokenResult.token,
        },
      });
      history.push("/");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    auth
      .signInWithPopup(provider)
      .then(async (result) => {
        const { user } = result;
        const tokenResult = await user.getIdTokenResult();
        //   createOrUpdateUser(idTokenResult.token)
        //     .then((res) => {
        //       dispatch({
        //         type: "LOGGED_IN_USER",
        //         payload: {
        //           name: res.data.name,
        //           email: res.data.email,
        //           token: idTokenResult.token,
        //           role: res.data.role,
        //           _id: res.data._id,
        //         },
        //       });
        //       roleBasedRedirect(res);
        //     })
        //     .catch((err) => console.log(err));
        //   // history.push("/");
        // })
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: tokenResult.token,
          },
        });
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

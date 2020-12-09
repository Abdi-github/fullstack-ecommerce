import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../components/Loading";
import UserDashboard from "../../components/nav/UserDashboard";
import { auth } from "../../firebase";

const PasswordUpdatePage = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(password);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password updated");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserDashboard />
        </div>
        <div className="col">
          <ToastContainer />
          {loading ? <Loading /> : <h4>Change Password </h4>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter new password"
                disabled={loading}
                value={password}
              />
              <button
                className="btn btn-primary"
                disabled={!password || password.length < 6 || loading}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdatePage;

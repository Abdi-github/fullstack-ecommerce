import React, { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    //
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

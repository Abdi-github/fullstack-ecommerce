import React from "react";
import UserDashboard from "../../components/nav/UserDashboard";

const UserDashboardPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserDashboard />
        </div>
        <div className="col">user dashboard page</div>
      </div>
    </div>
  );
};

export default UserDashboardPage;

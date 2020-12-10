import React from "react";
import AdminNav from "../../components/nav/AdminNav";

const AdminDashboardPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">admin dashboard page</div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

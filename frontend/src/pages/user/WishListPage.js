import React from "react";
import UserDashboard from "../../components/nav/UserDashboard";

const WishListPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserDashboard />
        </div>
        <div className="col">user wishlist page</div>
      </div>
    </div>
  );
};

export default WishListPage;

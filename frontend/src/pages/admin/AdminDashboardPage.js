import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { getOrders, updateOrderStatus } from "../../functions/admin";
import OrdersAdmin from "../../components/orders/OrdersAdmin";
import { toast } from "react-toastify";

const AdminDashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);
  const { token } = user;
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    updateOrderStatus(orderId, orderStatus, token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-10">
          <h4>Admin Dashboard</h4>
          {/* {JSON.stringify(orders)} */}
          <OrdersAdmin
            orders={orders}
            handleStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

import axios from "axios";

export const getOrders = async (usertoken) =>
  await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      usertoken,
    },
  });

export const updateOrderStatus = async (orderId, orderStatus, usertoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        usertoken,
      },
    }
  );

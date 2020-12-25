import axios from "axios";

export const createCoupon = async (coupon, usertoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {
      headers: {
        usertoken,
      },
    }
  );
};

export const getCoupons = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/coupons`);
};

export const removeCoupon = async (couponId, usertoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${couponId}`, {
    headers: {
      usertoken,
    },
  });

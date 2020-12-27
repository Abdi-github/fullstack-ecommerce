import axios from "axios";

export const userCart = async (cart, usertoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        usertoken,
      },
    }
  );

export const getUserCart = async (usertoken) =>
  await axios.get(
    `${process.env.REACT_APP_API}/user/cart`,

    {
      headers: {
        usertoken,
      },
    }
  );

export const emptyUserCart = async (usertoken) =>
  await axios.delete(
    `${process.env.REACT_APP_API}/user/cart`,

    {
      headers: {
        usertoken,
      },
    }
  );

export const saveUserAddress = async (address, usertoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        usertoken,
      },
    }
  );

export const applyCoupon = async (coupon, usertoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        usertoken,
      },
    }
  );

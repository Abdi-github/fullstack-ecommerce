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

export const createOrder = async (stripeResponse, usertoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        usertoken,
      },
    }
  );

export const getUserOrders = async (usertoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      usertoken,
    },
  });

export const getWishlist = async (usertoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      usertoken,
    },
  });

export const addToWishlist = async (productId, usertoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        usertoken,
      },
    }
  );

export const removeWishlist = async (productId, usertoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        usertoken,
      },
    }
  );

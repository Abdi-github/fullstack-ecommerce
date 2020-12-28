import axios from "axios";

export const createPaymentIntent = async (coupon, usertoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    { coupon },
    {
      headers: {
        usertoken,
      },
    }
  );
};

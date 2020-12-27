import axios from "axios";

export const createPaymentIntent = async (usertoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    {},
    {
      headers: {
        usertoken,
      },
    }
  );
};

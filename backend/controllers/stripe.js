import Product from "../models/product";
import Cart from "../models/cart";
import User from "../models/user";
import Coupon from "../models/coupon";

const stripe = require("stripe")(process.env.STRIPE_SECRET);

export const createPaymentIntent = async (req, res) => {
  // later apply coupon
  // later calculate price

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: "CHF",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

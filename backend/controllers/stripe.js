import Product from "../models/product";
import Cart from "../models/cart";
import User from "../models/user";
import Coupon from "../models/coupon";

const stripe = require("stripe")(process.env.STRIPE_SECRET);

export const createPaymentIntent = async (req, res) => {
  // later apply coupon
  // later calculate price

  // console.log(req.body);
  // return;

  // 1 find user
  const user = await User.findOne({ email: req.user.email }).exec();
  // 2 get user cart total
  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderedBy: user._id,
  }).exec();

  console.log(
    "CART TOTAL",
    cartTotal,
    "-----------AFTER DISCOUNT",
    totalAfterDiscount
  );

  // calculate the total amount after coupon discount

  const { coupon } = req.body;
  let finalAmount;
  if (coupon && totalAfterDiscount) {
    finalAmount = totalAfterDiscount * 100; // finalAmount in cents
  } else {
    finalAmount = cartTotal * 100;
  }

  // create payment intent with order amount and currency

  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount, // cartTotal in cents
    currency: "CHF",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount,
  });
};

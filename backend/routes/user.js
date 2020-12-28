import express from "express";
import {
  userCart,
  getUserCart,
  emptyUserCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  getOrders,
} from "../controllers/user";
import { authVerify } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/user/cart", authVerify, userCart);
router.get("/user/cart", authVerify, getUserCart);
router.delete("/user/cart", authVerify, emptyUserCart);

// Delivery Address
router.post("/user/address", authVerify, saveAddress);

// Coupon
router.post("/user/cart/coupon", authVerify, applyCouponToUserCart);

// Order
router.post("/user/order", authVerify, createOrder);

// Order History of a user
router.get("/user/orders", authVerify, getOrders);

module.exports = router;

import express from "express";
import {
  userCart,
  getUserCart,
  emptyUserCart,
  saveAddress,
} from "../controllers/user";
import { authVerify } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/user/cart", authVerify, userCart);
router.get("/user/cart", authVerify, getUserCart);
router.delete("/user/cart", authVerify, emptyUserCart);
router.post("/user/address", authVerify, saveAddress);

module.exports = router;

import express from "express";
import { getOrders, updateOrderStatus } from "../controllers/admin";
import { adminVerify, authVerify } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/admin/orders", authVerify, adminVerify, getOrders);
router.put("/admin/order-status", authVerify, adminVerify, updateOrderStatus);

module.exports = router;

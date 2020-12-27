import express from "express";
const { createPaymentIntent } = require("../controllers/stripe");
const { authVerify } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create-payment-intent", authVerify, createPaymentIntent);

module.exports = router;

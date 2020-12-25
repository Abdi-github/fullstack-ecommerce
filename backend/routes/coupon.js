import express from "express";
const {
  create,
  getAll,

  remove,
} = require("../controllers/coupon");
const { authVerify, adminVerify } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/coupon", authVerify, adminVerify, create);
router.get("/coupon", getAll);
router.delete("/coupon/:couponId", authVerify, adminVerify, remove);

module.exports = router;

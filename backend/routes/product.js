import express from "express";
const { create } = require("../controllers/product");
const { authVerify, adminVerify } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/product", authVerify, adminVerify, create);

module.exports = router;

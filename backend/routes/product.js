import express from "express";
const { create, getAll, remove } = require("../controllers/product");
const { authVerify, adminVerify } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/product", authVerify, adminVerify, create);
router.get("/products/:count", getAll);
router.delete("/product/:slug", authVerify, adminVerify, remove);

module.exports = router;

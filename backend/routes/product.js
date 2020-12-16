import express from "express";
const {
  create,
  getAll,
  remove,
  getSingleProduct,
  update,
  list,
  TotalProductsCount,
} = require("../controllers/product");
const { authVerify, adminVerify } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/product", authVerify, adminVerify, create);
router.get("/products/total", TotalProductsCount);
router.get("/products/:count", getAll);
router.delete("/product/:slug", authVerify, adminVerify, remove);
router.get("/product/:slug", getSingleProduct);
router.put("/product/:slug", authVerify, adminVerify, update);

router.post("/products", list);

module.exports = router;

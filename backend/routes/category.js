import express from "express";
const {
  create,
  getAll,
  getSingle,
  update,
  remove,
} = require("../controllers/category");
const { authVerify, adminVerify } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/category", authVerify, adminVerify, create);
router.get("/category", getAll);
router.get("/category/:slug", authVerify, adminVerify, getSingle);
router.put("/category", authVerify, adminVerify, update);
router.delete("/category", authVerify, adminVerify, remove);

module.exports = router;

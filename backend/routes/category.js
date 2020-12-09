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
router.get("/categories", getAll);
router.get("/category/:slug", getSingle);
router.put("/category/:slug", authVerify, adminVerify, update);
router.delete("/category/:slug", authVerify, adminVerify, remove);

module.exports = router;

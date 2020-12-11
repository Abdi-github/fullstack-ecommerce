import express from "express";
const {
  create,
  getAll,
  getSingle,
  update,
  remove,
} = require("../controllers/subCategory");
const { authVerify, adminVerify } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/subcategory", authVerify, adminVerify, create);
router.get("/subcategories", getAll);
router.get("/subcategory/:slug", getSingle);
router.put("/subcategory/:slug", authVerify, adminVerify, update);
router.delete("/subcategory/:slug", authVerify, adminVerify, remove);

module.exports = router;

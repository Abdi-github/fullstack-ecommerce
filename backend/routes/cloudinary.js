import express from "express";
const { uploadImages, removeImage } = require("../controllers/cloudinary");
const { authVerify, adminVerify } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/uploadimages", authVerify, adminVerify, uploadImages);

router.post("/removeimage", authVerify, adminVerify, removeImage);

module.exports = router;

import express from "express";
import { addUpdateUser, currentUser } from "../controllers/auth";
import { adminVerify, authVerify } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/add-update-user", authVerify, addUpdateUser);
router.post("/current-user", authVerify, currentUser);
router.post("/current-admin", authVerify, adminVerify, currentUser);

module.exports = router;

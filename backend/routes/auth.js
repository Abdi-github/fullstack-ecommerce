import express from "express";
import { addUpdateUser, currentUser } from "../controllers/auth";
import { adminVerify, authVerify } from "../middlewares/authMiddleware";

const authRouter = express.Router();

authRouter.post("/add-update-user", authVerify, addUpdateUser);
authRouter.post("/current-user", authVerify, currentUser);
authRouter.post("/current-admin", authVerify, adminVerify, currentUser);

module.exports = authRouter;

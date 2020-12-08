import express from "express";
import { addUpdateUser, currentUser } from "../controllers/auth";
import { authVerify } from "../middlewares/authMiddleware";

const authRouter = express.Router();

authRouter.post("/add-update-user", authVerify, addUpdateUser);
authRouter.post("/current-user", authVerify, currentUser);

module.exports = authRouter;

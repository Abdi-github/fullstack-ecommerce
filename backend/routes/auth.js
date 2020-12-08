import express from "express";
import { addUpdateUser } from "../controllers/auth";
import { authVerify } from "../middlewares/authMiddleware";

const authRouter = express.Router();

authRouter.post("/add-update-user", authVerify, addUpdateUser);

module.exports = authRouter;

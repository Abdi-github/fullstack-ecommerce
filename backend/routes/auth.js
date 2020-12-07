import express from "express";
import { addUpdateUser } from "../controllers/auth";

const authRouter = express.Router();

authRouter.get("/add-update-user", addUpdateUser);

module.exports = authRouter;

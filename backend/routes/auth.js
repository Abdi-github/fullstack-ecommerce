import express from "express";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.json({ message: "API END POINT" });
});

module.exports = authRouter;

// import dotenv from "dotenv";
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import bodyParser from "body-parser";
// import morgan from "morgan";

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

// import authRouter from "./routes/auth.js";
const authRouter = require("./routes/auth");

// import readdirSync from "fs";

const app = express();

// setup db

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => console.log("DB not connected", error));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

//Routes to check
app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

// routes middleware
// app.use("/api", authRouter);
// ----------- ROUTES AUTOLOADING -------------------
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// port

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

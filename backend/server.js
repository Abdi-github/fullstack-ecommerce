import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

dotenv.config();

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

//Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running",
  });
});

// port

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

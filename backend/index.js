import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js";
import dataRouter from "./routes/data.route.js";

dotenv.config();
const app = express();

app.use(bodyParser.json()); //added after being not body showing undefined when passed from react application. Was workng with postman before this change
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(cookieParser()); //To accept cookies
app.use(cors({ origin: "http://localhost:3000", credentials: true })); //added after getting CORS error


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.listen(3005, () => {
  console.log(`Service is running on port 3005`);
});

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.use("/api/auth", authRouter);
app.use("/api/data", dataRouter);

//Middleware to handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.log("Middleware", req.body);

  return res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message,
  });
});

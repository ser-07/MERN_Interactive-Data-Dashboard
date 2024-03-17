import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js";
import dataRouter from "./routes/data.route.js";
import path from "path";

dotenv.config();
const app = express();

const __dirname = path.resolve();

app.use(bodyParser.json()); //added after being not body showing undefined when passed from react application. Was workng with postman before this change
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(cookieParser()); //To accept cookies

var corsOptions = {
  origin: [process.env.ALLOWED_CLIENT_URL ,"http://localhost:3000"],
  credentials: true
  }

// app.use(cors({ origin: process.env.ALLOWED_CLIENT_URL, credentials: true })); //added after getting CORS error
// app.use(cors());
app.use(cors(corsOptions)); //added after getting CORS error


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

//Addign this line for build and deployment - https://create-react-app.dev/docs/deployment/
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});


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

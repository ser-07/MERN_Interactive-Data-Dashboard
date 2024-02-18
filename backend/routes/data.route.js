import express from "express";
import { fetchData } from "../controllers/data.controller.js";
import { verifyToken } from "../utils/verify.user.js";

const router = express.Router();

//Pass the request first to verify token middleware to verify user validity and then pass to fetchData
router.get("/fetchdata", verifyToken, fetchData);

export default router;

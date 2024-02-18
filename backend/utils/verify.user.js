import { errorHandler } from "./errors.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("cookie", req.cookies);
  // const token = req.cookie.access_token;
  const token = req.cookies.access_token;

  //If no token exists, return unauthrozed
  if (!token) return next(errorHandler(401, "Unauthorized!"));

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return next(errorHandler(403, "Forbidden"));

    req.user = user; // {id: 12454x} access req.user.id in the next middleware
    next(); //transfer to the next middleware - updateUser
  });
};

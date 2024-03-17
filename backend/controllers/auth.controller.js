import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errors.js";

export const signup = async (req, res, next) => {
  //Get req.body from UI
  console.log(req.body);
  const { username, email, password } = req.body;
  console.log("Here", username, email, password);
  const hashedPassword = bcryptjs.hashSync(password, 10);
  console.log(hashedPassword);

  // const newUser = new User({username, email, password:hashedPassword, crede})
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    // res.status(500).json(error.message);
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    console.log("here", email, password);
    //Check if the entered data exists, else return false to redirect to signUp page in UI
    const doesEmailExists = await User.findOne({ email: email });
    if (!doesEmailExists) return next(errorHandler(404, "User not found!"));

    // const doesUsernameExists = await User.findOne({username: username});
    // if(!doesUsernameExists) return next(errorHandler(404, 'User not found!'));

    const checkPassword = bcryptjs.compareSync(
      password,
      doesEmailExists.password
    );
    if (!checkPassword) return next(errorHandler(401, "Invalid Password!"));

    //Create a token to store user creds in brower:
    const token = jwt.sign({ id: doesEmailExists._id }, process.env.JWT_SECRET);

    //remove password from the user object returned by mongo before sending the response
    const { password: pass, ...rest } = doesEmailExists._doc;

    res
      .cookie("access_token", token, {
        httpOnly: false,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json(rest);
    //set({'Access-Control-Allow-Origin':'http://localhost:3000/'}).
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  //For Signout we just need to clear the cookie from backend and remove the currentUser from redux state in frontend
  try {
    res.clearCookie("access_token", {
      httpOnly: false,
      sameSite: "none",
      secure: true,
    });
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

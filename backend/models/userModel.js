import mongoose from "mongoose";

//Create Schema - https://mongoosejs.com/docs/models.html
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png",
    },
  },
  { timestamps: true }
);

//Create model with the above created schema
const User = mongoose.model("User", userSchema);

//Export so that we an use this model to add Users to DB
export default User;

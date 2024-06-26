import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    if(!newUser){
      return next(createError(404, "Please provide required fields"));
    }

   const user = await newUser.save();
   const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT
  );
  const { password, isAdmin, ...other } = user._doc;
  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json({ ...other , message:"User created successfully" });
    // res.status(200).send({user:user , message: "User created successfully"});
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword) return next(createError(400, "Wrong Credentials"));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...other } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...other });
  } catch (err) {
    next(err);
  }
};

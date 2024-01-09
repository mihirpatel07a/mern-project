import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  var user = await User.findOne({ email: req.body.email });

  if (user) {
    return res
      .status(200)
      .json({ message: "User already Exist", success: false });
  }
  const username = req.body.username;

  const email = req.body.email;
  const pass = req.body.password;

  // hashing the password
  const hashedPassword = bcryptjs.hashSync(pass, 10);

  // create new user
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(200).send({ message: "Registration successful", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      meaasge: `Register Controller ${error.message}`,
    });
   
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    // Check that user with email exists or not
    if (!validUser) return next(errorHandler(404, "User Not Found!"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    // Check password is correct or not
    if (!validPassword) return next(errorHandler(401, "Wrong Password!"));

    // If both email and password are correct then we create token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    // Save token as cookie
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

import userModel from "../models/userModel.js"; // Import the user model
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
// SignUp Controller

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Validation
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 8 characters",
        });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    // Hash password and save user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    const token = createToken(savedUser._id);

    // Send back the user data and token
    res.status(201).json({
      success: true,
      user: { id: savedUser._id, name: savedUser.name, email: savedUser.email },
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Registration failed",
        error: error.message,
      });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);

    // Send both user info and token
    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.json({ success: false, error });
  }
};


// Fetch All Users Controller
export const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

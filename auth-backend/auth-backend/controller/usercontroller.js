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

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    if (!password.length > 8) {
      res.json({ success: false, message: "Enter Strong Password" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter correct email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPasword,
      // Ensure to hash the password in production
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
    
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to register user", details: error.message });
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

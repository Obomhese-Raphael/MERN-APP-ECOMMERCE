import jwt from "jsonwebtoken";
import validator from "validator";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const verifyToken = async (req, res) => {
  try {
    // If authUser middleware passed, the token is valid
    res.status(200).json({
      success: true,
      message: "Token is valid",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Token verification failed",
      error: error.message,
    });
  }
};

// Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    // 1. Validate input
    if (!name || !email || !password || !passwordConfirm) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide a valid email",
      });
    }

    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        status: "fail",
        message:
          "Password must contain at least 8 characters, including uppercase, lowercase, and a number",
      });
    }

    // 2. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "fail",
        message: "Email already in use",
      });
    }

    // 3. Create new user (password automatically hashed by pre-save hook)
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    // 4. Generate JWT token
    const token = createToken(newUser._id);

    // 5. Send response (without password)
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
    });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong during registration",
    });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }

    // 2. Check if user exists and password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    // 3. Generate token
    const token = createToken(user._id);

    // 4. Send response
    res.status(200).json({
      status: "success",
      token,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong during login",
    });
  }
};

// Route for Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check against .env credentials
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // 2. Find or create the admin user
      let adminUser = await User.findOneAndUpdate(
        { email },
        {
          $setOnInsert: {
            name: "System Admin",
            password: await bcrypt.hash(password, 12),
            isAdmin: true,
          },
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );

      // 3. Generate token
      const token = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET);

      return res.json({
        success: true,
        message: "Admin logged in successfully",
        token,
      });
    }

    // If .env credentials don't match, check regular admin users
    const adminUser = await User.findOne({ email, isAdmin: true });
    if (
      !adminUser ||
      !(await adminUser.correctPassword(password, adminUser.password))
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    // Generate token for existing admin
    const token = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

// Route for registering a new admin user
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    // 1. Validate input
    if (!name || !email || !password || !passwordConfirm) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide a valid email",
      });
    }

    // You can add more password validation here if needed

    // 2. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "fail",
        message: "Email already in use",
      });
    }

    // 3. Create new admin user
    const newAdminUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
      isAdmin: true, // Set isAdmin to true
    });

    // 4. Generate JWT token
    const token = jwt.sign({ id: newAdminUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "30d",
    });

    // 5. Send response (without password)
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: {
          _id: newAdminUser._id,
          name: newAdminUser.name,
          email: newAdminUser.email,
        },
      },
    });
  } catch (err) {
    console.error("Admin Registration Error:", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong during admin registration",
    });
  }
};

// Route to get all users in the admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password -__v");
    res.json({
      success: true,
      users,
    })
  } catch (error) {
    console.error("Get all users Error: ", error);
    res.status(500).json({
      success: false,
      message: "Server Error (Getting Users): " + error.message,
    })
  }
}
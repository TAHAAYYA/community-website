import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};


// MEMBER SIGNUP
export const signupUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "member",
      approvalStatus: "pending"
    });

    res.status(201).json({
      message: "Signup successful. Waiting for admin approval.",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// MEMBER LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    if (user.approvalStatus !== "approved") {
      return res.status(403).json({
        message: "Your account is not approved yet"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    res.json({
      token: generateToken(user._id),
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// ADMIN LOGIN
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({
      email,
      role: "admin"
    });

    if (!admin) {
      return res.status(401).json({
        message: "Admin not found"
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid admin credentials"
      });
    }

    res.json({
      token: generateToken(admin._id),
      admin
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const createAdmin = async (req, res) => {
  try {
    const existingAdmin = await User.findOne({
      email: "admin@verdant.com"
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists"
      });
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@verdant.com",
      password: hashedPassword,
      phone: "9999999999",
      role: "admin",
      approvalStatus: "approved"
    });

    res.json({
      message: "Admin created successfully",
      admin
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
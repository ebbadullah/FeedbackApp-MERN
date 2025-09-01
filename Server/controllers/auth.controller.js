import Admin from "../models/admin.model.js";
import { generateToken } from "../Config/jwt.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Reset admin password function
export const resetAdminPassword = async (req, res, next) => {
  try {
    // Use the native MongoDB driver to bypass Mongoose middleware
    const adminCollection = mongoose.connection.collection("admins");

    // Find the admin user
    const admin = await Admin.findOne({ email: "ebad@gmail.com" });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin user not found",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("admin", 10);

    // Update the password directly in the database to bypass the pre-save hook
    await adminCollection.updateOne(
      { _id: admin._id },
      { $set: { password: hashedPassword } }
    );

    return res.status(200).json({
      success: true,
      message:
        "Admin password reset successfully. You can now login with email: ebad@gmail.com and password: admin",
    });
  } catch (error) {
    next(error);
  }
};

// Login admin function
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Find admin
    const admin = await Admin.findOne({ email: normalizedEmail });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(admin);

    // Send response
    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

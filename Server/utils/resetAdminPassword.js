import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/admin.model.js";

dotenv.config();

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPlainPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPlainPassword) {
      throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD is missing in .env file");
    }

    const admin = await Admin.findOne({ email: adminEmail });

    const hashedPassword = await bcrypt.hash(adminPlainPassword, 12);

    if (!admin) {
      console.log("Admin not found. Creating new admin...");
      const newAdmin = await Admin.create({
        email: adminEmail,
        password: hashedPassword,
      });
      console.log("New admin created:", {
        email: newAdmin.email,
        passwordHash: newAdmin.password,
      });
    } else {
      admin.password = hashedPassword;
      await admin.save();
      console.log("Password reset for:", {
        email: admin.email,
        newPasswordHash: admin.password,
      });
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("Error in resetAdminPassword:", error);
    process.exit(1);
  }
};

resetAdminPassword();

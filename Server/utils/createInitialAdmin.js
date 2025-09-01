import dotenv from "dotenv";
import Admin from "../models/admin.model.js";

dotenv.config();

const createInitialAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();

    if (adminCount === 0) {
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (!adminEmail || !adminPassword) {
        throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD is missing in .env file");
      }

      const newAdmin = await Admin.create({
        email: adminEmail,
        password: adminPassword, // Will be hashed by pre-save hook
      });

      console.log(`Initial admin created with email: ${adminEmail}`);
    }
  } catch (error) {
    console.error("Error creating initial admin:", error.message);
  }
};

export default createInitialAdmin;

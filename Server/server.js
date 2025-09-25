import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import feedbackRoutes from "./routes/feedback.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import connectDB from "./Config/database.js";
import createInitialAdmin from "./utils/createInitialAdmin.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://techzone-learning-feedbackapp.netlify.app", // deployed frontend
  "https://*.netlify.app" // allow all netlify subdomains
];

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else if (origin && origin.endsWith('.netlify.app')) {
        // Allow any netlify.app subdomain
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Feedback System API is running!",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString()
  });
});

// Start server function
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("MongoDB connected successfully");

    // Create initial admin if needed
    await createInitialAdmin();

    // Routes
    app.use("/api/feedback", feedbackRoutes);
    app.use("/api/admin/feedbacks", feedbackRoutes);
    app.use("/api/admin", authRoutes);

    // Error handler
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();

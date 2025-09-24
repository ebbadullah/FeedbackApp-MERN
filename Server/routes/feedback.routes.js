import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import {
  createFeedback,
  getAllFeedbacks,
  getDashboardStats,
  exportFeedbacks,
} from "../controllers/feedback.controller.js";

const router = express.Router();

// Public routes
router.post("/", createFeedback);

// Protected routes
router.get("/", authenticateToken, getAllFeedbacks);
router.get("/stats", authenticateToken, getDashboardStats);
router.get("/export", authenticateToken, exportFeedbacks);

export default router;

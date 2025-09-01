import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import {
  createFeedback,
  getAllFeedbacks,
  exportFeedbacks,
} from "../controllers/feedback.controller.js";

const router = express.Router();

// Public routes
router.post("/", createFeedback);

// Protected routes
router.get("/", authenticateToken, getAllFeedbacks);
router.get("/export", authenticateToken, exportFeedbacks);

export default router;

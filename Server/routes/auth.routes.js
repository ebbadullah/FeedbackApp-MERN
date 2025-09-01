import express from "express";
import {
  loginAdmin,
  resetAdminPassword,
} from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import {
  getAllFeedbacks,
  exportFeedbacks,
} from "../controllers/feedback.controller.js";

const router = express.Router();

// Auth routes
router.post("/login", loginAdmin);
router.get("/reset-password", resetAdminPassword);

// Feedback routes (protected)
router.get("/feedbacks", authenticateToken, getAllFeedbacks);
router.get("/feedbacks/export", authenticateToken, exportFeedbacks);

export default router;

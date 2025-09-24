import express from "express";
import {  loginAdmin,  resetAdminPassword,} from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import {  getAllFeedbacks, exportFeedbacks, getDashboardStats,} from "../controllers/feedback.controller.js";


const router = express.Router();

router.post("/login", loginAdmin);
router.get("/reset-password", resetAdminPassword);

router.get("/feedbacks", authenticateToken, getAllFeedbacks);
router.get("/feedbacks/stats", authenticateToken, getDashboardStats);
router.get("/feedbacks/export", authenticateToken, exportFeedbacks);

export default router;

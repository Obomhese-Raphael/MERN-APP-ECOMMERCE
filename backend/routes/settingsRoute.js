// routes/settingsRoutes.js
import express from "express";
import {
  getSettings,
  updateSettings,
} from "../controllers/settingsController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", adminAuth, getSettings);
router.put("/", adminAuth, updateSettings);

export default router;

import express from "express";
import { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController} from "../controllers/userCtrl.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// routes
router.post("/login", loginController) //Login
router.post("/register", registerController) //Register

// Auth
router.post("/getUserData", authMiddleware, authController);

// Apply Doctor
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// Notification Doctor
router.post("/get-all-notification", authMiddleware, getAllNotificationController);

// Notification Doctor
router.post("/delete-all-notification", authMiddleware, deleteAllNotificationController);

export default router;
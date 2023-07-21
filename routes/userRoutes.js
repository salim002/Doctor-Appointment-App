import express from "express";
import { loginController, registerController, authController, applyDoctorController } from "../controllers/userCtrl.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// routes
router.post("/login", loginController) //Login
router.post("/register", registerController) //Register

// Auth
router.post("/getUserData", authMiddleware, authController);

// Apply Doctor
router.post("/apply-doctor", authMiddleware, applyDoctorController);

export default router;
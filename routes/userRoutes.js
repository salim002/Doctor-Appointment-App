import express from "express";
import { loginController, registerController, authController } from "../controllers/userCtrl.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// routes
router.post("/login", loginController) //Login
router.post("/register", registerController) //Register

// Auth
router.post("/getUserData", authMiddleware, authController);

export default router;
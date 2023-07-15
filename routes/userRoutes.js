import express from "express";
import { loginController, registerController } from "../controllers/userCtrl.js";

const router = express.Router();

// routes
router.post("/login", loginController) //Login
router.post("/register", registerController) //Register

export default router;
import express from "express";
const router = express.Router();

import authMiddleware from "../middlewares/authMiddleware.js";
import {getDoctorInfoController} from "../controllers/doctorCtrl.js";

router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);


export default router;
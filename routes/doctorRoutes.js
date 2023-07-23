import express from "express";
const router = express.Router();

import authMiddleware from "../middlewares/authMiddleware.js";
import {getDoctorInfoController, updateProfileController, getDoctorByIdController} from "../controllers/doctorCtrl.js";

router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

router.post("/updateProfile", authMiddleware, updateProfileController);

router.post("/getDoctorById", authMiddleware, getDoctorByIdController);


export default router;
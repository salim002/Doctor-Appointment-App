import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/authMiddleware.js";

import {getAllUserController, getAllDcotrorsController, changeAccountStatusController} from "../controllers/adminCtrl.js";

router.get("/getAllUsers", authMiddleware, getAllUserController);


router.get("/getAllDoctors", authMiddleware, getAllDcotrorsController);

router.post("/changeAccountStatus", authMiddleware, changeAccountStatusController)

export default router;
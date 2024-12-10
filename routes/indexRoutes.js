import express from "express";

import userRoutes from "./userRoutes.js";
import quizRoutes from "./quizRoutes.js";
import appoinmentRoutes from "./appoinmentRoutes.js";
import examRoutes from "./examRoutes.js"

const router = express.Router();

router.use("/user", userRoutes);
router.use("/quiz", quizRoutes);
router.use("/appoinment", appoinmentRoutes)
router.use("/exam", examRoutes)



export default router;
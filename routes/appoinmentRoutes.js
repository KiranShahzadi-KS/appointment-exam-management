import express from "express";
import { bookAppointment, createTimeSlots, getAvailableTimeSlots } from "../controllers/appoinmentController.js";

const router = express.Router();

// Register route
router.post("/time-slots", createTimeSlots );
router.post("/booking", bookAppointment);
router.get("/", getAvailableTimeSlots)



export default router;

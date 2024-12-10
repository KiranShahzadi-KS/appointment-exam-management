import express from "express";
import { bookExamSlot, createExam, getExamByDateTime } from "../controllers/examController.js";

const router = express.Router();

// Route to create an exam
router.post("/create", createExam);

// Route to book a time slot
router.post("/book", bookExamSlot);

// Route to get exams by date and time
router.get("/", getExamByDateTime);

export default router;

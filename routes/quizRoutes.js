import express from "express";
import { createQuiz, getQuizQuestion, submitQuizAnswer } from "../controllers/quizController.js";

const router = express.Router();

// Register route
router.post("/create", createQuiz);

router.get("/question", getQuizQuestion);

router.post("/answer", submitQuizAnswer);

export default router;

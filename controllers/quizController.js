import User from "../models/userModel.js";
import Quiz from "../models/quizModel.js";

// Create a quiz
export const createQuiz = async (req, res) => {
  try {
    const { question, options, answer, images, category } = req.body;

    const newQuiz = new Quiz({
      question,
      options,
      answer,
      images,
      category,
    });

    await newQuiz.save();

    res.status(201).json({
      message: "Quiz created successfully.",
      quiz: newQuiz,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get a quiz question
export const getQuizQuestion = async (req, res) => {
  try {
    const quiz = await Quiz.aggregate([{ $sample: { size: 1 } }]);

    if (!quiz.length) {
      return res.status(404).json({ message: "No quiz questions available." });
    }

    res.status(200).json({
      message: "Quiz question fetched successfully.",
      question: quiz[0].question,
      options: quiz[0].options,
      quizId: quiz[0]._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Submit a quiz answer
export const submitQuizAnswer = async (req, res) => {
  try {
    const { quizId, selectedOption, userId } = req.body;

    // Validate request body
    if (!quizId || !selectedOption || !userId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Fetch the quiz question by its ID
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz question not found." });
    }

    // Check if the selected option matches the correct answer
    const isCorrect = selectedOption === quiz.answer;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Validate selectedOption against quiz options
    if (!quiz.options.includes(selectedOption)) {
      return res
        .status(400)
        .json({ message: "Selected option is not valid for this quiz." });
    }

    // Store the quiz result in the user's record
    const quizResult = {
      quizId: quiz._id,
      answer: selectedOption,
      isCorrect: isCorrect,
    };

    // Add the quiz result to the user's quizResults array
    user.quizResults.push(quizResult);

    // Save the user record with the updated quiz results
    await user.save();

    // Send the response
    res.status(200).json({
      message: isCorrect ? "Correct answer!" : "Incorrect answer.",
      isCorrect: isCorrect,
      quizResult: quizResult,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

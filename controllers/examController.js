import { Exam } from "../models/examModel.js";

// Create Exam
export const createExam = async (req, res) => {
  const { examType, date, timeSlot } = req.body;

  try {
    // Create a new exam
    const newExam = new Exam({
      examType,
      slots: [
        {
          date,
          timeSlot,
          examType,
          usersBooked: [],
        },
      ],
    });

    // Save the exam to the database
    await newExam.save();

    res.status(201).json({
      message: "Exam created successfully.",
      exam: newExam,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating exam.",
      error: error.message,
    });
  }
};


// Book Exam Slot
export const bookExamSlot = async (req, res) => {
    const { examId, timeSlotId, userId } = req.body;
  
    try {
      // Find the exam by ID
      const exam = await Exam.findById(examId);
      if (!exam) {
        return res.status(404).json({ message: "Exam not found." });
      }
  
      // Find the time slot by ID
      const slot = exam.slots.id(timeSlotId);
      if (!slot) {
        return res.status(404).json({ message: "Time slot not found." });
      }
  
      // Add the user to the usersBooked array
      if (!slot.usersBooked.includes(userId)) {
        slot.usersBooked.push(userId);
        await exam.save();
        res.status(200).json({ message: "Time slot booked successfully.", slot });
      } else {
        res.status(400).json({ message: "User already booked for this slot." });
      }
    } catch (error) {
      res.status(500).json({ message: "Error booking time slot.", error: error.message });
    }
  };

  
// Get Exams on a Given Date and Time
export const getExamByDateTime = async (req, res) => {
    const { date, timeSlot } = req.query;
  
    try {
      // Find the exams that match the date and timeSlot
      const exams = await Exam.find({
        "slots.date": new Date(date),
        "slots.timeSlot": timeSlot,
      })
        .populate({
          path: "slots.usersBooked",
          select: "-quizResults", // Exclude quizResults from the population
        });
  
      if (exams.length === 0) {
        return res.status(404).json({ message: "No exams found for the given date and time." });
      }
  
      res.status(200).json({
        message: "Exams retrieved successfully.",
        exams,
      });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving exams.", error: error.message });
    }
  };
  

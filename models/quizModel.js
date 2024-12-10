import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      validate: {
        validator: function (val) {
          return val.length === 3; 
        },
        message: "Exactly 3 options are required.",
      },
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    images: {
      type: [String], 
    },
    category: {
      type: String,
      enum: ["signals", "traffic", "vehicle"],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;

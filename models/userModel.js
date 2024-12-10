import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    drivingLicense: {
      type: String,
      enum: ["no", "yes"],
      required: true,
    },
    userType: {
      type: String,
      enum: ["public", "private"],
      required: true,
    },
    quizResults: [
      {
        quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
        answer: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;

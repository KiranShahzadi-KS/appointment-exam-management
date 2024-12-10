import mongoose from "mongoose";

const examSlotSchema = new mongoose.Schema(
  {
    examType: {
      type: String,
      enum: ["Tout", "Code", "Creneau", "Circuit"],
      required: true,
    },
    date: {
      type: Date,
      required: true, 
    },
    timeSlot: {
      type: String, 
      required: true,
    },
    usersBooked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
      }
    ],
  },
  {
    timestamps: true,
  }
);


const examSchema = new mongoose.Schema(
  {
    examType: {
      type: String,
      enum: ["Tout", "Code", "Creneau", "Circuit"],
      required: true,
    },
    slots: [examSlotSchema], 
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.model("Exam", examSchema);
const ExamSlot = mongoose.model("ExamSlot", examSlotSchema);

export { Exam, ExamSlot };

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timeSlotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TimeSlot",
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;

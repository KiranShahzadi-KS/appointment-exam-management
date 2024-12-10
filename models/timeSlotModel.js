import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String, 
    required: true,
  },
  endTime: {
    type: String, 
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false, 
  },
});

const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);
export default TimeSlot;

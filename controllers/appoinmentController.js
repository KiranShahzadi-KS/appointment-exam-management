import TimeSlot from "../models/timeSlotModel.js";
import Appointment from "../models/appoinmentModel.js";


// CREATE TIME SLOTS
export const createTimeSlots = async (req, res) => {
  const { date, slots } = req.body;

  try {
    const timeSlots = slots.map(slot => ({
      date,
      startTime: slot.startTime,
      endTime: slot.endTime,
    }));

    const createdSlots = await TimeSlot.insertMany(timeSlots);
    res.status(201).json({ message: "Time slots created successfully.", createdSlots });
  } catch (error) {
    res.status(500).json({ message: "Error creating time slots.", error: error.message });
  }
};


// BOOK APPOINMENTS
export const bookAppointment = async (req, res) => {
    const { timeSlotId, userId } = req.body;
  
    try {
      // Check if the time slot exists
      const timeSlot = await TimeSlot.findById(timeSlotId);
      if (!timeSlot) {
        return res.status(404).json({ message: "Time slot not found." });
      }
  
      // Check if the time slot is already booked
      if (timeSlot.isBooked) {
        return res.status(409).json({ message: "Time slot is already booked." });
      }
  
      // Create a new appointment
      const appointment = new Appointment({
        userId,
        timeSlotId
      });
  
      // Save the appointment
      await appointment.save();
  
      // Mark the time slot as booked
      timeSlot.isBooked = true;
      await timeSlot.save();
  
      // Populate the user and time slot details in the response
      const populatedAppointment = await Appointment.findById(appointment._id)
        .populate("userId", "name email address userType") 
        .populate("timeSlotId", "startTime endTime date"); 
  
      // Return the response with populated appointment data
      res.status(201).json({
        message: "Appointment booked successfully.",
        appointment: populatedAppointment,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error booking appointment.",
        error: error.message,
      });
    }
  };
  


// Get all time slots
export const getAvailableTimeSlots = async (req, res) => {
    const { date } = req.query; // Extract date from the query string
  
    // Check if date is provided
    if (!date) {
      return res.status(400).json({ message: "Date query parameter is required." });
    }
  
    try {
      // Create the start and end date range for the requested date
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999); 
  
      // Find time slots within the day and not booked
      const availableSlots = await TimeSlot.find({
        date: { $gte: startOfDay, $lt: endOfDay },
        isBooked: false,
      });
  
      // Send the response
      res.status(200).json({ message: "Available time slots retrieved.", availableSlots });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving time slots.", error: error.message });
    }
  };
  
  

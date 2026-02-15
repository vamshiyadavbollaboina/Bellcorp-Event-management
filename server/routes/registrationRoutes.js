const express = require("express");
const protect = require("../middleware/protect");
const Registration = require("../Models/Registration");
const Event = require("../Models/Event");

const router = express.Router();

router.post("/:eventId", protect, async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const already = await Registration.findOne({
      user: req.user._id,
      event: event._id
    });

    if (already) {
      return res.status(400).json({ message: "Already registered for this event" });
    }

    const count = await Registration.countDocuments({ event: event._id });
    if (count >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    await Registration.create({
      user: req.user._id,
      event: event._id
    });

    res.json({ message: "Registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error occurred during registration" });
  }
});

router.get("/my/events", protect, async (req, res) => {
  try {
    const regs = await Registration.find({ user: req.user._id }).populate("event");
    res.json(regs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your events" });
  }
});

router.delete("/:eventId", protect, async (req, res) => {
  try {
    const { eventId } = req.params;
    const deletedReg = await Registration.findOneAndDelete({
      user: req.user._id,
      event: eventId,     
    });

    if (!deletedReg) {
      return res.status(404).json({ message: "No registration found to cancel." });
    }

    res.json({ message: "Registration cancelled successfully" });
  } catch (error) {
    console.error("Cancellation Error:", error);
    res.status(500).json({ message: "Server error during cancellation" });
  }
});

module.exports = router;
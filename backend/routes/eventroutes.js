const express = require("express");
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require("@/controllers/eventController");
const { protect, adminOrOrganizer } = require("@/middlewares/authMiddleware");

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", protect, adminOrOrganizer, createEvent);
router.put("/:id", protect, adminOrOrganizer, updateEvent);
router.delete("/:id", protect, adminOrOrganizer, deleteEvent);

module.exports = router;

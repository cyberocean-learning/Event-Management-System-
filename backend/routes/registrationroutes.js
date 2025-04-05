const express = require("express");
const { getAllRegistrations, getRegistrationsByEvent, getUserRegistrations, createRegistration, updateRegistrationStatus, cancelRegistration } = require("@/controllers/registrationController");
const { protect, adminOnly } = require("@/middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, adminOnly, getAllRegistrations);
router.get("/event/:eventId", protect, getRegistrationsByEvent);
router.get("/user/:userId", protect, getUserRegistrations);
router.post("/", protect, createRegistration);
router.put("/:id", protect, adminOnly, updateRegistrationStatus);
router.delete("/:id", protect, cancelRegistration);

module.exports = router;

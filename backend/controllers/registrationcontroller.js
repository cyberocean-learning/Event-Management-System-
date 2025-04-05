const Registration = require("../models/Registration");
const Event = require("../models/Event");


exports.getAllRegistrations = async (req, res) => {
    try {
        if (req.user.role !== "admin") return res.status(403).json({ message: "Accès refusé" });

        const registrations = await Registration.find().populate("eventId userId", "title name email");
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getRegistrationsByEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).json({ message: "Événement non trouvé" });

        if (req.user.role !== "admin" && event.organizerId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Accès refusé" });
        }

        const registrations = await Registration.find({ eventId: req.params.eventId }).populate("userId", "name email");
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getUserRegistrations = async (req, res) => {
    try {
        if (req.user.role !== "admin" && req.user.id !== req.params.userId) {
            return res.status(403).json({ message: "Accès refusé" });
        }

        const registrations = await Registration.find({ userId: req.params.userId }).populate("eventId", "title startDate");
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.createRegistration = async (req, res) => {
    try {
        const { eventId } = req.body;

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Événement non trouvé" });

        const existingRegistration = await Registration.findOne({ eventId, userId: req.user.id });
        if (existingRegistration) return res.status(400).json({ message: "Déjà inscrit à cet événement" });

        const registration = new Registration({
            eventId,
            userId: req.user.id,
            status: "pending",
        });

        await registration.save();
        res.status(201).json(registration);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateRegistrationStatus = async (req, res) => {
    try {
        if (req.user.role !== "admin") return res.status(403).json({ message: "Accès refusé" });

        const registration = await Registration.findById(req.params.id);
        if (!registration) return res.status(404).json({ message: "Inscription non trouvée" });

        registration.status = req.body.status;
        await registration.save();
        res.json(registration);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.cancelRegistration = async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);
        if (!registration) return res.status(404).json({ message: "Inscription non trouvée" });

        if (req.user.role !== "admin" && registration.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Accès refusé" });
        }

        await registration.deleteOne();
        res.json({ message: "Inscription annulée" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

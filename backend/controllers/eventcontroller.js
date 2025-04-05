const Event = require("../models/Event");


exports.getEvents = async (req, res) => {
    try {
        const filters = {};
        if (req.query.category) filters.category = req.query.category;
        if (req.query.status) filters.status = req.query.status;
        
        const events = await Event.find(filters).populate("organizerId", "name email");
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate("organizerId", "name email");
        if (!event) return res.status(404).json({ message: "Événement non trouvé" });

        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.createEvent = async (req, res) => {
    try {
        if (req.user.role !== "organizer" && req.user.role !== "admin") {
            return res.status(403).json({ message: "Accès refusé" });
        }

        const event = new Event({ ...req.body, organizerId: req.user.id });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Événement non trouvé" });

        if (req.user.role !== "admin" && event.organizerId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Accès refusé" });
        }

        Object.assign(event, req.body);
        await event.save();
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Événement non trouvé" });

        if (req.user.role !== "admin" && event.organizerId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Accès refusé" });
        }

        await event.deleteOne();
        res.json({ message: "Événement supprimé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        location: { type: String, required: true },
        capacity: { type: Number },
        category: {
            type: String,
            enum: ["conference", "workshop", "seminar", "other"],
            required: true,
        },
        organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        image: { type: String },
        status: {
            type: String,
            enum: ["upcoming", "ongoing", "completed", "canceled"],
            default: "upcoming",
        },
        price: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

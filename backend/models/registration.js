const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
    {
        eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        status: {
            type: String,
            enum: ["pending", "confirmed", "canceled"],
            default: "pending",
        },
        registrationDate: { type: Date, default: Date.now },
        paymentStatus: {
            type: String,
            enum: ["pending", "completed", "refunded"],
            default: "pending",
        },
        notes: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    role: { type: String, enum: ["admin", "organizer", "attendee"], default: "attendee" },
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("User", UserSchema);

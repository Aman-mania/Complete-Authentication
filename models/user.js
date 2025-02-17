import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    pass: { type: String, required: true, trim: true },
    tc: { type: Boolean, required: true }
});

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link contact to user
    createdAt: { type: Date, default: Date.now }
});

// Models
const UserModel = mongoose.model("user", userSchema);
const ContactModel = mongoose.model("contact", contactSchema);

export default UserModel;
export { UserModel, ContactModel };

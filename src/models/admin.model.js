import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // If you wish to include a role field, you can:
    role: { type: String, default: "admin" },
});

const AdminModel = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export default AdminModel;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,  // Changed to String
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    catData: {
        type: Object,
        default: {}
    }
}, { minimize: false });

const userModel = mongoose.model("user", userSchema);

export default userModel;
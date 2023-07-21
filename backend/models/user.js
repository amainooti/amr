import mongoose from "mongoose";
import Admin from "./admin.js";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: ["Please insert a first name", true],

    },
    lastName: {
        type: String,
        required: ["Please insert a last name", true],

    },
    email: {
        type: String,
        required: ["Please input an email", true],
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
    },
    password: {
        type: String,
        required: ["Please enter a valid password", true]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    status: {
        type: String,
        enum: ["approved", "declined", "in progress"],
        default: "in progress"
    },
      messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }],


}, {timestamps: true})





const User = mongoose.model('User', userSchema);
export default User;

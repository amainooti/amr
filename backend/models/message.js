import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["unread", "read"],
        default: "unread",
    },
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;

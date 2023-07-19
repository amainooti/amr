import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    institutionName: String,
    result: String,
    contact: String,
    courseOfStudy: String,
    applicationReport: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
});



const Application = mongoose.model('Document', applicationSchema);
export default Application;


import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    institutionName: String,
    result: String,
    contact: String,
    courseOfStudy: String,
    application: String
});



const Application = mongoose.model('Document', applicationSchema);
export default Application;


// a.	The Scholarship application form
// Name:
// Institution:
// Upload Results and Transcript

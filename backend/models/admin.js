import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
},)


const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
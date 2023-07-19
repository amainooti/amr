import mongoose from "mongoose";

const businessPartnershipSchema = new mongoose.Schema({
    businessSector: {
        type: String,
        required: [true, "Please provide the business sector"],
    },
    fullName: {
        type: String,
        required: [true, "Please provide your full name"],
    },
    businessDescription: {
        type: String,
        required: [true, "Please provide a business description"],
    },
    businessPlan: {
        type: String,
        required: [true, "Please provide the business plan"],
    },
    contacts: {
        email: {
            type: String,
            required: [true, "Please provide an email address"],
            validate: {
                validator: function (v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email address",
            },
        },
        phoneNumber: {
            type: String,
            required: [true, "Please provide a phone number"],
        },
        address: {
            type: String,
            required: [true, "Please provide an address"],
        },
    },
}, { timestamps: true });

const BusinessPartnership = mongoose.model('BusinessPartnership', businessPartnershipSchema);
export default BusinessPartnership;

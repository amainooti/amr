import Application from "../models/application.js";

//updateApplication, deleteApplication, getApplication, getAllApplication
export const updateApplication = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const updatedFields = req.body;

        // Check if the application exists
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ err: "Application not found" });
        }

        // If the user is not an admin and is trying to update other users' applications
       if (req.user.role !== "admin" && req.user.userId !== application.user.toString()) {
            return res.status(403).json({ err: "Forbidden: Access denied. User can delete only their own applications." });
        }

        // Update the application
        await Application.findByIdAndUpdate(applicationId, updatedFields);

        res.status(200).json({ success: "Application updated successfully." });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};
export const deleteApplication = async (req, res) => {
    try {
        const applicationId = req.params.id;

        // Check if the application exists
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ err: "Application not found" });
        }

        // If the user is not an admin and is trying to delete other users' applications
       if (req.user.role !== "admin" && req.user.userId !== application.user.toString()) {
            return res.status(403).json({ err: "Forbidden: Access denied. User can delete only their own applications." });
        }


        // Delete the application
        await Application.findByIdAndDelete(applicationId);

        res.status(200).json({ success: "Application deleted successfully." });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};


export const getApplication = async (req, res) => {
    try {
        const applicationId = req.params.id;

        // Check if the application exists
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ err: "Application not found" });
        }

        // If the user is not an admin and is trying to access other users' applications
       if (req.user.role !== "admin" && req.user.userId !== application.user.toString()) {
            return res.status(403).json({ err: "Forbidden: Access denied. User can delete only their own applications." });
        }


        res.status(200).json({ application });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

export const getAllApplication = async (req, res) => {
    try {
        // Check if the user is an admin to allow access
        if (req.user.role !== "admin") {
            return res.status(403).json({ err: "Forbidden: Access denied. Only admin users can access this route." });
        }

        const applications = await Application.find();

        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};


export const createApplication = async (req, res) => {
    try {
        // Extract application data from the request body
        const { institutionName, result, contact, courseOfStudy, applicationReport } = req.body;

        // Create a new application document
        const newApplication = new Application({
            institutionName,
            result,
            contact,
            courseOfStudy,
            applicationReport,
            user: req.user.userId // Set the user field to the user's ID from the authenticated request
        });

        await newApplication.save();

        res.status(201).json({ success: "Application created successfully.", application: newApplication });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

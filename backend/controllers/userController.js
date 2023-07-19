import User from "../models/user.js";

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedFields = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ err: "User not found" });
        }

        // If the user is not an admin and is trying to update other users' information
        if (req.user.role !== "admin" && req.user._id.toString() !== userId) {
            return res.status(403).json({ err: "Forbidden: Access denied. User can update only their own information." });
        }

        // Update the user's information
        await User.findByIdAndUpdate(userId, updatedFields);

        res.status(200).json({ success: "User information updated successfully." });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ err: "User not found" });
        }

        // If the user is not an admin and is trying to delete other users
        if (req.user.role !== "admin" && req.user._id.toString() !== userId) {
            return res.status(403).json({ err: "Forbidden: Access denied. User can delete only their own account." });
        }

        // Delete the user
        await User.findByIdAndDelete(userId);

        res.status(200).json({ success: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};
export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ err: "User not found" });
        }

        // If the user is not an admin and is trying to access other users' information
        if (req.user.role !== "admin" && req.user._id.toString() !== userId) {
            return res.status(403).json({ err: "Forbidden: Access denied. User can access only their own information." });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        // Check if the user is an admin to allow access
        if (req.user.role !== "admin") {
            return res.status(403).json({ err: "Forbidden: Access denied. Only admin users can access this route." });
        }

        const users = await User.find();

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

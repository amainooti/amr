import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";


export const signupController = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ err: `Email already exists: ${email}` });
        }

        const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

        const createdUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        });

        res.status(201).json({ createdUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const signinController = async (req, res) => {
    try {
        const { password, email } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ err: `User not found for email: ${email}` });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ err: "Incorrect credentials" });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30days" });
        res.status(200).json({ success: "User logged in successfully.", token: token });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

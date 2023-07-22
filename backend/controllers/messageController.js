import User from "../models/user.js";
import Message from "../models/message.js";

// Controller to create a new message
const createMessage = async (req, res) => {
  try {
    // Get the sender user ID from the request (assuming user is authenticated)
    const senderUserId = req.user.userId;
      console.log("Sender User ID:", senderUserId);

    // Get the recipient admin user ID (for demonstration, you can adapt this part as needed)
    const recipientAdmin = await User.findOne({ role: "admin" });

    if (!recipientAdmin) {
      return res.status(404).json({ message: "No admin user found to receive the message." });
    }

    // Extract the message content from the request
    const { message } = req.body;

    // Create a new message
    const newMessage = new Message({
      from: senderUserId,
      to: recipientAdmin._id,
      message: message,
    });

    // Save the message to the database
    await newMessage.save();

    // Update the sender user's messages field with the new message ID
    await User.findByIdAndUpdate(senderUserId, { $push: { messages: newMessage._id } });

    res.status(201).json({ message: "Message sent successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error sending the message.", error: err });
  }
};

// Controller to get all messages for a user (both sent and received messages)
const getAllUserMessages = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user by ID
    const user = await User.findById(userId).populate("messages");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Extract the user's sent and received messages
    const { messages } = user;

    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving messages.", error: err });
  }
};

// Controller to get all messages for an admin user (only received messages)
const getAllAdminMessages = async (req, res) => {
  try {
    // Get the admin user ID from the request (assuming admin user is authenticated)
    const adminUserId = req.user.id;

    // Find the admin user by ID and populate the received messages
    const adminUser = await User.findById(adminUserId).populate({
      path: "messages",
      match: { to: adminUserId }, // Only populate received messages for the admin
    });

    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found." });
    }

    // Extract the admin user's received messages
    const { messages } = adminUser;

    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving messages.", error: err });
  }
};

export { createMessage, getAllUserMessages, getAllAdminMessages };

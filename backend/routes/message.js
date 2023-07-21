import express from 'express';
const messageRouter = express.Router();
import { createMessage, getAllUserMessages, getAllAdminMessages } from "../controllers/messageController.js";
import protectRoute from "../middleware/protect.js";

// Allow only "admin" users to access the DELETE route for applications
messageRouter.post('/', protectRoute, (req, res) => {
    createMessage(req, res)
        .catch(err => {
            res.status(500).json({ err: err.message });
        });
});


// Allow any user (including "admin" and "user") to access the GET routes for applications
messageRouter.get('/messages/user', protectRoute, (req, res) => {
    getAllUserMessages(req, res)
        .catch(err => {
            res.status(500).json({ err: err.message });
        });
});

messageRouter.get('//messages/admin', protectRoute, (req, res) => {
    getAllAdminMessages(req, res)
        .catch(err => {
            res.status(500).json({ err: err.message });
        });
});

export default messageRouter;

import express from 'express';
const applicationRouter = express.Router();
import { updateApplication, deleteApplication, getApplication, getAllApplication, createApplication } from "../controllers/applicationController.js";
import protectRoute from "../middleware/protect.js";

// Allow only "admin" users to access the DELETE route for applications
applicationRouter.delete('/:id', protectRoute, (req, res) => {
    deleteApplication(req, res)
        .catch(err => {
            res.status(500).json({ err: err.message });
        });
});

// Allow any user (including "admin" and "user") to access the GET routes for applications
applicationRouter.get('/', protectRoute, (req, res) => {
    getAllApplication(req, res)
        .catch(err => {
            res.status(500).json({ err: err.message });
        });
});

applicationRouter.get('/:id', protectRoute, (req, res) => {
    getApplication(req, res)
        .catch(err => {
            res.status(500).json({ err: err.message });
        });
});

// Allow "admin" users to update any application
// Allow regular users to update only their own application
applicationRouter.put('/:id', protectRoute, (req, res) => {
    updateApplication(req, res)
        .catch(err => {
            res.status(500).json({ err: err.message });
        });
});

// Allow any user (including "admin" and "user") to create a new application
applicationRouter.post('/', protectRoute, (req, res) => {
    createApplication(req, res)
        .catch(err => {
            res.status(500).json({ err: err.message });
        });
});

export default applicationRouter;

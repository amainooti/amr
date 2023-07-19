import express from 'express';
const userRouter = express.Router();
import {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} from '../controllers/userController.js';
import protectRoute from '../middleware/protect.js';

// Allow only "admin" users to access the DELETE route for users
userRouter.delete('/:id', protectRoute, async (req, res) => {
  try {
    await deleteUser(req, res);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

// Allow "admin" users to update any user
// Allow regular users to update only their own profile
userRouter.put('/:id', protectRoute, async (req, res) => {
  try {
    await updateUser(req, res);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

// Allow "admin" users to access any user's profile
// Allow regular users to access only their own profile
userRouter.get('/:id', protectRoute, async (req, res) => {
  try {
    await getUser(req, res);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

// Allow "admin" users to access the list of all users
userRouter.get('/', protectRoute, async (req, res) => {
  try {
    await getAllUsers(req, res);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

export default userRouter;

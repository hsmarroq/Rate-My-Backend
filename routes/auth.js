import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const user = await User.register({ ...req.body, isAdmin: false });
    return res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
});

export default router;

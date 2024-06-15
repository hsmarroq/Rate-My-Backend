import express from 'express';
import User from '../models/user.js';
import { createUserJwt } from '../utils/tokens.js';
import { requireAuthenticatedUser } from '../middleware/security.js';
const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    const token = createUserJwt(user);
    return res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const user = await User.register({ ...req.body, isAdmin: false });
    const token = createUserJwt(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.get('/me', requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const user = await User.fetchUserByEmail(email);
    const publicUser = User.makePublicUser(user);
    return res.status(200).json({ user: publicUser });
  } catch (err) {
    next(err);
  }
});

export default router;

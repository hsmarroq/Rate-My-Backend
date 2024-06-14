import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    // list all posts
  } catch (err) {
    next(err);
  }
});

router.get('/:postId', async (req, res, next) => {
  try {
    // fetch single post
  } catch (err) {
    next(err);
  }
});

router.put('/:postId', async (req, res, next) => {
  try {
    // update a single post
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    // create a post
  } catch (err) {
    next(err);
  }
});

router.post('/:postId/ratings', async (req, res, next) => {
  try {
    // create a rating
  } catch (err) {
    next(err);
  }
});

export default router;

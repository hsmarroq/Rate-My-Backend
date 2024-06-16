import express from 'express';
import Post from '../models/post.js';
import { requireAuthenticatedUser } from '../middleware/security.js';
import { authUserOwnsPost } from '../middleware/persmissions.js';

const router = express.Router();

// Route to create a new post
router.post('/', requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { user } = res.locals;
    const post = await Post.createNewPost({ post: req.body, user });
    return res.status(201).json({ post });
  } catch (err) {
    next(err);
  }
});

// Route to list all posts
router.get('/', requireAuthenticatedUser, async (req, res, next) => {
  try {
    const posts = await Post.listPosts();
    return res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
});

// Route to fetch a single post
router.get('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.fetchPostById(postId);
    return res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
});

router.patch(
  '/:postId',
  requireAuthenticatedUser,
  authUserOwnsPost,
  async (req, res, next) => {
    try {
      // update a single post
      const { postId } = req.params;
      const post = await Post.editPost({ postUpdate: req.body, postId });
      return res.status(200).json({ post });
    } catch (err) {
      next(err);
    }
  }
);

// Route to create a rating for a post
router.post(
  '/:postId/ratings',
  requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { postId } = req.params;
      const rating = await Post.createRating(postId, req.body); // Assuming you have a method to create a rating
      return res.status(201).json({ rating });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

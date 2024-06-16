import Post from '../models/post.js';
import { ForbiddenError } from '../utils/errors.js';

const authUserOwnsPost = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { postId } = req.params;
    const post = await Post.fetchPostById(postId);

    if (post.userEmail !== user.email) {
      throw new ForbiddenError(
        `User is not allowed to update other users' posts.`
      );
    }

    res.locals.post = post;

    return next();
  } catch (err) {
    return next(err);
  }
};

const authedUserIsNotPostOwner = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { postId } = req.params;
    const post = await Post.fetchPostById(postId);

    if (post.userEmail === user.email) {
      throw new ForbiddenError(`Users are not allowed to rate their own post.`);
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

export { authUserOwnsPost, authedUserIsNotPostOwner };

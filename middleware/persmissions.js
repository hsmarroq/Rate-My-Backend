import Post from '../models/post.js';
import { BadRequestError, ForbiddenError } from '../utils/errors.js';

// ensure authenticated user is the owner of the post
// if they aren't, throw an error
// otherwise we're good
const authUserOwnsPost = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { postId } = req.params; // Corrected here
    const post = await Post.fetchPostById(postId);

    if (post.userEmail !== user.email) {
      // Corrected here
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

export { authUserOwnsPost };

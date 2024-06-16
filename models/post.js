import db from '../db.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

class Post {
  static async listPosts() {
    // list all posts in db in descending order of when they created
    const results = await db.query(
      `
        SELECT p.id,
               p.caption,
               p.image_url AS "imageUrl",
               p.user_id AS "userId",
               u.email AS "userEmail",
               AVG(r.rating) AS "rating",
               COUNT(r.rating) AS "totalRatings",
               p.created_at AS "createdAt",
               p.updated_at AS "updatedAt"
        FROM posts AS p
          LEFT JOIN users AS u ON u.id = p.user_id
          LEFT JOIN ratings AS r ON r.post_id = p.id
        GROUP BY p.id, u.email
        ORDER BY p.created_at DESC
      `
    );

    return results.rows;
  }

  static async fetchPostById(postId) {
    // fetch a single post
    const results = await db.query(
      `
        SELECT p.id,
               p.caption,
               p.image_url AS "imageUrl",
               p.user_id AS "userId",
               u.email AS "userEmail",
               AVG(r.rating) AS "rating",
               COUNT(r.rating) AS "totalRatings",
               p.created_at AS "createdAt",
               p.updated_at AS "updatedAt"
        FROM posts AS p
          LEFT JOIN users AS u ON u.id = p.user_id
          LEFT JOIN ratings AS r ON r.post_id = p.id
        WHERE p.id = $1
        GROUP BY p.id, u.email
      `,
      [postId]
    );

    const post = results.rows[0];

    if (!post) {
      throw new NotFoundError();
    }

    return post;
  }

  static async createNewPost({ post, user }) {
    // create a new post
    const requiredFields = ['caption', 'imageUrl'];
    requiredFields.forEach((field) => {
      if (!post.hasOwnProperty(field)) {
        throw new BadRequestError(
          `Required field - ${field} - missing from request body.`
        );
      }
    });

    if (post.caption.length > 140) {
      throw new BadRequestError(`Post caption must be 140 characters or less.`);
    }

    const results = await db.query(
      `
        INSERT INTO posts (caption, image_url, user_id)
        VALUES ($1, $2, (SELECT id FROM users WHERE email = $3))
        RETURNING id,
                  caption,
                  image_url AS "imageUrl",
                  user_id AS "userId",
                  created_at AS "createdAt",
                  updated_at AS "updatedAt"
      `,
      [post.caption, post.imageUrl, user.email]
    );

    return results.rows[0];
  }

  static async editPost({ postId, postUpdate }) {
    // edit a single post
    const requiredFields = ['caption'];
    requiredFields.forEach((field) => {
      if (!postUpdate.hasOwnProperty(field)) {
        throw new BadRequestError(
          `Required field - ${field} - missing from request body.`
        );
      }
    });

    const results = await db.query(
      `
        UPDATE posts
        SET caption   = $1,
            updated_at = NOW()
        WHERE id =  $2
        RETURNING id,
                  caption,
                  image_url AS "imageUrl",
                  user_id AS "userId",
                  created_at AS "createdAt",
                  updated_at AS "updatedAt"
      `,
      [postUpdate.caption, postId]
    );

    const post = results.rows[0];

    if (!post) {
      throw new NotFoundError();
    }

    return post;
  }
}

export default Post;

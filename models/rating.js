import db from '../db.js';
import { BadRequestError } from '../utils/errors.js';

class Rating {
  static async createRatingForPost({ rating, user, postId }) {
    // Check if a rating by this user for this post already exists
    const existingRating = await db.query(
      `
      SELECT rating, user_id AS "userId", post_id AS "postId", created_at
      FROM ratings
      WHERE user_id = (SELECT id FROM users WHERE email = $1) AND post_id = $2
      `,
      [user.email, postId]
    );

    if (existingRating.rows.length > 0) {
      // If a rating already exists, throw a BadRequestError
      throw new BadRequestError(
        'Users are not allowed to leave multiple ratings for a single post.'
      );
    }

    // Insert a new rating
    const result = await db.query(
      `
      INSERT INTO ratings (rating, user_id, post_id, created_at)
      VALUES ($1, (SELECT id FROM users WHERE email = $2), $3, NOW())
      RETURNING rating, user_id AS "userId", post_id AS "postId", created_at
      `,
      [rating, user.email, postId]
    );
    return result.rows[0];
  }
}

export default Rating;

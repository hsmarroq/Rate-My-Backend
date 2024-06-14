import db from '../db.js';

class Rating {
  static async fetchRatingForPostByUser({ user, postID }) {
    // fetch a users' rating for a post, if one exists
  }

  static async createRatingForPost({ rating, user, postID }) {
    // check if user has already added a rating for this post
    // and throw and error if they have
    // otherwise insert the record into the db
  }
}

export default Rating;

import db from '../db.js';

class Post {
  static async listPosts() {
    // list all posts in db in descending order of when they created
  }

  static async fetchPostById(postId) {
    // fetch a single post
  }

  static async createNewPost({ post, user }) {
    // create a new post
  }

  static async editPost({ postId, postUpdate }) {
    // edit a single post
  }
}

export default Post;

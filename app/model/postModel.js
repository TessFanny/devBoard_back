const Core = require('./coreModel');

const pool = require('../services/dbClient');

class Post extends Core {
    static tableName = 'post'
    constructor(){
        super();
        this.tableName = 'post'
    }
    async findLikedPostsByUser(id) {
        const preparedQuery = {
          text: `SELECT * FROM "post"   
               WHERE user_id = $1 AND "like" > 0 
            `,
          values: [id],
        };
    
        const result = await pool.query(preparedQuery);
    
        if (!result.rows[0]) {
          return null;
        }
    
        return result.rows;
      }
      async findPostsUserProfile() {
        const preparedQuery = {
          text: `SELECT "user".image_path , post.* FROM post JOIN "user" 
          ON post.user_id = "user".id
            `,
        };
    
        const result = await pool.query(preparedQuery);
    
        if (!result.rows[0]) {
          return null;
        }
    
        return result.rows;
      }
}
module.exports = Post;
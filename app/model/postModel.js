const Core = require('./coreModel');

const pool = require('../services/dbClient');

class Post extends Core {
    // the name of the table in the database
    static tableName = 'post'
    constructor(){
        //calling the super core model to use its methods 
        super();
        this.tableName = 'post'
    }
    async findLikedPostsByUser(id) {
        try {
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
        } catch (error) {
            console.error(`Error in findLikedPostsByUser() : ${error.message}`)
         throw error;
        }
        
      }

      // query to get every posts with the user's username and profile picture that created the post
      async findPostsByUsers() {
        try {
            const preparedQuery = {
                text: `SELECT "user".image_path,"user".username , post.* FROM post JOIN "user" 
                ON post.user_id =  "user".id 		  
                ORDER BY created_at DESC
                LIMIT 20
                  `,
              };
          // result of the database query
              const result = await pool.query(preparedQuery);
          // if there is no row found null is return
              if (!result.rows[0]) {
                return null;
              }
          // else the result's rows are return
              return result.rows;
        } catch (error) {
            console.error(`Error in findPostsByUsers() : ${error.message}`)
         throw error;
        }
       
      }

      async findPostsByOneUser(id) {
        try {
            const preparedQuery = {
                text: `SELECT  "user".image_path,"user".username , post.* FROM post JOIN "user" 
                ON post.user_id = "user".id 
                WHERE user_id = $1		  
                ORDER BY created_at DESC
                LIMIT 20
                  `,
                  values: [id]
              };
          // result of the database query
              const result = await pool.query(preparedQuery);
          // if there is no row found null is return
              if (!result.rows[0]) {
                return null;
              }
          // else the result's rows are return
              return result.rows;
        } catch (error) {
            console.error(`Error in findPostsByOneUser() : ${error.message}`)
         throw error;
        }
        
      } 
      async findOnePost(id){
        try {
            const preparedQuery = {
                text: `SELECT  "user".image_path,"user".username , post.* FROM post JOIN "user" 
                ON post.user_id = "user".id 
                WHERE post.id = $1		  
                ORDER BY created_at DESC
                LIMIT 20
                  `,
                  values: [id]
              };
          // result of the database query
              const result = await pool.query(preparedQuery);
          // if there is no row found null is return
              if (!result.rows[0]) {
                return null;
              }
          // else the result's rows are return
              return result.rows[0];
        } catch (error) {
            console.error(`Error in findOnePost() : ${error.message}`)
         throw error;
        }
      }
}
module.exports = Post;
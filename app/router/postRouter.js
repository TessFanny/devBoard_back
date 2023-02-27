const express = require("express");
const postRouter = express.Router();
const postController = require("../controller/postController.js");


// CUSTUM TYPE/SCHEMA
/**
 * A post 
 * @typedef {object} Post
 * @property {string} title - titre
 * @property {string} content - contenu
 * @property {number} user_id - id d'un utilisateur
 * @property {string} created_at - date de création d'un post
 * @property {string} updated_at - date de mise à jour d'un post
 * @property {number} like - nombre de like d'un post
 */


/**
 * GET /posts
 * @summary  génère tous les posts
 * @type {Post}
 * @tags Post
 * @return {object} 200 - post response
 * @return {object} 500 - Unexpected error
 */
postRouter.get("/posts", postController.getPosts);


/**
 * GET /user/{id}/posts
 * @summary  génère tous les posts d'un utilisateur en fonction de son id
 * @type {Post}
 * @tags Post
 * @param {number} id.path.required - id en entrée
 * @return {object} 200 - post response
 * @return {object} 500 - Unexpected error
 */

postRouter.get("/user/:id/posts", postController.getPostsByUser);

postRouter.post("/user/:id/post", postController.addPost);

postRouter.get("/post/:id", postController.getOnePost);

postRouter.patch("/post/:id", postController.modifyPost);

postRouter.delete("/post/:id", postController.deletePost);
module.exports = postRouter;

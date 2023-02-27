const express = require("express");
const postRouter = express.Router();
const postController = require("../controller/postController.js");
const verifyToken = require("../middleware/auth.js");


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
 * GET /api/posts
 * @summary  génère tous les posts
 * @type {Post}
 * @tags Post
 * @return {object} 200 - post response
 * @return {object} 500 - Unexpected error
 */
postRouter.get("/posts",verifyToken, postController.getPosts);


/**
 * GET /api/user/{user_id}/posts
 * @summary  génère tous les posts d'un utilisateur en fonction de son id
 * @type {Post}
 * @tags Post
 * @param {number} id.path.required - id en entrée
 * @return {object} 200 - post response
 * @return {object} 500 - Unexpected error
 */

postRouter.get("/user/:user_id/posts", postController.getPostsByUser);


/**
 * post /api/user/{user_id}/post
 * @summary  post crée par un utilisateur
 * @type {Post}
 * @tags Post
 * @param {number} id.path.required - id en entrée
 * @return {object} 200 - post response
 * @return {object} 500 - Unexpected error
 */
postRouter.post("/user/:user_id/post", postController.addPost);


/**
 * get /api/post/{id}
 * @summary  génère un post à partir de l'id du post
 * @type {Post}
 * @tags Post
 * @param {number} id.path.required - id en entrée
 * @return {object} 200 - post response
 * @return {object} 500 - Unexpected error
 */
postRouter.get("/post/:id", postController.getOnePost);


/**
 * patch /api/user/{user_id}/post/{id}
 * @summary  modification de son  post (utilisateur)
 * @type {Post}
 * @tags Post
 * @param {number} id.path.required - id en entrée
 * @return {object} 200 - post response
 * @return {object} 500 - Unexpected error
 */
postRouter.patch("/user/user_id/post/:id", postController.modifyPost);


/**
 * delete /api/user/{user_id}/post/{id}
 * @summary  suppresion de son post (utilisateur)
 * @type {Post}
 * @tags Post
 * @param {number} id.path.required - id en entrée
 * @return {object} 200 - post response
 * @return {object} 500 - Unexpected error
 */
postRouter.delete("/user/user_id/post/:id", postController.deletePost);
module.exports = postRouter;

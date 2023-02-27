const express = require("express");
const postRouter = express.Router();
const postController = require("../controller/postController.js");

postRouter.get("/posts", postController.getPosts);

postRouter.get("/user/:id/posts", postController.getPostsByUser);

postRouter.post("/user/:id/post", postController.addPost);

postRouter.get("/post/:id", postController.getOnePost);

postRouter.patch("/post/:id", postController.modifyPost);

postRouter.delete("/post/:id", postController.deletePost);
module.exports = postRouter;

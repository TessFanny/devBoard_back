const express = require('express');
const postRouter =  express.Router();
const postController = require("../controller/postController.js")

postRouter.get('/posts', postController.getPosts);

module.exports = postRouter;

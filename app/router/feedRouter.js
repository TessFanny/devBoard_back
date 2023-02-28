const express = require('express');
const feedRouter =  express.Router();
const feedController = require("../controller/feedController.js")

feedRouter.get('/feeds', feedController.getFeed);

feedRouter.post("/user/:id/feed", feedController.addFeed);


feedRouter.get("/feed/:id", feedController.getOneFeed);

feedRouter.patch("/user/:user_id/feed/:id", feedController.modifyFeed);

feedRouter.delete("/user/:user_id/feed/:id", feedController.deleteFeed);

module.exports = feedRouter;

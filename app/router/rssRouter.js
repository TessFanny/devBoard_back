const express = require('express');
const rssRouter =  express.Router();
const rssController = require("../controller/rssController.js")

rssRouter.get('/rss', rssController.getRss);

rssRouter.post("/user/:id/rss", rssController.addRss);


rssRouter.get("/rss/:id", rssController.getOneRss);

rssRouter.patch("/rss/:id", rssController.modifyRss);

rssRouter.delete("/rss/:id", rssController.deleteRss);
module.exports = rssRouter;

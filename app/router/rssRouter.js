const express = require('express');
const rssRouter =  express.Router();
const rssController = require("../controller/rssController.js")

rssRouter.get('/rss', rssController.getRss);

module.exports = rssRouter;

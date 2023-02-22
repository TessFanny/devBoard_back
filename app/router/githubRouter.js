const express = require('express');
const githubRouter =  express.Router();

const GithubController = require('../controller/GithubController.js')

githubRouter.get("/getAccessToken", GithubController.getAccessToken); 
githubRouter.get("/getUserData", GithubController.getUserdata);

module.exports = githubRouter;
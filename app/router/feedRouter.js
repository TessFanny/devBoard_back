const express = require('express');
const feedRouter =  express.Router();
const feedController = require("../controller/feedController.js")


// CUSTUM TYPE/SCHEMA
/**
 * A Feed 
 * @typedef {object} Feed
 * @property {string} name - nom
 * @property {string} url - lien du flux rss 
 */


/**
 * GET /api/feeds
 * @summary  génère tous les flux rss 
 * @type {Feed}
 * @security TokenAuth
 * @tags Feed
 * @return {object} 200 - feed response
 * @return {object} 500 - Unexpected error
 */
feedRouter.get('/feeds', feedController.getFeed);


/**
 * POST /api/user/{user_id}/feed
 * @summary  permet à l'utilisateur d'ajouter son propre flux rss 
 * @type {Feed}
 * @security TokenAuth
 * @tags Feed
 * @param {number} user_id.path.required -  id d'un utilisateur en entrée
 * @return {object} 200 - feed response
 * @return {object} 500 - Unexpected error
 */

feedRouter.post("/user/:user_id/feed", feedController.addFeed);


/**
 * GET /api/feed/{id}
 * @summary  génère un flux rss 
 * @type {Feed}
 * @security TokenAuth
 * @tags Feed
 * @param {number} id.path.required -  id d'un feed en entrée
 * @return {object} 200 - feed response
 * @return {object} 500 - Unexpected error
 */
feedRouter.get("/feed/:id", feedController.getOneFeed);


/**
 * PATCH /api/user/{user_id}/feed/{id}
 * @summary  permet à l'utilisateur de modifier son propre flux rss  
 * @type {Feed}
 * @security TokenAuth
 * @tags Feed
 * @param {number} id.path.required -  id d'un feed en entrée
 * @param {number} user_id.path.required -  id d'un utilisateur en entrée
 * @return {object} 200 - feed response
 * @return {object} 500 - Unexpected error
 */
feedRouter.patch("/user/:user_id/feed/:id", feedController.modifyFeed);


/**
 * DELETE /api/user/{user_id}/feed/{id}
 * @summary  permet à l'utilisateur de supprimer son propre flux rss  
 * @type {Feed}
 * @security TokenAuth
 * @tags Feed
 * @param {number} id.path.required -  id d'un feed en entrée
 * @param {number} user_id.path.required -  id d'un utilisateur en entrée
 * @return {object} 200 - feed response
 * @return {object} 500 - Unexpected error
 */
feedRouter.delete("/user/:user_id/feed/:id", feedController.deleteFeed);

module.exports = feedRouter;

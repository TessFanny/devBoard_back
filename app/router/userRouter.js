const express = require('express');
const userRouter =  express.Router();
const userController = require("../controller/userController.js");
const verifyToken = require('../middleware/auth.js');
const multer  = require('multer')
const upload = require('../middleware/uploadImage');
//const upload = multer({dest: 'app/images/'});

// CUSTUM TYPE/SCHEMA
/**
 * A user
 * @typedef {object} User
 * @property {string} firstname - prénom
 * @property {string} lastname - nom
 * @property {string} username - pseudo
 * @property {string} email - email
 * @property {string} password - mot de pase
 * @property {string} image_path - chemin image de profil
 * @property {string} role - rôle
 * 
 */


/**
 * GET /users
 * @summary  génère tous les utilisateurs
 * @type {user}
 * @tags User
 * @return {object} 200 - post response
 * @return {object} 500 - Unexpected error
 */
userRouter.get('/users', verifyToken, userController.getUsers);

/**
 * GET /user/{id}
 * @summary  génère un utilisateur en fonction de son id
 * @type {user}
 * @tags User
 * @return {object} 200 - post response
 * @param {number} id.path.required - id en entrée
 * @return {object} 500 - Unexpected error
 */


/**
 * GET /user/{id}
 * @summary  génère un utilisateur en fonction de son id
 * @type {user}
 * @tags User
 * @return {object} 200 - post response
 * @param {number} id.path.required - id en entrée
 * @return {object} 500 - Unexpected error
 */

userRouter.get('/user/:id', verifyToken, userController.getOneUser);



/**
 * PATCH /user/{id}
 * @summary  modifie les données  d'un utilisateur en fonction de son id
 * @type {user}
 * @tags User
 * @return {object} 200 - post response
 * @param {number} id.path.required - id en entrée
 * @return {object} 500 - Unexpected error
 */
userRouter.patch('/user/:id', userController.modifyUser);


/**
 * PATCH /user/{id}
 * @summary  modifie les données  d'un utilisateur en fonction de son id
 * @type {user}
 * @tags User
 * @return {object} 200 - post response
 * @param {number} id.path.required - id en entrée
 * @return {object} 500 - Unexpected error
 */
userRouter.patch('/user/:id', userController.modifyUser); /** here */


userRouter.patch('/user/:id/profile', upload.single('file'), userController.updatePicture)

userRouter.delete('/user/:id', userController.deleteUser);

module.exports = userRouter
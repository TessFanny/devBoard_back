
const express = require('express');
const authRouter =  express.Router();
const upload = require('../middleware/uploadImage');

const authController = require('../controller/authController.js')

authRouter.post("/register",authController.registerUser); 
authRouter.post("/login", authController.loginUser);




module.exports = authRouter;
const express = require('express');
const userRouter =  express.Router();
const userController = require("../controller/userController.js")

userRouter.get('/users', userController.getUsers);
userRouter.get('/user/:id', userController.getOneUser);

module.exports = userRouter
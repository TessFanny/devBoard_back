const express = require('express');
const userRouter =  express.Router();
const userController = require("../controller/userController.js")
const verifyToken = require('../middleware/auth.js')

userRouter.get('/users', verifyToken, userController.getUsers);
userRouter.get('/user/:id', verifyToken, userController.getOneUser);
userRouter.patch('/user/:id',verifyToken, userController.modifyUser);
userRouter.delete('/user/:id',verifyToken, userController.deleteUser);

module.exports = userRouter
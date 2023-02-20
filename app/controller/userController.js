const User = require('../model/userModel.js')
const bcrypt = require('bcrypt')

const userController = {
   getUsers: async (req, res)=>{
      try {

         const users = await User.findAll()
         res.status(200).json(users)

      } catch(err) {

         res.status(404).json({message: err.message})
      }
      
   },   
   getOneUserbyEmail: async (req,res) => {
      try {

      const user = new User();
      const newUser = await user.findByEmail({});
      res.status(200).json(newUser)

      } catch(err) {

         res.status(400).json({message: err.message})
      }
   },
   getOneUser: async (req,res) => {
      try {

      const user = new User();
      const newUser = await user.findByPk(req.params.id);
      res.status(200).json(newUser)

      } catch(err) {

         res.status(400).json({message: err.message})
      }
   },
   modifyUser: async (req, res)=> {
      try {

         const user = new User();
         const newUser = await user.update(req.params.id, req.body);
         res.status(200).json(newUser)

      } catch(err) {
         console.log(err)
         res.status(400).json({message: err.message})
      }
   },
   deleteUser: async (req,res) => {
      try {
         
         const user = new User();
         const newUser = await user.delete(req.params.id);
         res.status(200).json(newUser)

      } catch(err) {
         res.status(400).json({message: err.message})
      }
   }
}
module.exports = userController; 
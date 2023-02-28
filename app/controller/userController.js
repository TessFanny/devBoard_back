const User = require('../model/userModel.js')
const bcrypt = require('bcrypt')
//const upload = require('../middleware/uploadImage');
//const datamapper = require('../model/updatePicture')
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
   const user = new User()
      //    email = req.body.email
      //    const userEmail = user.findByField("email", email);
      //    const userUsername = user.findByField("username", req.body.username);
      //    if(userEmail.email == req.body.email) {
      //       return res.status(400).json( {msg: "cet email exist déjà"})
      // } else if(userUsername.username == req.body.username){
      //    return res.status(400).json( {msg: " ce nom d'utilisateur existe déjà"})
      // }
      // else {
        
      // }
         
      const newUser = await user.update( req.params.id,req.body);
      console.log(newUser.email);
      console.log(newUser);
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
   },

   updatePicture: async (req, res)=>{
      console.log(req.file);
      try {
         const user = new User()
         const userProfile = await user.updatePicture(`${req.file.filename}`, req.params.id)
         const newUser = await user.findByPk(req.params.id)
         console.log(userProfile);
         res.status(200).json(newUser)
      } catch (error) {
         res.status(400).json({message: err.message})
      }
   }
}
module.exports = userController; 
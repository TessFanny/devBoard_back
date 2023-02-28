const User = require('../model/userModel.js')
const bcrypt = require('bcrypt')
//const upload = require('../middleware/uploadImage');
//const datamapper = require('../model/updatePicture')
const userController = {
   /**
    * get all users
    * @param {*} req 
    * @param {*} res 
    */
   getUsers: async (req, res)=>{
      try {
        // get all users from User class 
         const users = await User.findAll()
         res.status(200).json(users)

      } catch(err) {
         //
         res.status(404).json({message: err.message})
      }
      
   },  
   
   /**
    * get one user by its email
    * @param {*} req 
    * @param {*} res 
    */
   getOneUserbyEmail: async (req,res) => {
      try {
         // get an instance of a user
      const user = new User();
      // find user by its email
      const newUser = await user.findByEmail({});
      // user response
      res.status(200).json(newUser)
         
      } catch(err) {
         // error response
         res.status(400).json({message: err.message})
      }
   },
   /**
    * get one user
    * @param {*} req 
    * @param {*} res 
    */
   getOneUser: async (req,res) => {
      try {
         // get an instance of a user
      const user = new User();
      // find user by its id 
      const newUser = await user.findByPk(req.params.id);
      // user response
      res.status(200).json(newUser)

      } catch(err) {
         //error response
         res.status(400).json({message: err.message})
      }
   },

   /**
    * update user info
    * @param {*} req 
    * @param {*} res 
    * @returns 
    */
   modifyUser: async (req, res)=> {   
      try {
         // get an instance of user
   const user = new User()
   // get user by id        
         const userById = await user.findByPk(req.params.id);console.log(userById)
         // verify if the email provided already exists
         if(userById.email == req.body.email){
            return res.status(400).json( {msg: "cet email exist déjà"})
            // verify if the username provided already exists
      } else if(userById.username == req.body.username){
         return res.status(400).json( {msg: " ce nom d'utilisateur existe déjà"})
      }
      else {
         //else send user response
         const newUser = await user.update( req.params.id,req.body);
         res.status(200).json(newUser)
      }
         

      } catch(err) {
         console.log(err)
         res.status(400).json({message: err.message})
      }
   },

   /**
    * delete user 
    * @param {*} req 
    * @param {*} res 
    */
   deleteUser: async (req,res) => {
      try {         
         const user = new User();
         const newUser = await user.delete(req.params.id);
         res.status(200).json(newUser)
      } catch(err) {
         res.status(400).json({message: err.message})
      }
   },

   /**
    * update user's profile picture
    * @param {*} req 
    * @param {*} res 
    */
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
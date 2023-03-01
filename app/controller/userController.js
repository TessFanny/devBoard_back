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
         const userByEmail = await user.findByField("email", req.params.email);
         const userByUsername = await user.findByField("username", req.params.username)
         console.log(userById)
         if(userByEmail.length > 0){
            return res.status(409).json({ error: 'Email address already in use' });
         }
         if(userByUsername.length > 0){
            return res.status(409).json({ error: 'username address already in use' });
         }
         
         const newUser = await user.update( req.params.id,req.body);
         res.status(200).json(newUser)        

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
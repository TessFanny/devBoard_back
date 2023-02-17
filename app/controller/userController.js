const User = require('../model/userModel.js')

const userController = {
   getUsers: async (req, res)=>{
      try {

         const users = await User.findAll()
         res.status(200).json(users)

      } catch(err) {

         res.status(404).json({message: err.message})
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
   createUser: async (req,res)=> {
      try {
         const user = req.body

      } catch {

      }
   },
   modifyUser: async (req, res)=> {
      try {

      }catch {

      }
   },
   deleteUser: async (req,res) => {
      try {

      } catch {

      }
   }
}
module.exports = userController; 
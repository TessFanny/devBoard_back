const User = require("../model/userModel.js");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require('jsonwebtoken');

const authController = {
    registerUser: async (req, res) => {
    try {
        if (req.body.password !== req.body.passwordConfirm) return res.status(400).json( {msg: 'les mots de passe  ne correspondent pas'})
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        const savedUser =  new User()
       
        const userEmail = await savedUser.findByField("email",req.body.email)
        const userUsername = await savedUser.findByField("username", req.body.username)
        
        if(userEmail ){
            res.status(404).json('user with that email already exist')
        } else if( userUsername) {
            res.status(404).json('user with that  username already exist')
        }
        else{
            const newUser = await savedUser.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });
        res.status(201).json(newUser);
        }
        

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    },
    
    loginUser: async(req,res)=>{
        try{
            const {email, password}= req.body;
            const user = new User();
            const newUser = await findByField("email",req.body.email);
            if (!newUser) return res.status(400).json( {msg: " L'utilisateur n'existe pas"})
            const passwordCompare = await bcrypt.compare(password, newUser.password);

            if(!passwordCompare) return res.status(400).json( {msg: " Le mot de passe ne correspond pas !"})

            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

            delete newUser.password;
            res.status(200).json({token, newUser}); 
        } catch(err) {
            console.error(err);
            res.status(500).json({error: err.message})
        }
    }
};

module.exports = authController;

const User = require('../model/userModel.js')
const bcrypt = require('bcrypt')

const authController = {
    registerUser: async (req,res)=> {
        try {
            const {username,
                    email,
                    password } = req.body

            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt)

            const newUser = new User({
                username,
                email,
                password: passwordHash,
                })
                
            const savedUser = await newUser.create(newUser);
            res.status(201).json(savedUser)
        } catch(err){
            res.status(500).json({ error: err.message})
        }
    },
    loginUser: async(req,res)=>{
        try{
            const {email, password}= req.body;
    
            const user = await User.findOne({email: email});

            if (!user) return res.status(400).json( {msg: " L'utilisateur n'existe pas"})
    
            const Boolcompare = await bcrypt.compare(password, user.password);

            if(!Boolcompare) return res.status(400).json( {msg: " Le mot de passe ne correspond pas !"})
    
            // const token =jwt.sign({id: user._id}, process.env.JWT_SECRET);
            delete user.password;
            // res.status(200).json( {token, user}); A mettre plus tard avec JWT
            res.status(200).json( {user});
        } catch(err) {
            res.status(500).json({error: err.message})
        }
    }
}
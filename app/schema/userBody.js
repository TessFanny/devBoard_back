const Joi = require('joi')

const userSchema = {
    register(){
        return Joi.object({ 
            username: Joi.string().min(3).max(30), 
            email: Joi.string().email().required(), 
            password: Joi.string().min(3).max(30), 
            passwordConfirm: Joi.string().min(3).max(30), 
           
        });
    },
    login(){
        return Joi.object({            
            email: Joi.string().email().required(), 
            password: Joi.string().min(3).max(30)           
        });
    },
     modifyUser(){
        Joi.object({
                firstname: Joi.string().allow('', null).min(3).max(30), 
                lastname: Joi.string().allow('', null).min(3).max(30), 
                username: Joi.string().allow('', null),
                email: Joi.string().email().allow('', null), 
                role: Joi.string().allow('', null)
            })
     },
     updateProfile(){
        Joi.object({
            image_path: Joi.string(), 
        })
     }
}
module.exports = userSchema


// module.exports = Joi.object({
//     id:Joi.number().integer().min(1),
//     firstname: Joi.string().allow('', null).min(3).max(30), 
//     lastname: Joi.string().allow('', null).min(3).max(30), 
//     username: Joi.string().min(3).max(30), 
//     email: Joi.string().min(3).max(30).required(), 
//     password: Joi.string().min(3).max(30), 
//     passwordConfirm: Joi.string().min(3).max(30), 
//     image_path: Joi.string(), 
//     role: Joi.string()
// });
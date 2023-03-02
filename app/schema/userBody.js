const Joi = require('joi')

const userSchema = {
    register(){
        return Joi.object({
            id:Joi.number().integer().min(1),
            firstname: Joi.string().allow('', null).min(3).max(30), 
            lastname: Joi.string().allow('', null).min(3).max(30), 
            username: Joi.string().min(3).max(30), 
            email: Joi.string().min(3).max(30).required(), 
            password: Joi.string().min(3).max(30), 
            passwordConfirm: Joi.string().min(3).max(30), 
            image_path: Joi.string(), 
            role: Joi.string()
        });
    },
    login(){
        
    }
}
module.exports = Joi.object({
    id:Joi.number().integer().min(1),
    firstname: Joi.string().allow('', null).min(3).max(30), 
    lastname: Joi.string().allow('', null).min(3).max(30), 
    username: Joi.string().min(3).max(30), 
    email: Joi.string().min(3).max(30).required(), 
    password: Joi.string().min(3).max(30), 
    passwordConfirm: Joi.string().min(3).max(30), 
    image_path: Joi.string(), 
    role: Joi.string()
});
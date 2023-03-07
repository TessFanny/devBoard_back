

const Joi = require('joi')

const postSchema = {
    addPost(){
        return Joi.object({ 
            title: Joi.string().min(3).max(30).required(), 
            content: Joi.string().min(20).required(), 
            user_id: Joi.number().integer().required(),
            like: Joi.number().allow(null),
            created_at: Joi.string().allow('', null),
            updated_at: Joi.string().allow('', null)
        });
    },
    updatePost(){
        return Joi.object({ 
            title: Joi.string().min(3).max(30), 
            content: Joi.string().min(20), 
            user_id: Joi.number().integer(),
            like: Joi.number().allow( null),
            created_at: Joi.string().allow('', null),
            updated_at: Joi.string().allow('', null)
        });
    }
}
module.exports = postSchema

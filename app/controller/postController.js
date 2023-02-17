const Post = require('../model/postModel.js');

const postController = {
    getPosts: async (req,res)=>{
    try {
        const posts = await Post.findAll()
        console.log(posts);
        res.status(200).json(posts)       
        } catch (error) {
            res.status(404).json({message: error.message})
        }   
    }
}
module.exports = postController; 
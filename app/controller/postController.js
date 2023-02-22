const Post = require('../model/postModel.js');

const postController = {
    getposts: async (req,res)=>{
    try {
        const posts = await Post.findAll()
        console.log(posts);
        res.status(200).json(posts)       
        } catch (error) {
            res.status(404).json({message: error.message})
        }   
    },
    getOnepost: async (req,res) => {
        try {
  
        const post = new Post();
        const newPost = await post.findByPk(req.params.id);
        res.status(200).json(newPost)
  
        } catch(err) {
  
           res.status(400).json({message: err.message})
        }
     },
     modifypost: async (req, res)=> {
        try {
  
           const post = new Post();
           const newPost = await post.update(req.params.id, req.body);
           res.status(200).json(newPost)
  
        } catch(err) {
           console.log(err)
           res.status(400).json({message: err.message})
        }
     },
     deletepost: async (req,res) => {
        try {
           
           const post = new Post();
           const newPost = await post.delete(req.params.id);
           res.status(200).json(newPost)
  
        } catch(err) {
           res.status(400).json({message: err.message})
        }
     }
}
module.exports = postController; 
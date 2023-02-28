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
    },
    
    getPostsByUser: async (req, res)=>{
        
        try {
            const posts = await Post.findAll({where:
                { user_id : req.params.user_id} 
               })
               console.log(posts);
               res.json(posts) 
        } catch (error) {
            res.status(404).json({message: error.message})
        }
        
    }, 

    addPost: async (req,res)=>{
    try {   
        const post = await new Post()
        const newPost = await post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.params.user_id,
            updated_at: req.body.updated_at,
            like: req.body.like
        })
        res.status(201).json(newPost);
        console.log(newPost);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    },
    getOnePost: async (req,res) => {
        try {
  
        const post = new Post();
        const newPost = await post.findByPk(req.params.id);
        res.status(200).json(newPost)
  
        } catch(err) {
  
           res.status(400).json({message: err.message})
        }
     },
     modifyPost: async (req, res)=> {
        try {
  
           const post = new Post();
           const newPost = await post.update(req.params.id, req.body);
           res.status(200).json(newPost)
  
        } catch(err) {
           console.log(err)
           res.status(400).json({message: err.message})
        }
     },
     deletePost: async (req,res) => {
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
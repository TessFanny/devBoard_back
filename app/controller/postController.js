const Post = require('../model/postModel.js');

const postController = {
    // getPosts: async (req,res)=>{
    // try {
    //     const posts = await Post.findAll()
    //     console.log(posts);
    //     res.status(200).json(posts)       
    //     } catch (error) {
    //         res.status(404).json({message: error.message})
    //     }   
    // },
    
    // getPostsByUser: async (req, res)=>{
        
    //     try {
    //         const posts = await Post.findAll({where:
    //             { user_id : req.params.user_id} 
    //            })
    //            console.log(posts);
    //            res.json(posts) 
    //     } catch (error) {
    //         res.status(404).json({message: error.message})
    //     }
        
    // }, 
    

/**
 * generates every posts created by all users
 * @param {*} req 
 * @param {*} res 
 */
    getAllUsersPosts: async (req, res)=>{
        try {
            const post = new Post();
            const posts = await post.findPostsByUsers()
            res.status(200).json(posts)
        } catch (error) {
            res.status(400).json({message: err.message})
        }
    },

    // get all posts created by a single user
    getOneUserPosts: async (req,res) => {
        try {
        const post = new Post();
        const newPost = await post.findPostsByOneUser(req.params.user_id);
        res.status(200).json(newPost)
  
        } catch(err) {
  
           res.status(400).json({message: err.message})
        }
     },
     getOnePost: async (req,res)=>{
        try {
            const post = new Post();
            const newPost = await post.findOnePost(req.params.id);
            if(newPost){
                res.status(200).json(newPost)

            }else{
                throw Error()
            }
      
            } catch(err) {      
               res.status(400).json({message: err.message})
            }
     },

     // create a post 
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

  // update a post
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
//get posts liked by a user
    addLikesToPost: async (req, res)=>{
        try {
            const post = new Post();
            const postLiked = await post.addLikesPost(req.params.post_id,req.params.user_id)
            res.status(200).json(postLiked)
            console.log(postLiked);
        } catch (err) {
            res.status(400).json({message: err.message})
        }
    },
    likesCount: async(req,res)=>{
        try {
            const post = new Post();
            const likeCount = await post.likesCount(req.params.post_id)
            
            if(likeCount){
                res.status(200).json(likeCount)
            }
            else{
                throw new Error()
            }
        } catch (err) {
            res.status(400).json({message: err.message})
        }
    },

    postsLikedByUser: async (req,res)=>{
        try {
            const post = new Post();
        const postsLiked = await post.getPostsLikedByUser(req.params.user_id);
        if(postsLiked){
            res.status(200).json(postsLiked)
        }
        else{
            throw Error('this user has no post liked')
        }
        } catch (err) {
            res.status(400).json({message: err.message})
        }
        
    },
     //delete a post
     deletePost: async (req,res) => {
        try {
           
           const post = new Post();
           const newPost = await post.delete(req.params.id);
           res.status(200).json(newPost)
  
        } catch(err) {
           res.status(400).json({message: err.message})
        }
     },
   
}
module.exports = postController; 
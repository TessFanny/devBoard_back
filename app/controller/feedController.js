const Feed = require('../model/feedModel.js');

const feedController = {
   // get all feeds 
    getFeed: async (req,res)=>{
    try {
        const feeds = await Feed.findAll()
        res.status(200).json(feeds)       
        } catch (error) {
            res.status(404).json({message: error.message})
        }   
    },
    getOneFeed: async (req,res) => {
        try {
        const feed = new Feed();
        const oneFeed = await feed.findByPk(req.params.id);
        res.status(200).json(oneFeed)
  
        } catch(err) {
  
           res.status(400).json({message: err.message})
        }
     },
     addFeed: async (req,res)=>{
      try {
      
          const feed = await new Feed();
         const  feedName = await feed.findByField("name",req.body.name )
         console.log(feedName);
         if(feedName){
            res.status(400).json('un flux existe déjà avec ce nom veuillez renseigner un autre nom')
         }else{
            const addedFeed = await feed.insertFeedByUser(req.params.user_id,{
               name: req.body.name,
               url: req.body.url,             
            })
            console.log(addedFeed);
            res.status(201).json(addedFeed);
         }
      } catch (error) {
          res.status(400).json({message: error.message})
      }
      },
      
     modifyFeed: async (req, res)=> {
        try {
  
           const feed = new Feed();
           const updatedFeed = await feed.update(req.params.id, req.body);
           res.status(200).json(updatedFeed)
  
        } catch(err) {
           console.log(err)
           res.status(400).json({message: err.message})
        }
     },

     // 
     deleteFeed: async (req,res) => {
        try {        
           const feed = new Feed();
           const deletedFeed = await feed.deleteFeed(req.params.id);
           res.status(200).json(deletedFeed)
  
        } catch(err) {
           res.status(400).json({message: err.message})
        }
     }
}
module.exports = feedController; 
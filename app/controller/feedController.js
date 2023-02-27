const Feed = require('../model/feedModel.js');

const feedController = {
    getFeed: async (req,res)=>{
    try {
        const feed = await Feed.findAll()
        console.log(feed);
        res.status(200).json(feed)       
        } catch (error) {
            res.status(404).json({message: error.message})
        }   
    },
    getOneFeed: async (req,res) => {
        try {
        const feed = new Feed();
        const newFeed = await feed.findByPk(req.params.id);
        res.status(200).json(newFeed)
  
        } catch(err) {
  
           res.status(400).json({message: err.message})
        }
     },
     addFeed: async (req,res)=>{
      try {
      
          const feed = await new Feed()
          const newFeed = await feed.insertFeedByUser(req.params.id,{
              name: req.body.name,
              url: req.body.url,             
          })
          res.status(201).json(newFeed);
          console.log(newFeed);
      } catch (error) {
          res.status(400).json({message: error.message})
      }
      },
     modifyFeed: async (req, res)=> {
        try {
  
           const feed = new Feed();
           const newFeed = await feed.update(req.params.id, req.body);
           res.status(200).json(newFeed)
  
        } catch(err) {
           console.log(err)
           res.status(400).json({message: err.message})
        }
     },
     deleteFeed: async (req,res) => {
        try {        
           const feed = new Feed();
           const newFeed = await feed.deleteFeed(req.params.id);
           res.status(200).json(newFeed)
  
        } catch(err) {
           res.status(400).json({message: err.message})
        }
     }
}
module.exports = feedController; 
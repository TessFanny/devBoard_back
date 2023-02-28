const Feed = require('../model/feedModel.js');
let Parser = require('rss-parser');



const feedController = {
   // get all feeds 
   getFeed: async (req,res)=>{
      try {
            let parser = new Parser();
            const feeds = await Feed.findAll()
            let news = []
               await Promise.all(feeds.map(async (feed) => {
               const feedData = await parser.parseURL(`${feed.url}`);
               news.push(feedData);
               console.log("feedenvoyé")
            }))
            res.status(200).json(news)   
            
         } catch (error) {
               res.status(404).json({message: error.message})
         }   
      },
      getOneFeed: async (req,res) => {
         try {
         const feed = new Feed();
         let parser = new Parser();
         const newFeed = await feed.findByPk(req.params.id);
         const feedData = await parser.parseURL(`${newFeed.url}`);
         res.status(200).json(feedData)   
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
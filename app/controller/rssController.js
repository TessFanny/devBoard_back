const Rss = require('../model/rssModel.js');

const rssController = {
    getRss: async (req,res)=>{
    try {
        const rss = await Rss.findAll()
        console.log(rss);
        res.status(200).json(rss)       
        } catch (error) {
            res.status(404).json({message: error.message})
        }   
    },
    getOneRss: async (req,res) => {
        try {
        const rss = new Rss();
        const newRss = await rss.findByPk(req.params.id);
        res.status(200).json(newRss)
  
        } catch(err) {
  
           res.status(400).json({message: err.message})
        }
     },
     addRss: async (req,res)=>{
      try {
      
          const rss = await new Rss()
          const newrss = await rss.insertRssByUser(req.params.id,{
              name: req.body.name,
              url: req.body.url,             
          })
          res.status(201).json(newrss);
          console.log(newrss);
      } catch (error) {
          res.status(400).json({message: error.message})
      }
      },
     modifyRss: async (req, res)=> {
        try {
  
           const rss = new Rss();
           const newRss = await rss.update(req.params.id, req.body);
           res.status(200).json(newRss)
  
        } catch(err) {
           console.log(err)
           res.status(400).json({message: err.message})
        }
     },
     deleteRss: async (req,res) => {
        try {
           
           const rss = new Rss();
           const newRss = await rss.delete(req.params.id);
           res.status(200).json(newRss)
  
        } catch(err) {
           res.status(400).json({message: err.message})
        }
     }
}
module.exports = rssController; 
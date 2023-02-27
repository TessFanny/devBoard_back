const Skill = require("../model/skillModel.js");

const skillController = {
  getSkills: async (req, res) => {
    try {
      const skills = await Skill.findAll();    
      res.status(200).json(skills);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getOneSkill: async (req, res) => {
    try {
      const skill = new Skill();
      const newSkill = await skill.findByPk(req.params.id);
      res.status(200).json(newSkill);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  addSkill: async (req, res) => {
    try {
      const skill = await new Skill();
      const newSkill = await skill.insertskillByUser(req.params.id, {
        name: req.body.name,
        url: req.body.url,
      });
      res.status(201).json(newSkill);
      console.log(newSkill);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  modifySkill: async (req, res) => {
    try {
      const skill = new Skill();
      const newSkill = await skill.update(req.params.id, req.body);
      res.status(200).json(newSkill);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },
  deleteSkill: async (req, res) => {
    try {
      const skill = new Skill();
      const newSkill = await skill.delete(req.params.id);
      res.status(200).json(newSkill);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
module.exports = skillController;

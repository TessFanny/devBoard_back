const express = require('express');
const skillRouter =  express.Router();
const skillController = require("../controller/skillController.js")

skillRouter.get('/skills', skillController.getSkills);

skillRouter.post("/user/:id/skill", skillController.addSkill);


skillRouter.get("/skill/:id", skillController.getOneSkill);

skillRouter.patch("/skill/:id", skillController.modifySkill);

skillRouter.delete("/skill/:id", skillController.deleteSkill);


module.exports = skillRouter;

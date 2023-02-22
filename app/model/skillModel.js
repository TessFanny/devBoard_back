const Core = require('./coreModel');

const pool = require('../services/dbClient');

class Skill extends Core {
    static tableName = 'skill'
    constructor(){
        super();
        this.tableName = 'skill'
    }
}
module.exports = Skill;
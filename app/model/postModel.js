const Core = require('./coreModel');

const pool = require('../services/dbClient');

class Post extends Core {
    static tableName = 'post'
    constructor(){
        super();
        this.tableName = 'post'
    }
}
module.exports = Post;
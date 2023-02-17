const Core = require('./coreModel');

const pool = require('../services/dbClient');

class Rss extends Core {
    static tableName = 'post'
}
module.exports = Rss;
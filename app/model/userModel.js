const Core = require('./coreModel');

const pool = require('../services/dbClient');

class User extends Core {
    static tableName = 'user';
    
    constructor(){
        super();
        this.tableName = 'user'
    }
    async findByField(field, params) {
        const preparedQuery = {
            text: `SELECT  * FROM "${this.tableName}" WHERE ${field} = $1`,
            values: [params],
        };
        
        const result = await pool.query(preparedQuery);
        
        if (!result.rows[0]) {
            return null;
        }
        
        return result.rows[0];
    }
};

module.exports = User;
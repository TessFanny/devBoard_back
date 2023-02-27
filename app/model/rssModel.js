const Core = require('./coreModel');

const pool = require('../services/dbClient');

class Rss extends Core {
    static tableName = 'rss_flow'
    constructor(){
        super();
        this.tableName = 'rss_flow'
    }
    async findRssByUser(id) {
        const preparedQuery = {
           text: `SELECT "rss_flow".* FROM "rss_flow" JOIN "rss_has_user" 
           ON rss_flow.id = rss_has_user.rss_flow_id  
           WHERE rss_has_user.user_id = $1;`,
           values: [id],
        }; 
   
        const result = await pool.query(preparedQuery);
  
        if (!result.rows[0]) {
           return null;
        }
  
        return result.rows[0];
     }
     async insertRssByUser(id, inputData){

        const fields = [];
        const placeholders = [];
        const values = [];
        let indexPlaceholder = 1;
  
        Object.entries(inputData).forEach(([prop, value]) => {
           fields.push(`"${prop}"`);
           placeholders.push(`$${indexPlaceholder}`);
           indexPlaceholder += 1;
           values.push(value);
        });
  
        const preparedQuery = {
           text: `
                 INSERT INTO "${this.tableName}"
                 (${fields})
                 VALUES (${placeholders})
                 RETURNING id
           `,
           values,
        };
        const result = await pool.query(preparedQuery);
        const rssID = result.rows[0].id;
       await pool.query('INSERT INTO rss_has_user (rss_flow_id, user_id) VALUES ($1, $2)', [rssID, id])
     }
     
     async deleteRss(id){
      await pool.query('DELETE FROM "rss_has_user" WHERE rss_flow_id = $1', [id])

      const result = await pool.query(`DELETE FROM "${this.tableName}" WHERE id = $1`, [id]);
      return !!result.rowCount;
     } 
}
module.exports = Rss;
const pool = require('../services/dbClient');
const datamapper = {
    async updatePicture(file, id){
        try {
          const sqlQuery = `UPDATE "user" 
                SET        
                image_path = $1          
                 WHERE id = $2;
                `;
          const values = [
            file,            
            id
        ];
        console.log(sqlQuery);
          // console.log(sqlQuery);
          console.log(values);
          await pool.query(sqlQuery, values);
    
        } catch (error) {
            console.log(error);
        }
      }
}
module.exports = datamapper
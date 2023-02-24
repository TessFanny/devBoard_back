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
            text: `SELECT  ${field} FROM "${this.tableName}" WHERE ${field} = $1`,
            values: [params],
        };
        
        const result = await pool.query(preparedQuery);
        
        if (!result.rows[0]) {
            return null;
        }
        
        return result.rows[0];
    }
    async updateUser(body, file, id){
        try {
          const sqlQuery = `UPDATE "user" 
                SET firstname = $1,
                lastname = $2           
                username = $3           
                email = $4          
                password = $5           
                image_path = $6           
                role = $7           
                 WHERE id = $8;
                `;
          const values = [body.firstname, body.lastname, body.username,body.email, body.password, file, body.role, id];
          // console.log(sqlQuery);
          console.log(values);
          await pool.query(sqlQuery, values);
    
        } catch (error) {
            console.log(error);
        }
      }

    // async checkPassword() {
    //     // utilisateur de test :
    //     // INSERT INTO public."user"(
    //     //     fistname, lastname, username, email, password, birthdate)
    //     //     VALUES ('Chuck','Norris','cn','cn@gmail.com','maurice','1940-03-10'::date );

    //     const sqlQuery = "SELECT * FROM \"user\" WHERE username=$1 AND password=$2";
    //     const values = [this.username, this.password];

    //     const response = await pool.query(sqlQuery, values);
        
    //     // si j'ai une réponse c'est que l'utilisateur a été trouvé en BDD
    //     if (response.rows.length == 1) {
    //         // je mets à jour le this (user qui appelle le checkPassword)
    //         this.firtname = response.rows[0].firstname;
    //         this.lastname = response.rows[0].lastname;

    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }
};

module.exports = User;
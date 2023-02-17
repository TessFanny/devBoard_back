const Core = require('./coreModel');

const pool = require('../services/dbClient');

class User extends Core {
    static tableName = 'user';
     
    constructor(){
        super();
        this.tableName = 'user'
    //     // this.username=obj.username;
    //     // this.email=obj.email;
    //     // this.password=obj.password;
    //     // this.lastname = obj.lastname;
    //     // this.firstname = obj.firstname;
    //     // this.image_path = obj.image_path;
    //     // this.role =obj.role;
    }
    async checkPassword() {
        // utilisateur de test :
        // INSERT INTO public."user"(
        //     fistname, lastname, username, email, password, birthdate)
        //     VALUES ('Chuck','Norris','cn','cn@gmail.com','maurice','1940-03-10'::date );

        const sqlQuery = "SELECT * FROM \"user\" WHERE username=$1 AND password=$2";
        const values = [this.username, this.password];

        const response = await client.query(sqlQuery, values);
        
        // si j'ai une réponse c'est que l'utilisateur a été trouvé en BDD
        if (response.rows.length == 1) {
            // je mets à jour le this (user qui appelle le checkPassword)
            this.firtname = response.rows[0].firstname;
            this.lastname = response.rows[0].lastname;

            return true;
        }
        else {
            return false;
        }
    }
};

module.exports = User;
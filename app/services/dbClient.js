

//  Comme pour Client les informations de connexion
//   sont lu soit directement à partir de l'env soit donnée en paramêtre
require('dotenv').config();
const { Pool } = require('pg');

const connectionString = process.env.DB_URL;
const pool = new Pool({
    connectionString:connectionString
});

module.exports = pool;
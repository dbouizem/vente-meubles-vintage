const mysql = require('mysql2/promise');
const path = require('path');

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
require("dotenv").config({ path: path.resolve(__dirname, '..', '..', envFile), quiet: true });

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.USER_BDD || 'root',
  password: process.env.PASSWORD,
  database: process.env.DB_NAME || 'vente_meubles',
  port: Number(process.env.PORT_BDD) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

if (process.env.NODE_ENV !== 'test') {
  pool.getConnection()
    .then((connection) => {
      connection.release();
      console.log('Connecté à la base de données MySQL');
    })
    .catch((err) => {
      console.error('Erreur de connexion à la base de données :', err);
    });
}

module.exports = pool;

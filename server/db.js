const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config()

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 0
})

module.exports = connection;
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE_NAME,
});


module.exports = pool;

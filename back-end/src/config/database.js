const mysql = require("mysql2/promise");
const env = require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 20,
  host: env.parsed.DB_HOST,
  port: env.parsed.DB_PORT,
  user: env.parsed.DB_USER,
  password: env.parsed.DB_PWD,
  database: env.parsed.DB_NAME,
  multipleStatements: true,
});

module.exports = {
  pool: pool,
};
//module.exports = app

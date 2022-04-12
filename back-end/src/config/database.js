const mysql = require('mysql2/promise');
const env = require('dotenv').config();
let pool;

console.log('잘 들어왔니??');
console.log(env.parsed.DB_HOST);

pool = mysql.createPool({
	connectionLimit: 20,
	host: env.parsed.DB_HOST,
	port: env.parsed.DB_PORT,
	user: env.parsed.DB_USER,
	password: env.parsed.DB_PWD,
	database: env.parsed.DB_NAME,
	multipleStatements: true,
});
// console.log(pool);
// console.log(pool.pool);
// console.log(pool.config);

module.exports = {
	pool: pool,
};
//module.exports = app

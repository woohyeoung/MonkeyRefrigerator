//UserDao.js
const response = require('../utils/response');
const { pool } = require('../config/database');
const crypto = require('crypto');

module.exports = {
	selectUserAccount: async function (email, pw) {
		try {
			const password = crypto.createHash('sha512').update(pw).digest('base64');
			const query = `SELECT email FROM useraccount WHERE email=? and password=?;`;
			const params = [email, password];
			const connection = await pool.getConnection(async (conn) => conn);
			const [info] = await connection.query(query, params);
			connection.release();
			return info;
		} catch (err) {
			return response.successFalse(
				3001,
				'데이터베이스 연결에 실패하였습니다. UserDao error - selectUserAccount'
			);
		}
	},
	selectIdDoubleChk: async function (id, type) {
		try {
			const query = `SELECT count(*) as cnt FROM useraccount WHERE ${type}='${id}';`;
			const connection = await pool.getConnection(async (conn) => conn);
			const [info] = await connection.query(query);
			connection.release();
			return info;
		} catch (err) {
			return res.json(
				response.successFalse(
					3001,
					'데이터베이스 연결에 실패하였습니다. UserDao error - selectIdDoubleChk'
				)
			);
		}
	},
	insertSignup: async function (data) {
		try {
			const { password2, salt } = await createHashedPassword(data.password);

			connection.release();
			return info;
		} catch (err) {
			return res.json(
				response.successFalse(
					3001,
					'데이터베이스 연결에 실패하였습니다. UserDao error - selectIdDoubleChk'
				)
			);
		}
	},
	insertSignup: async function (data) {
		try {
			const password = crypto
				.createHash('sha512')
				.update(data.password)
				.digest('base64');
			const query = `insert into useraccount(email, password, nickname, name, jobId, gender, birthday) values(?, ?, ?, ?, ?, ?, ?);`;
			const params = [
				data.email,
				password,
				data.name,
				data.nickname,
				data.jobId,
				data.gender,
				data.birth,
			];

			const connection = await pool.getConnection(async (conn) => conn);
			connection.query(query, params, function (err, rows, fields) {
				if (err) {
					console.log(err);
				} else {
					console.log(rows.insertId);
				}
			});
			connection.release();
		} catch (err) {
			response.successFalse(
				3001,
				'데이터베이스 연결에 실패하였습니다. UserDao error - insertSignup'
			);
		}
	},
	selectUserInfo: async function (id) {
		try {
			const query = `SELECT *
                           FROM useraccount
                           WHERE email = '${id}';`;
			const connection = await pool.getConnection(async (conn) => conn);
			const [info] = await connection.query(query);
			connection.release();
			return info;
		} catch (err) {
			response.successFalse(
				3001,
				'데이터베이스 연결에 실패하였습니다. UserDao error - selectUserInfo'
			);
		}
	},

	selectUserGetMaterialCount: async function (userId) {
		try {
			const query = `select count(id) count
                           from usergetmaterial
                           where userId = ?;
            `;
			const connection = await pool.getConnection(async (conn) => conn);
			const params = [userId];
			const [info] = await connection.query(query, params);
			connection.release();
			return info[0].count;
		} catch (err) {
			response.successFalse(
				3001,
				'데이터베이스 연결에 실패하였습니다. UserDao error - selectUserInfo'
			);
		}
	},

	insertUserGetMaterial: async function (data) {
		try {
			const query = `insert into usergetmaterial(userId, materialId) value (?,?);`;
			const connection = await pool.getConnection(async (conn) => conn);
			const params = [data.userId, data.material.id];
			const [info] = await connection.query(query, params);
			connection.release();
			return info;
		} catch (err) {
			response.successFalse(
				3001,
				'데이터베이스 연결에 실패하였습니다. UserDao error - selectUserInfo'
			);
		}
	},
	selectUserGetMaterialUserId: async function (userId) {
		try {
			const query = `select ugm.id id, materialId, keyName
                           from usergetmaterial ugm
                                    join material_r mr on mr.id = ugm.materialId
                           where userId = ?;`;
			const connection = await pool.getConnection(async (conn) => conn);
			const params = [userId];
			const [row] = await connection.query(query, params);
			connection.release();
			return row;
		} catch (err) {
			response.successFalse(
				3001,
				'데이터베이스 연결에 실패하였습니다. UserDao error - selectUserInfo'
			);
		}
	},
	deleteUserGetMaterial: async function (data) {
		try {
			const query = `delete
                           from usergetmaterial
                           where userId = ?
                             and materialId = ?;`;
			const connection = await pool.getConnection(async (conn) => conn);
			const params = [data.userId, data.materialId];
			const [info] = await connection.query(query, params);
			connection.release();
			return info;
		} catch (err) {
			response.successFalse(
				3001,
				'데이터베이스 연결에 실패하였습니다. UserDao error - selectUserInfo'
			);
		}
	},
};

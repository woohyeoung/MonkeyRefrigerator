//BoardDao.js
const response = require('../utils/response');
// database 연결선
const { pool } = require('../config/database');

module.exports = {
	selectBoardList: async function () {
		try {
			// getConnection 연결
			const connection = await pool.getConnection(async (conn) => conn);
			console.log('11231231231223123');
			const query = `select * from board`;

			let [row] = await connection.query(query);

			connection.release();
			console(row);
			return row;
		} catch (err) {
			return res.json(
				response.successFalse(
					3001,
					'데이터베이스 연결에 실패하였습니다. BoardDao error - selectBoardList'
				)
			);
		}
	},
};

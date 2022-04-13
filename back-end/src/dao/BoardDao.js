//BoardDao.js
const response = require('../utils/response');
// database 연결선
const { pool } = require('../config/database');

module.exports = {
	selectBoardList: async function () {
		try {
			const query = `select b.id,b.title,b.subtitle, b.createAt,u.nickname,u.profileImg from board b join useraccount u on b.userId = u.id;`;
			const connection = await pool.getConnection(async (conn) => conn);
			const [rows] = await connection.query(query);
			connection.release();
			console.log(rows);
			return rows;
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

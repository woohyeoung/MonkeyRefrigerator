//BoardDao.js
const response = require('../utils/response');
// database 연결선
const { pool } = require('../config/database');

module.exports = {
	selectBoardListFirst: async function () {
		try {
			const query = `select b.id,
                                  b.title,
                                  b.subtitle,
                                  b.createAt,
                                  u.nickname,
                                  u.profileImg,
                                  c.name  category,
                                  bi.path boardImgPath
                           from board b
                                    join useraccount u on b.userId = u.id
                                    join category c on b.categoryId = c.id
                                    left join boardImage bi on b.id = bi.boardId
                           order by b.createAt desc, b.id limit 12;`;

			const connection = await pool.getConnection(async (conn) => conn);
			const [rows] = await connection.query(query);

			connection.release();
			// console.log(rows);
			return rows;
		} catch (err) {
			return res.json(
				response.successFalse(
					3001,
					'데이터베이스 연결에 실패하였습니다. BoardDao error - selectBoardListFirst'
				)
			);
		}
	},
	selectBoardList: async function (id, createAt) {
		try {
			const query = `select b.id,
                                  b.title,
                                  b.subtitle,
                                  b.createAt,
                                  u.nickname,
                                  u.profileImg,
                                  c.name  category,
                                  bi.path boardImgPath
                           from board b
                                    join useraccount u on b.userId = u.id
                                    join category c on b.categoryId = c.id
                                    left join boardImage bi on b.id = bi.boardId
                           where b.createAt <= ?
                             and b.id > ?
                           order by b.createAt desc, b.id limit 12;`;
			const params = [createAt, id];
			console.log(params);
			const connection = await pool.getConnection(async (conn) => conn);
			const [rows] = await connection.query(query, params);
			connection.release();
			// console.log(rows);
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
	selectBoardCount: async function () {
		try {
			const query = `select count(*) boardCount
                           from board;`;
			const connection = await pool.getConnection(async (conn) => conn);
			const [rows] = await connection.query(query);
			connection.release();
			return rows;
		} catch (err) {
			return res.json(
				response.successFalse(
					3001,
					'데이터베이스 연결에 실패하였습니다. BoardDao error - selectBoardCount'
				)
			);
		}
	},
	selectBoardCategory: async function () {
		try {
			const query = `select id, name from category;
;`;
			const connection = await pool.getConnection(async (conn) => conn);
			const [rows] = await connection.query(query);
			connection.release();
			return rows;
		} catch (err) {
			return res.json(
				response.successFalse(
					3001,
					'데이터베이스 연결에 실패하였습니다. BoardDao error - selectBoardCount'
				)
			);
		}
	},
};

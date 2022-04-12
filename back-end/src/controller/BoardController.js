//BoardController
const response = require('../utils/response');
const jwt = require('jsonwebtoken');

const boardDao = require('../dao/BoardDao');
const s3 = require('../utils/awsS3');

module.exports = {
	findBoardAll: async function (req, res) {
		try {
			const boardList = await boardDao.selectBoardList();
			console.log('123------------------');
			if (boardList === undefined) {
				return res.json(
					response.successFalse(1002, '전체 게시물 목록이 없습니다.')
				);
			}
			console.log(1234);

			return res.json(
				response.successTrue(
					2001,
					'전체 게시물 목록 조회에 성공하였습니다.',
					boardList
				)
			);
		} catch (err) {
			return res.json(
				response.successFalse(
					1001,
					'서버와 통신에 실패하였습니다. BoardController/BoardDao error - findBoardAll'
				)
			);
		}
	},
};

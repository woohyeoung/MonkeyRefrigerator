//indexController.js
//메인페이지 '/' 는 --> 이달의 투표, 인기 게시물 10, 인기셰프
//BoardController
const response = require('../utils/response');
const jwt = require('jsonwebtoken');

const boardDao = require('../dao/BoardDao');
const s3 = require('../utils/awsS3');

module.exports = {
	findIndex: async function (req, res) {
		try {
		} catch (err) {
			return res.json(
				response.successFalse(
					9001,
					'서버와 통신에 실패하였습니다. indexController error - findIndex'
				)
			);
		}
	},
};

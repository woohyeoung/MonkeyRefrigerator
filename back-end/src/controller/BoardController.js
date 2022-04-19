//BoardController
const response = require('../utils/response');
const jwt = require('jsonwebtoken');

const boardDao = require('../dao/BoardDao');
const s3 = require('../utils/awsS3');

module.exports = {
	findBoardAll: async function (req, res) {
		try {
			const boardList = await boardDao.selectBoardListFirst();
			const boardCount = await boardDao.selectBoardCount();
			boardList[0].boardCount = boardCount[0].boardCount;
			if (boardList === undefined) {
				return res.json(
					response.successFalse(1001, '전체 게시물 목록이 없습니다.')
				);
			}

			return res.json(
				response.successTrue(
					2001,
					'전체 게시물 첫번째 목록 조회에 성공하였습니다.',
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
	findBoardAllAfter: async function (req, res) {
		try {
			let id = req.query.id;
			let createAt = req.query.createAt;
			let newCreateAt = new Date(createAt);

			const boardList = await boardDao.selectBoardList(id, newCreateAt);

			if (boardList === undefined) {
				return res.json(
					response.successFalse(
						1002,
						'전체 게시물 목록 첫번째 이후 목록이 없습니다.'
					)
				);
			}

			return res.json(
				response.successTrue(
					2002,
					'전체 게시물 목록 첫번째 이후 목록 조회에 성공하였습니다.',
					boardList
				)
			);
		} catch (err) {
			return res.json(
				response.successFalse(
					1002,
					'서버와 통신에 실패하였습니다. BoardController/BoardDao error - findBoardAllAfter'
				)
			);
		}
	},
	findBoardCategory: async function (req, res) {
		try {
			const categoryList = await boardDao.selectBoardCategory();
			if (categoryList === undefined) {
				return res.json(
					response.successFalse(1003, '카테고리 목록이 없습니다.')
				);
			}

			return res.json(
				response.successTrue(
					2003,
					'카테고리 목록 조회에 성공하였습니다.',
					categoryList
				)
			);
		} catch (err) {
			return res.json(
				response.successFalse(
					1003,
					'서버와 통신에 실패하였습니다. BoardController/BoardDao error - findBoardCategory'
				)
			);
		}
	},

	findMaterialKeyword: async function (req, res) {
		try {
			let keyword = req.query.keyword;
			const materailList = await boardDao.selectMaterialKey(keyword);
			if (materailList === undefined) {
				return res.json(response.successFalse(1004, '해당 재료가 없습니다.'));
			}

			return res.json(
				response.successTrue(
					2004,
					'해당 재료 조회에 성공하였습니다.',
					materailList
				)
			);
		} catch (err) {
			return res.json(
				response.successFalse(
					1004,
					'서버와 통신에 실패하였습니다. BoardController/BoardDao error - findMaterialKeyword'
				)
			);
		}
	},

	saveBoardOne: async function (req, res) {
		try {
			let token = req.tokenInfo;
			console.log(req.tokenInfo);
			let board = {
				user: {
					id: userId,
				},
				category: {
					id: req.body.category.id,
				},
				title: req.body.title,
				subtitle: req.body.subtitle,
				content: req.body.content,
				difficulty: req.body.difficulty,
				cookTime: req.body.cookTime,
				subMaterial: req.body.subMaterial,
				tagName: req.body.tagName,
			};

			console.log(board);

			if (!req.files[0]) {
				return res.json(
					response.successFalse(3060, '이미지를 1장 이상 넣어주세요.')
				);
			}

			const boardId = await boardDao.insertBoardId(board);

			let boardimagePath;
			let boardimageType;
			let boardimageSize;

			const promises = req.files.map(async (file) => {
				boardimagePath = file.location;
				boardimageType = file.contentType;
				boardimageSize = file.size;

				await boardDao.insertBoardIdImg(
					boardId,
					boardimagePath,
					boardimageType,
					boardimageSize
				);
			});
			await Promise.all(promises);

			return res.json(
				response.successTrue(5102, '게시물 저장에 성공하였습니다.')
			);
		} catch (err) {
			return res.json(
				response.successFalse(
					1005,
					'서버와 통신에 실패하였습니다. BoardController/BoardDao error - saveBoardOne'
				)
			);
		}
	},

	findBoardDetail: async function (req, res) {
		try {
			let id = req.query.id;
			const boardDetail = await boardDao.selectBoardDetail(id);

			if (boardDetail === undefined) {
				return res.json(
					response.successFalse(1002, '전체 게시물 목록이 없습니다.')
				);
			}

			return res.json(
				response.successTrue(
					2001,
					'전체 게시물 첫번째 목록 조회에 성공하였습니다.',
					boardDetail
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

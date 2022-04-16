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
                    response.successFalse(1002, '전체 게시물 목록이 없습니다.')
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
                    response.successFalse(1002, '전체 게시물 목록 첫번째 이후 목록이 없습니다.')
                );
            }

            return res.json(
                response.successTrue(
                    2001,
                    '전체 게시물 목록 첫번째 이후 목록 조회에 성공하였습니다.',
                    boardList
                )
            );
        } catch (err) {
            return res.json(
                response.successFalse(
                    1001,
                    '서버와 통신에 실패하였습니다. BoardController/BoardDao error - findBoardAllAfter'
                )
            );
        }
    },
    findBoardCategory: async function (req, res) {
        try {

            const categoryList = await boardDao.selectBoardCategory();
            console.log(categoryList)
            if (categoryList === undefined) {
                return res.json(
                    response.successFalse(1002, '카테고리 목록이 없습니다.')
                );
            }

            return res.json(
                response.successTrue(
                    2001,
                    '카테고리 목록 조회에 성공하였습니다.',
                    categoryList
                )
            );
        } catch (err) {
            return res.json(
                response.successFalse(
                    1001,
                    '서버와 통신에 실패하였습니다. BoardController/BoardDao error - findBoardCategory'
                )
            );
        }
    },

};

//BoardController
const response = require("../utils/response");
const jwt = require("jsonwebtoken");

const boardDao = require("../dao/BoardDao");
const s3 = require("../utils/awsS3");
const { selectBoardImg } = require("../dao/BoardDao");

module.exports = {
  findBoardAll: async function (req, res) {
    try {
      const boardList = await boardDao.selectBoardListFirst();
      for (let i = 0; i < boardList.length; i++) {
        for (let j = 0; j < boardList[i].length; j++) {
          let boardImg = await boardDao.selectBoardImg(boardList[i][j].id);
          if (boardImg.length === 0) {
            boardList[i][j].boardImgPath = "";
          } else {
            boardList[i][j].boardImgPath = boardImg[0].boardImgPath;
          }
        }
      }

      const boardCount = await boardDao.selectBoardCount();
      boardList[0][0].boardCount = boardCount[0].boardCount;

      if (boardList[0].length === 0) {
        return res.json(
          response.successFalse(1001, "전체 게시물 목록이 없습니다.")
        );
      }

      return res.json(
        response.successTrue(
          2001,
          "전체 게시물 첫번째 목록 조회에 성공하였습니다.",
          boardList
        )
      );
    } catch (err) {
      return res.json(
        response.successFalse(
          1001,
          "서버와 통신에 실패하였습니다. BoardController/BoardDao error - findBoardAll"
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
      for (let i = 0; i < boardList.length; i++) {
        let boardImg = await boardDao.selectBoardImg(boardList[i].id);
        if (boardImg.length === 0) {
          boardList[i].boardImgPath = "";
        } else {
          boardList[i].boardImgPath = boardImg[0].boardImgPath;
        }
      }

      if (boardList.length === 0) {
        return res.json(
          response.successFalse(
            1002,
            "전체 게시물 목록 첫번째 이후 목록이 없습니다."
          )
        );
      }

      return res.json(
        response.successTrue(
          2002,
          "전체 게시물 목록 첫번째 이후 목록 조회에 성공하였습니다.",
          boardList
        )
      );
    } catch (err) {
      return res.json(
        response.successFalse(
          1002,
          "서버와 통신에 실패하였습니다. BoardController/BoardDao error - findBoardAllAfter"
        )
      );
    }
  },
  findBoardAllKeyword: async function (req, res) {
    let keyword = req.query.keyword;
    try {
      const boardList = await boardDao.selectBoardListKeywordFirst(keyword);

      for (let i = 0; i < boardList.length; i++) {
        let boardImg = await boardDao.selectBoardImg(boardList[i].id);
        if (boardImg.length === 0) {
          boardList[i].boardImgPath = "";
        } else {
          boardList[i].boardImgPath = boardImg[0].boardImgPath;
        }
      }

      boardList[0].boardCount = boardList.length;
      if (boardList.length === 0) {
        return res.json(
          response.successFalse(1001, "검색 게시물 목록이 없습니다.")
        );
      }

      return res.json(
        response.successTrue(
          2001,
          "검색 게시물 첫번째 목록 조회에 성공하였습니다.",
          boardList
        )
      );
    } catch (err) {
      return res.json(
        response.successFalse(
          1001,
          "서버와 통신에 실패하였습니다. BoardController/BoardDao error - findBoardAllKeyword"
        )
      );
    }
  },
  findBoardAllKeywordAfter: async function (req, res) {
    try {
      let id = req.query.id;
      let createAt = req.query.createAt;
      let keyword = req.query.keyword;
      let newCreateAt = new Date(createAt);

      const boardList = await boardDao.selectBoardListKeyword(
        id,
        newCreateAt,
        keyword
      );
      for (let i = 0; i < boardList.length; i++) {
        let boardImg = await boardDao.selectBoardImg(boardList[i].id);
        if (boardImg.length === 0) {
          boardList[i].boardImgPath = "";
        } else {
          boardList[i].boardImgPath = boardImg[0].boardImgPath;
        }
      }

      if (boardList.length === 0) {
        return res.json(
          response.successFalse(
            1002,
            "검색 게시물 목록 첫번째 이후 목록이 없습니다."
          )
        );
      }

      return res.json(
        response.successTrue(
          2002,
          "검색 게시물 목록 첫번째 이후 목록 조회에 성공하였습니다.",
          boardList
        )
      );
    } catch (err) {
      return res.json(
        response.successFalse(
          1002,
          "서버와 통신에 실패하였습니다. BoardController/BoardDao error - findBoardAllKeywordAfter"
        )
      );
    }
  },

  findBoardCategory: async function (req, res) {
    try {
      const categoryList = await boardDao.selectBoardCategory();
      if (categoryList.length === 0) {
        return res.json(
          response.successFalse(1003, "카테고리 목록이 없습니다.")
        );
      }

      return res.json(
        response.successTrue(
          2003,
          "카테고리 목록 조회에 성공하였습니다.",
          categoryList
        )
      );
    } catch (err) {
      return res.json(
        response.successFalse(
          1003,
          "서버와 통신에 실패하였습니다. BoardController/BoardDao error - findBoardCategory"
        )
      );
    }
  },

  findMaterialKeyword: async function (req, res) {
    try {
      let keyword = req.query.keyword;
      const materailList = await boardDao.selectMaterialKey(keyword);
      if (materailList.length === 0) {
        return res.json(response.successFalse(1004, "해당 재료가 없습니다."));
      }

      return res.json(
        response.successTrue(
          2004,
          "해당 재료 조회에 성공하였습니다.",
          materailList
        )
      );
    } catch (err) {
      return res.json(
        response.successFalse(
          1004,
          "서버와 통신에 실패하였습니다. BoardController/BoardDao error - findMaterialKeyword"
        )
      );
    }
  },

  saveBoardOne: async function (req, res) {
    try {
      let userId = req.tokenInfo.userId;
      let board = {
        user: {
          id: userId,
        },
        category: {
          id: req.body.category,
        },
        title: req.body.title,
        subtitle: req.body.subTitle,
        content: req.body.content,
        difficulty: req.body.difficulty,
        cookTime: req.body.cookTime,
        subMaterial: req.body.subs,
        tagName: req.body.tags,
      };

      if (!req.files[0]) {
        return res.json(
          response.successFalse(3060, "이미지를 1장 이상 넣어주세요.")
        );
      }

      const boardId = await boardDao.insertBoardId(board);
      let materials = [];

      if (typeof req.body.material === "string") {
        materials.push({
          materialId: req.body.material,
          materialCount: req.body.materialCount,
        });
      } else {
        for (let i = 0; i < req.body.material.length; i++) {
          materials.push({
            materialId: req.body.material[i],
            materialCount: req.body.materialCount[i],
          });
        }
      }

      let materialId;
      let materialCount;
      // 어떤것이 먼저 insert 되도 상관없기 때문에 promise
      const promiseMaterial = materials.map(async (item) => {
        materialId = item.materialId;
        materialCount = item.materialCount;
        await boardDao.insertBoardGetMaterial(
          boardId,
          materialId,
          materialCount
        );
      });
      await Promise.all(promiseMaterial);

      let boardimagePath;
      let boardimageType;
      let boardimageSize;

      const promiseboardImg = req.files.map(async (file) => {
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
      await Promise.all(promiseboardImg);

      return res.json(
        response.successTrue(5102, "게시물 저장에 성공하였습니다.")
      );
    } catch (err) {
      return res.json(
        response.successFalse(
          1005,
          "서버와 통신에 실패하였습니다. BoardController/BoardDao error - saveBoardOne"
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
          response.successFalse(1006, "전체 게시물 목록이 없습니다.")
        );
      }

      return res.json(
        response.successTrue(
          2006,
          "전체 게시물 첫번째 목록 조회에 성공하였습니다.",
          boardDetail
        )
      );
    } catch (err) {
      return res.json(
        response.successFalse(
          1006,
          "서버와 통신에 실패하였습니다. BoardController/BoardDao error - findBoardAll"
        )
      );
    }
  },

  findBoardViewAllAfter: async function (req, res) {
    try {
      let id = req.query.id;
      let viewCount = req.query.viewCount;

      const boardList = await boardDao.selectBoardListView(id, viewCount);
      for (let i = 0; i < boardList.length; i++) {
        let boardImg = await boardDao.selectBoardImg(boardList[i].id);
        if (boardImg.length === 0) {
          boardList[i].boardImgPath = "";
        } else {
          boardList[i].boardImgPath = boardImg[0].boardImgPath;
        }
      }

      if (boardList.length === 0) {
        return res.json(
          response.successFalse(
            1002,
            "전체 게시물 목록 첫번째 이후 목록이 없습니다."
          )
        );
      }

      return res.json(
        response.successTrue(
          2002,
          "전체 게시물 목록 첫번째 이후 목록 조회에 성공하였습니다.",
          boardList
        )
      );
    } catch (err) {
      return res.json(
        response.successFalse(
          1002,
          "서버와 통신에 실패하였습니다. BoardController/BoardDao error - findBoardAllAfter"
        )
      );
    }
  },
};

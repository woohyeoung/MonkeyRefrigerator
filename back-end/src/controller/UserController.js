//UserController.js
const response = require("../utils/response");
const userDao = require("../dao/UserDao");
const generateToken = require("../config/secret");
const jwt = require("jsonwebtoken");

module.exports = {
  getToken: async (req, res) => {
    const email = req.body.email;
    const pw = req.body.pw;
    try {
      const user = await userDao.selectUserAccount(email, pw);
      if (user === undefined) {
        return res.json(response.successFalse(6770, "유저 목록이 없습니다."));
      }
      let accessToken = generateToken(user[0].id, user[0].email);
      return res.json(
        response.successTrue(6771, "토큰을 전달하였습니다.", accessToken)
      );
    } catch (err) {
      return response.successFalse(
        1001,
        "서버와 통신에 실패하였습니다. UserController/UserDao error - getToken"
      );
    }
  },
  idDoubleChk: async (req, res) => {
    const id = req.query.id;
    const type = req.query.type;

    try {
      const cnt = await userDao.selectIdDoubleChk(id, type);

      if (!cnt) {
        return res.json(
          response.successFalse(7101, "결과 값이 존재 하지 않습니다.")
        );
      }

      return res.json(
        response.successTrue(7002, "결과 값 조회에 성공했습니다.", cnt)
      );
    } catch (err) {
      return res.json(
        response.successFalse(
          1001,
          "서버와 통신에 실패하였습니다. UserController/UserDao error - idDoubleChk"
        )
      );
    }
  },
  signupInsert: async function (req, res) {
    const data = req.body;
    try {
      const signupformInsert = await userDao.insertSignup(data);
    } catch (err) {
      return res.json(
        response.successFalse(
          1001,
          "서버와 통신에 실패하였습니다. UserController/UserDao error - signupInsert"
        )
      );
    }
  },
  getUserInformation: async function (req, res) {
    try {
      const token = req.tokenInfo;
      const userInfo = await userDao.selectUserInfo(token.userId);
      if (userInfo === undefined) {
        return res.json(
          response.successFalse(1002, "전체 게시물 목록이 없습니다.")
        );
      } else {
        return res.json(
          response.successTrue(
            2001,
            "게시물 목록 조회에 성공하였습니다.",
            userInfo
          )
        );
      }
    } catch (err) {
      return res.json(
        response.successFalse(
          1001,
          "서버와 통신에 실패하였습니다. UserController/UserDao error - getUserInformation"
        )
      );
    }
  },

  saveUserMaterialOne: async function (req, res) {
    const materialId = req.body.material.id;
    const userId = req.tokenInfo.userId;

    try {
      if (materialId === null || materialId === undefined) {
        return res.json(
          response.successFalse(7101, "저장하려는 재료가 존재하지 않습니다.")
        );
      }

      let exists = await userDao.selectExistMaterialId(userId, materialId);

      if (exists.exist === 1) {
        return res.json(
          response.successFalse(7101, "이미 존재하는 재료입니다.")
        );
      }
      let cnt = await userDao.selectUserGetMaterialCount(data.userId);
      if (cnt > 5) {
        return res.json(
          response.successFalse(7101, "5개이상 담을 수 없습니다.")
        );
      }
      let insertInfo = await userDao.insertUserGetMaterial(userId, materialId);
      return res.json(
        response.successTrue(
          1001,
          "해당 회원이 가지고 있는 재료 1개를 추가하였습니다.",
          insertInfo
        )
      );
    } catch (err) {
      return res.json(
        response.successFalse(
          1001,
          "서버와 통신에 실패하였습니다. UserController/UserDao error - saveUserMaterialOne"
        )
      );
    }
  },

  findUserMaterialUserId: async function (req, res) {
    let userId = req.tokenInfo.userId;
    try {
      let userMaterialList = await userDao.selectUserGetMaterialUserId(userId);

      return res.json(
        response.successTrue(
          2001,
          "회원이 가지고 있는 재료 목록 조회에 성공하였습니다.",
          userMaterialList
        )
      );
    } catch (err) {
      return res.json(
        response.successFalse(
          1001,
          "서버와 통신에 실패하였습니다. UserController/UserDao error - findUserMaterialUserId"
        )
      );
    }
  },

  deleteUserMaterialOne: async function (req, res) {
    const materialId = req.query.materialId;
    const userId = req.tokenInfo.userId;

    try {
      if (materialId === null || materialId === undefined) {
        return res.json(
          response.successFalse(7101, "삭제 하려는 재료가 존재 하지 않습니다.")
        );
      }
      let exists = await userDao.selectExistMaterialId(userId, materialId);

      if (exists.exist === 0) {
        return res.json(
          response.successFalse(7101, "삭제 하려는 재료가 존재 하지 않습니다")
        );
      }

      let deleteInfo = await userDao.deleteUserGetMaterial(userId, materialId);

      return res.json(
        response.successTrue(
          1001,
          "해당 회원이 가지고 있는 재료 1개를 삭제하였습니다.",
          deleteInfo
        )
      );
    } catch (err) {
      return res.json(
        response.successFalse(
          1001,
          "서버와 통신에 실패하였습니다. UserController/UserDao error - deleteUserMaterialOne"
        )
      );
    }
  },
  voteValid: async (req, res) => {
    try {
      let tokenId = req.tokenInfo.userId;
      const userVote = await userDao.selectUserVote(tokenId);
      if (userVote.length > 0)
        return res.json(
          response.successTrue(1001, "이미 투표를 완료하였습니다.", userVote)
        );
      return res.json(
        response.successFalse(2001, "아직 투표를 완료하지 않았습니다.")
      );
    } catch {
      return res.json(
        response.successFalse(
          1001,
          "서버와 통신에 실패하였습니다. UserController/UserDao error - voteValid"
        )
      );
    }
  },
  voteUser: async (req, res) => {
    try {
      const user = req.tokenInfo.userId;
      const board = req.body.body.boardId;
      const result = await userDao.insertUserVote(board, user);
      return res.json(response.successTrue(1001, "투표 입력 완료", result));
    } catch {
      return res.json(
        response.successFalse(
          1001,
          "서버와 통신에 실패하였습니다. UserController/UserDao error - voteValid"
        )
      );
    }
  },
  changePassword: async function (req, res) {
    try {
      const userId = req.tokenInfo.userId;
      const pw = req.body.body.password;
      const data = { userId: userId, pw: pw };
      const result = await userDao.updatePassword(data);

      return res.json(
        response.successTrue(
          2100,
          "결과 값 변경에 성공했습니다.",
          result[0].changedRows
        )
      );
    } catch (err) {
      return res.json(
        response.successFalse(
          1001,
          "서버와 통신에 실패하였습니다. UserController/UserDao error - changePassword"
        )
      );
    }
  },
  updateUserIn: async (req, res) => {
    try {
      let data = req.body.body.data;
      const updateinfo = await userDao.updateInfo(data);
      return res.json(
        response.successTrue(
          1001,
          "유저 정보의 업데이트를 완료하였습니다.",
          updateinfo
        )
      );
    } catch (err) {
      return res.json(
        response.successFalse(
          1001,
          "서버와 통신에 실패하였습니다. UserController/UserDao error - updateUserInfo"
        )
      );
    }
  },
  getBoardRank: async (req, res) => {
    try {
      const [...rankList] = await userDao.selectVoteBoardRank();
      if (rankList.length < 1)
        return res.json(
          response.successFalse(2001, "게시물 목록 조회에 실패하였습니다.")
        );
      return res.json(
        response.successTrue(2001, "게시물 목록을 조회하였습니다.", rankList)
      );
    } catch (error) {
      return res.json(
        response.successFalse(
          1001,
          "서버와 통신에 실패하였습니다. UserController/UserDao error - getBoardRank"
        )
      );
    }
  },
  getRankVote: async (req, res) => {
    try {
      const [...voteList] = await userDao.selectRankBoardVote();
      if (voteList.length < 1) {
        return res.json(
          response.successFalse(2001, "게시물 목록 조회에 실패하였습니다.")
        );
      }
      return res.json(
        response.successTrue(2001, "게시물 목록 조회에 성공하였습니다.")
      );
    } catch (error) {
      return res.json(
        response.successFalse(
          1001,
          "서버와 통신에 실패하였습니다. UserController/UserDao error - getRankVote"
        )
      );
    }
  },
};

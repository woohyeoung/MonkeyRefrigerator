//UserController.js
const response = require("../utils/response");
const userDao = require("../dao/UserDao");
const generateToken = require("../config/secret");
const UserDao = require("../dao/UserDao");
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
      const signupformInsert = await UserDao.insertSignup(data);
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
      console.log("hihihihihih");
      const token = req.tokenInfo;

      const userInfo = await UserDao.selectUserInfo(token.userId);
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
    const data = req.body;
    console.log(data);
    data.userId = req.tokenInfo.userId;
    console.log(data.userId);
    try {
      let cnt = await UserDao.selectUserGetMaterialCount(data.userId);
      if (cnt > 5) {
        return res.json(
          response.successFalse(7101, "5개이상 담을 수 없습니다.")
        );
      }
      let insertInfo = await UserDao.insertUserGetMaterial(data);
      return res.json(
        response.successTrue(
          1001,
          "해당 회원이 가지고 있는  재료 1개를 추가하였습니다.",
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
      let userMaterialList = await UserDao.selectUserGetMaterialUserId(userId);

      // if (userMaterialList.length === 0) {
      //     return res.json(response.successFalse(1004, '회원이 가지고 있는 재료 목록이 없습니다.'));
      // }

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
    const data = req.body;
    console.log(data);
    data.userId = req.tokenInfo.userId;
    try {
      let deleteInfo = await UserDao.deleteUserGetMaterial(data);
      return res.json(
        response.successTrue(
          1001,
          "해당 회원이 가지고 있는  재료 1개를 추가하였습니다.",
          deleteInfo
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
  voteValid: async (req, res) => {
    try {
      let tokenId = req.tokenInfo.userId;
      const userVote = await UserDao.selectUserVote(tokenId);
      console.log(userVote);
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
      const board = req.body.boardId;
      const result = await UserDao.insertUserVote(board, user);
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
      const result = await UserDao.updatePassword(data);

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
};

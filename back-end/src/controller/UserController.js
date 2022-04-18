//UserController.js
const response = require("../utils/response");
const userDao = require("../dao/UserDao");
const generateToken = require("../config/secret");
const UserDao = require("../dao/UserDao");

module.exports = {
  getToken: async (req, res) => {
    const email = req.body.email;
    const pw = req.body.pw;
    try {
      const user = await userDao.selectUserAccount(email, pw);
      if (user === undefined) {
        return res.json(response.successFalse(6770, "유저 목록이 없습니다."));
      }
      let accessToken = generateToken(user[0].email);

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
};

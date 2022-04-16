//UserController.js
const response = require("../utils/response");
const userDao = require("../dao/UserDao");
const generateToken = require("../config/secret");

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
    const id = req.body.id;
    try {
      const user = await userDao.selectIdDoubleChk(id);
      if (user !== undefined) {
        return res.json(
          response.successTrue(7000, "중복된 아이디가 있습니다.", user)
        );
      } else {
        return res.json(
          response.successTrue(7002, "중복된 아이디가 없습니다.", user)
        );
      }
    } catch (err) {
      return res.json(
        response.successFalse(
          1001,
          "서버와 통신에 실패하였습니다. UserController/UserDao error - idDoubleChk"
        )
      );
    }
  },
};

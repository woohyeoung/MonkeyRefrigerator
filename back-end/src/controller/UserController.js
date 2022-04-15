//UserController.js
const response = require("../utils/response");
const userDao = require("../dao/UserDao");
const generateToken = require("../config/secret");

module.exports = {
  findUser: async (req, res) => {
    const email = req.body.email;
    const pw = req.body.pw;
    try {
      const user = await userDao.selectUserAccount(email, pw);
      if (user === undefined) {
        return res.json(response.successFalse(6770, "유저 목록이 없습니다."));
      }
      return res.json(
        response.successTrue(6771, "유저 정보를 전달하였습니다.", user)
      );
    } catch (err) {
      return res.json(
        response.successFalse(
          1001,
          "서버와 통신에 실패하였습니다. UserController/UserDao error - findUser"
        )
      );
    }
  },
};

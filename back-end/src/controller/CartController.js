const response = require("../utils/response");
module.exports = {
  getId: async (req, res) => {
    const id = req.tokenInfo.userId;
    try {
      if (id === undefined)
        return res.json(response.successFalse(6770, "유저 목록이 없습니다."));
      return res.json(
        response.successTrue(6770, "유저의 아이디 조회에 성공하였습니다.", id)
      );
    } catch (err) {
      return response.successFalse(
        1001,
        "서버와 통신에 실패하였습니다. UserController/UserDao error - getToken"
      );
    }
  },
};

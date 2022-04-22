const response = require("../utils/response");
const cartDao = require("../dao/CartDao");
module.exports = {
  getInfo: async (req, res) => {
    const id = req.tokenInfo.userId;
    try {
      const [result] = await cartDao.selectUserCart();
      if (result.length < 1)
        return res.json(response.successFalse(1201, "유저 목록이 없습니다."));
      return res.json(
        response.successTrue(
          2201,
          "유저의 장바구니 조회에 성공하였습니다.",
          result
        )
      );
    } catch (err) {
      return response.successFalse(
        3201,
        "서버와 통신에 실패하였습니다. CartController/CartDao error - GET"
      );
    }
  },
  addInfo: async (req, res) => {
    const id = req.tokenInfo.userId;
    try {
      const [result] = await cartDao.insertUserCart();
      if (result.length < 1)
        return res.json(response.successFalse(1202, "유저 목록이 없습니다."));
      return res.json(
        response.successTrue(
          2202,
          "유저의 장바구니 추가에 성공하였습니다.",
          result
        )
      );
    } catch (err) {
      return response.successFalse(
        3202,
        "서버와 통신에 실패하였습니다. CartController/CartDao error - ADD"
      );
    }
  },
  delInfo: async (req, res) => {
    const id = req.tokenInfo.userId;
    try {
      const [result] = await cartDao.deleteUserCart();
      if (result.length < 1)
        return res.json(response.successFalse(1203, "유저 목록이 없습니다."));
      return res.json(
        response.successTrue(
          2203,
          "유저의 장바구니 삭제에 성공하였습니다.",
          result
        )
      );
    } catch (err) {
      return response.successFalse(
        3203,
        "서버와 통신에 실패하였습니다. CartController/CartDao error - DEL"
      );
    }
  },
};

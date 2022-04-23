const response = require("../utils/response");
const cartDao = require("../dao/CartDao");
module.exports = {
  getInfo: async (req, res) => {
    try {
      const id = req.tokenInfo.userId;
      const result = await cartDao.selectUserCart(id);
      // if (result.length < 1)
      //   return res.json(response.successFalse(1201, "유저 목록이 없습니다."));
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
    const board = req.body.body.board;
    try {
      if (id === undefined)
        return res.json(response.successFalse(1202, "유저 목록이 없습니다."));
      const overlap = await cartDao.selectUserCartt(board, id);
      if (overlap.length > 0)
        return res.json(
          response.successFalse(1202, "이미 목록에 담겨져 있는 게시물입니다.")
        );
      await cartDao.insertUserCart(board, id);
      return res.json(
        response.successTrue(2202, "유저의 장바구니 추가에 성공하였습니다.")
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
    const board = req.body.body.board;
    try {
      if (board === undefined)
        return res.json(response.successFalse(1203, "게시물 목록이 없습니다."));
      await cartDao.deleteUserCart(board, id);
      return res.json(
        response.successTrue(2203, "유저의 장바구니 삭제에 성공하였습니다.")
      );
    } catch (err) {
      return response.successFalse(
        3203,
        "서버와 통신에 실패하였습니다. CartController/CartDao error - DEL"
      );
    }
  },
};

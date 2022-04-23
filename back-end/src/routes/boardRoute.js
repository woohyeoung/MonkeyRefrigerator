const board = require("../controller/BoardController");
module.exports = function (app) {
  const board = require("../controller/BoardController");
  const s3 = require("../utils/awsS3");
  const jwtMiddleware = require("../config/jwt");

  app.route("/board").get(board.findBoardAll);
  app.route("/board/page").get(board.findBoardAllAfter);
  app.route("/board/view/page").get(board.findBoardViewAllAfter);
  app.route("/board/keyword").get(board.findBoardAllKeyword);
  app.route("/board/keyword/page").get(board.findBoardAllKeywordAfter);
  app.route("/board/category").get(board.findBoardCategory);

  app.route("/board/detail").get(board.findBoardDetail);

  app.route("/board/material/search").get(board.findMaterialKeyword);
  app
    .route("/board/create")
    .post(
      jwtMiddleware,
      s3.upload("/board").array("image", 5),
      board.saveBoardOne
    );
};

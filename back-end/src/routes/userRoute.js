//userRoute.js

module.exports = function (app) {
  const user = require("../controller/UserController");
  const jwtMiddleware = require("../config/jwt");

  app.route("/login").post(user.getToken);
  app.route("/idChk").get(user.idDoubleChk);
  app.route("/signupInsert").post(user.signupInsert);
  app.route("/profile").get(jwtMiddleware, user.getUserInformation);

  app.route("/user/material").post(jwtMiddleware, user.saveUserMaterialOne);
  app.route("/user/material").get(jwtMiddleware, user.findUserMaterialUserId);
  app.route("/user/material").delete(jwtMiddleware, user.deleteUserMaterialOne);

  app.route("/uservote").get(jwtMiddleware, user.voteValid);
  app.route("/voteadd").post(jwtMiddleware, user.voteUser);

  app.route("/pwChange").post(jwtMiddleware, user.changePassword);
  app.route("/updateinfo").post(jwtMiddleware, user.updateUserIn);
  app.route("/boardrank").get(user.getBoardRank);
  app.route("/getrankboard").get(user.getRankVote);
};

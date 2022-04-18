//userRoute.js

module.exports = function (app) {
  const user = require("../controller/UserController");
  const jwtMiddleware = require("../config/jwt");

  app.route("/login").post(user.getToken);
  app.route("/idChk").get(user.idDoubleChk);
  app.route("/signupInsert").post(user.signupInsert);
  //app.route("/user").get(user.);
};

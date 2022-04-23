const jwtMiddleware = require("../config/jwt");
module.exports = function (app) {
  const jwtMiddleware = require("../config/jwt");
  const refri = require("../controller/RefrigeratorController");
  app.route("/refrigerator").get(jwtMiddleware, refri.findRefrigerator);
};

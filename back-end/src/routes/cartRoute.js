module.exports = function (app) {
  const cart = require("../controller/CartController");
  const jwtMiddleware = require("../config/jwt");

  app.route("/cart").get(jwtMiddleware, cart.getId);
};

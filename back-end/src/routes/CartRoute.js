module.exports = function (app) {
  const cart = require("../controller/CartController");
  const jwtMiddleware = require("../config/jwt");

  app.route("/cart/get").get(jwtMiddleware, cart.getInfo);
  app.route("/cart/add").post(jwtMiddleware, cart.addInfo);
  app.route("/cart/del").post(jwtMiddleware, cart.delInfo);
};

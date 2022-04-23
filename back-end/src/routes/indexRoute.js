//indexRoute, 뿌리 Route

module.exports = function (app) {
  const index = require("../controller/IndexContoller");
  app.route("/").get(index.findIndex);
  require("./boardRoute")(app);
  require("./userRoute")(app);
  require("./refrigeratorRoute")(app);
  require("./cartRoute")(app);
};

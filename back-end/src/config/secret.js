//JWT Provide
require("dotenv").config();
const secretKey = process.env.ACCESS_TOKEN_SECRET;
const jwt = require("jsonwebtoken");

//create token, reset 5 min
exports.generateAccessToken = (id) => {
  return jwt.sign({ id }, secretKey, {
    expiresIn: "5m",
  });
};

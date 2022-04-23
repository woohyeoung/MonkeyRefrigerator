//JWT Provide
require("dotenv").config();
const secretKey = process.env.ACCESS_TOKEN_SECRET;
const jwt = require("jsonwebtoken");

module.exports = function generateAccessToken(userId, email) {
  let token = jwt.sign({ userId, email }, secretKey, {
    expiresIn: "1h",
  });
  return token;
};

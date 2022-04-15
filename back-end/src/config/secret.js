//JWT Provide
require("dotenv").config();
const secretKey = process.env.ACCESS_TOKEN_SECRET;
const jwt = require("jsonwebtoken");

module.exports = function generateAccessToken(email) {
  let token = jwt.sign({ email }, secretKey, {
    expiresIn: 60 * 60,
  });
  return token;
};

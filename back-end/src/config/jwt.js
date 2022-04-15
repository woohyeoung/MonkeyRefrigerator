//JWT Admin
require("dotenv").config();
const secretKey = process.env.ACCESS_TOKEN_SECRET;
const jwt = require("jsonwebtoken");
const response = require("../utils/response");

module.exports = authMiddleware = async (req, res, next) => {
  const accessToken = req.header("Access-Token");
  if (accessToken == null) {
    res
      .status(403)
      .json(response.successFalse(403, "유효하지 않은 토큰입니다."));
  } else {
    try {
      const tokenInfo = await new Promise((resolve, reject) => {
        jwt.verify(accessToken, secretKey, (err, decoded) => {
          if (err) reject(err);
          else resolve(decoded);
        });
      });
      req.tokenInfo = tokenInfo;
      next();
    } catch (err) {
      switch (error.name) {
        case "TokenExpiredError":
          return res
            .status(419)
            .json(response.successFalse(419, "토큰이 만료되었습니다."));
        case "JsonWebTokenError":
          return res
            .status(401)
            .json(response.successFalse(401, "유효하지 않은 토큰입니다."));
      }
    }
  }
};

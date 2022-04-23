//JWT Validation
require("dotenv").config();
const secretKey = process.env.ACCESS_TOKEN_SECRET;
const jwt = require("jsonwebtoken");
const response = require("../utils/response");

module.exports = jwtMiddleware = async (req, res, next) => {
  const accessToken =
    req.get("accessToken") ||
    req.headers.accessToken ||
    req.headers["accessToken"];

  if (accessToken == undefined || !accessToken) {
    return res.json(response.successFalse(403, "유효하지 않은 토큰입니다."));
  } else {
    try {
      const tokenInfo = await new Promise((resolve, reject) => {
        jwt.verify(accessToken, secretKey, (err, decoded) => {
          if (err) reject(err);
          else resolve(decoded);
        });
      });
      req.tokenInfo = tokenInfo;
      console.log("토큰 유효성 검사 완료");
      next();
    } catch (err) {
      switch (err.name) {
        case "TokenExpiredError":
          return res.json(response.successFalse(419, "토큰이 만료되었습니다."));
        case "JsonWebTokenError":
          return res.json(
            response.successFalse(401, "유효하지 않은 토큰입니다.")
          );
      }
    }
  }
};

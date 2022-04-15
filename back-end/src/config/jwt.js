//JWT Admin
require("dotenv").config();
const secretKey = process.env.ACCESS_TOKEN_SECRET;
const jwt = require("jsonwebtoken");
const resposnse = require("../utils/response");

//Callback function
exports.module = auth = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, secretKey);
    return next();
  } catch (error) {
    switch (error.name) {
      case "TokenExpiredError":
        return resposnse.successFalse(419, "토큰이 만료되었습니다.");
      case "JsonWebTokenError":
        return resposnse.successFalse(401, "유효하지 않은 토큰입니다.");
    }
  }
};

// //create token, reset 5 min
// export const generateAccessToken = (id) => {
//   return jwt.sign({ id }, secretKey, {
//     expiresIn: "5m",
//   });
// };
// //validation
// export const authenticateAccessToken = (req, res, next) => {
//   let authHeader = req.headers["authorization"];
//   let token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     console.log("잘못된 토큰 아니면 토큰 안옴");
//     return res.sendStatus(400);
//   }
//   jwt.verify(token, secretKey, (e, user) => {
//     if (e) {
//       console.log(e);
//       return res.sendStatus(403);
//     }
//     req.user = user;
//     next();
//   });
// };
// //
// export function getAccessToken(app) {
//   app.get("/user", authenticateAccessToken, (req, res) => {
//     console.log(req.user);
//     res.json(user.filter((user) => user.id === req.user.id));
//   });
// }

// export function getAccessToken(app) {
//   app.post("/login", (req, res) => {
//     let id = req.body.id;
//     let pw = req.body.pw;

//     let user = login(id, pw);
//     if (user === "") return res.sendStatus(500);

//     let accessToken = generateAccessToken(user);
//     let refreshToken = generateRefreshToken(user);

//     res.json({ accessToken, refreshToken });
//   });
// }

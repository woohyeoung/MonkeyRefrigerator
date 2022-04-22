//app.js
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const env = require("dotenv").config();
const compression = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");

const indexRoute = require("./src/routes/indexRoute");

console.log("start express~");
//express
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-accessToken, accessToken, Origin, X-Requested-With, content-type, Accept, ContentType, Content-Type"
  );
  next();
});

//Middlewares - 우리가 다운로드 받은 모듈이나 라이브러리를 넣는다!!!
// app.use(morgan('dev'));
// app.use(helmet());
app.use(compression());
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride());
app.use(
  cors({ origin: ["http://localhost:8080", "*", "http://localhost:3000"] })
);

indexRoute(app);

const PORT = env.parsed.PORT;
const BASE_URL = env.parsed.BASE_URL;

const Listening = function () {
  console.log(`>>> Listening on server : ${BASE_URL}`);
};

app.listen(PORT, Listening);

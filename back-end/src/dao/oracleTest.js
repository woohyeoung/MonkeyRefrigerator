//오라클 db 연동 테스트입니다.
var express = require("express");
var http = require("http");
var path = require("path");

const oracledb = require("oracledb");
// oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

var app = express();
const server = app.listen(3000, () => {
  console.log("server start, port 3000");
});

app.get("/board/list", function (request, response) {
  getSelect(request, response);
});

async function getSelect(request, response) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: "DEVDB",
      password: "1234",
      connectString: "kosa2.iptime.org:50136/orcl",
    });

    // const result = await connection.execute(
    // 	`SELECT *
    //     FROM BOARD
    //     `,
    // 	[] // num의 값 전달
    // );
    // const result = await connection.execute(
    // 	`SELECT *
    //     FROM USERACCOUNT
    //     `,
    // 	[] // num의 값 전달
    // );
    const result = await connection.execute(
      `SELECT ID 번호, KEY 재료명 
            FROM MATERIAL_R
            `,
      [] // num의 값 전달
    );

    response.send(result);
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.log(error);
      }
    }
  }
}

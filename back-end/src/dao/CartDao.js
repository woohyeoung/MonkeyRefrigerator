const response = require("../utils/response");
const { pool } = require("../config/database");

module.exports = {
  selectUserCart: async function (id) {
    try {
      const query = `select
                      u.userId,
                      b.id,
                      b.title,
                      b.subtitle
                      from boardcartuser u 
                      join board b on u.boardId = b.id 
                      where u.userid = ?;`;
      const params = [id];
      const connection = await pool.getConnection(async (conn) => conn);
      const [info] = await connection.query(query, params);
      connection.release();
      return info;
    } catch (err) {
      response.successFalse(
        4001,
        "데이터베이스 연결에 실패하였습니다. CartDao error - selectUserInfo"
      );
    }
  },
  selectUserCartt: async function (board, id) {
    try {
      const query = `select boardId from boardcartuser where boardId=${board} and userId=${id};`;
      const connection = await pool.getConnection(async (conn) => conn);
      const [info] = await connection.query(query);
      connection.release();
      return info;
    } catch (err) {
      response.successFalse(
        4001,
        "데이터베이스 연결에 실패하였습니다. CartDao error - selectUserInfo"
      );
    }
  },
  insertUserCart: async function (board, id) {
    try {
      const query = `insert into boardcartuser(boardId, userId) values(${board}, ${id});`;
      const connection = await pool.getConnection(async (conn) => conn);
      await connection.query(query);
      connection.release();
    } catch (err) {
      response.successFalse(
        4002,
        "데이터베이스 연결에 실패하였습니다. CartDao error - insertUserInfo"
      );
    }
  },
  deleteUserCart: async function (board, id) {
    try {
      const query = `delete from boardcartuser where userId = ${id} and boardId = ${board};`;
      const connection = await pool.getConnection(async (conn) => conn);
      await connection.query(query);
      connection.release();
    } catch (err) {
      response.successFalse(
        4003,
        "데이터베이스 연결에 실패하였습니다. CartDao error - deleteUserInfo"
      );
    }
  },
};

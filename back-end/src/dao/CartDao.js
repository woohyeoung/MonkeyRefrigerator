const response = require("../utils/response");
const { pool } = require("../config/database");

module.exports = {
  selectUserCart: async function () {
    try {
      const query = `select * from `;
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
  insertUserCart: async function () {
    try {
      const query = `select * from `;
      const connection = await pool.getConnection(async (conn) => conn);
      const [info] = await connection.query(query);
      connection.release();
      return info;
    } catch (err) {
      response.successFalse(
        4002,
        "데이터베이스 연결에 실패하였습니다. CartDao error - insertUserInfo"
      );
    }
  },
  deleteUserCart: async function () {
    try {
      const query = `select * from `;
      const connection = await pool.getConnection(async (conn) => conn);
      const [info] = await connection.query(query);
      connection.release();
      return info;
    } catch (err) {
      response.successFalse(
        4003,
        "데이터베이스 연결에 실패하였습니다. CartDao error - deleteUserInfo"
      );
    }
  },
};

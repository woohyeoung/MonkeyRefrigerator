//UserDao.js
const response = require("../utils/response");
const { pool } = require("../config/database");
const crypto = require("crypto");

module.exports = {
  selectUserAccount: async function (email, pw) {
    try {
      const password = crypto.createHash("sha512").update(pw).digest("base64");
      const query = `SELECT id, email
                           FROM useraccount
                           WHERE email = ?
                             and password = ?;`;
      const params = [email, password];
      const connection = await pool.getConnection(async (conn) => conn);
      const [info] = await connection.query(query, params);
      connection.release();
      return info;
    } catch (err) {
      return response.successFalse(
        3001,
        "데이터베이스 연결에 실패하였습니다. UserDao error - selectUserAccount"
      );
    }
  },
  selectIdDoubleChk: async function (id, type) {
    try {
      const query = `SELECT count(*) as cnt
                           FROM useraccount
                           WHERE ${type} = '${id}';`;
      const connection = await pool.getConnection(async (conn) => conn);
      const [info] = await connection.query(query);

      connection.release();
      return info;
    } catch (err) {
      return res.json(
        response.successFalse(
          3002,
          "데이터베이스 연결에 실패하였습니다. UserDao error - selectIdDoubleChk"
        )
      );
    }
  },
  insertSignup: async function (data) {
    try {
      const password = crypto
        .createHash("sha512")
        .update(data.password)
        .digest("base64");
      const query = `insert into useraccount(email, password, nickname, name, jobId, gender, birthday)
                           values (?, ?, ?, ?, ?, ?, ?);`;
      const params = [
        data.email,
        password,
        data.name,
        data.nickname,
        data.jobId,
        data.gender,
        data.birth,
      ];

      const connection = await pool.getConnection(async (conn) => conn);
      connection.query(query, params, function (err, rows, fields) {
        if (err) {
          console.log(err);
        } else {
          console.log(rows.insertId);
        }
      });
      connection.release();
    } catch (err) {
      response.successFalse(
        3003,
        "데이터베이스 연결에 실패하였습니다. UserDao error - insertSignup"
      );
    }
  },
  selectUserInfo: async function (id) {
    try {
      const query = `SELECT *
                           FROM useraccount
                           WHERE id = '${id}';`;
      const connection = await pool.getConnection(async (conn) => conn);
      const [info] = await connection.query(query);
      connection.release();
      return info;
    } catch (err) {
      response.successFalse(
        3004,
        "데이터베이스 연결에 실패하였습니다. UserDao error - selectUserInfo"
      );
    }
  },
  updatePassword: async function (data) {
    try {
      const password = crypto
        .createHash("sha512")
        .update(data.pw)
        .digest("base64");

      const query = `UPDATE useraccount
                           SET password = '${password}'
                           WHERE id = '${data.userId}';`;

      const connection = await pool.getConnection(async (conn) => conn);
      const info = await connection.query(query);
      connection.release();
      return info;
    } catch (err) {
      response.successFalse(
        3005,
        "데이터베이스 연결에 실패하였습니다. UserDao error - updatePassword"
      );
    }
  },

  selectUserGetMaterialCount: async function (userId) {
    try {
      const query = `select count(id) count
                           from usergetmaterial
                           where userId = ?;
            `;
      const connection = await pool.getConnection(async (conn) => conn);
      const params = [userId];
      const [info] = await connection.query(query, params);
      connection.release();
      return info[0].count;
    } catch (err) {
      response.successFalse(
        3001,
        "데이터베이스 연결에 실패하였습니다. UserDao error - selectUserInfo"
      );
    }
  },

  insertUserGetMaterial: async function (userId, materialId) {
    try {
      const query = `insert into usergetmaterial(userId, materialId) value (?,?);`;
      const connection = await pool.getConnection(async (conn) => conn);
      const params = [userId, materialId];
      const [info] = await connection.query(query, params);
      connection.release();
      return info;
    } catch (err) {
      response.successFalse(
        3001,
        "데이터베이스 연결에 실패하였습니다. UserDao error - selectUserInfo"
      );
    }
  },
  selectUserGetMaterialUserId: async function (userId) {
    try {
      const query = `select ugm.id id, materialId, keyName
                           from usergetmaterial ugm
                                    join material_r mr on mr.id = ugm.materialId
                           where userId = ?;`;
      const connection = await pool.getConnection(async (conn) => conn);
      const params = [userId];
      const [row] = await connection.query(query, params);
      connection.release();
      return row;
    } catch (err) {
      response.successFalse(
        3001,
        "데이터베이스 연결에 실패하였습니다. UserDao error - selectUserInfo"
      );
    }
  },
  deleteUserGetMaterial: async function (userId, materialId) {
    try {
      const query = `delete
                           from usergetmaterial
                           where userId = ?
                             and materialId = ?;`;
      const connection = await pool.getConnection(async (conn) => conn);
      const params = [userId, materialId];
      const [info] = await connection.query(query, params);
      connection.release();
      return info;
    } catch (err) {
      response.successFalse(
        3001,
        "데이터베이스 연결에 실패하였습니다. UserDao error - selectUserInfo"
      );
    }
  },
  selectUserVote: async function (id) {
    try {
      const query = `select userId
                           from boardvoteuser
                           where userId = '${id}'
                             and createAt <= (select adddate(curdate(), -weekday(curdate()) + 6) as sunday from dual)
                             and createAt >= (select adddate(curdate(), -weekday(curdate()) + 0) as monday from dual);`;
      const connection = await pool.getConnection(async (conn) => conn);
      const [vote] = await connection.query(query);
      connection.release();
      return vote;
    } catch (err) {
      response.successFalse(
        3001,
        "데이터베이스 연결에 실패하였습니다. UserDao error - selectUserVote"
      );
    }
  },
  insertUserVote: async function (board, user) {
    try {
      const query = `insert into boardvoteuser (boardId, userId)
                           values (${board}, ${user});`;
      const connection = await pool.getConnection(async (conn) => conn);
      const solution = await connection.query(query);
      connection.release();
      return solution;
    } catch (err) {
      response.successFalse(
        3001,
        "데이터베이스 연결에 실패하였습니다. UserDao error - insertUserVote"
      );
    }
  },

  selectExistMaterialId: async function (userId, materialId) {
    try {
      const query = `select exists(select materialId from usergetmaterial where userId = ? and materialId = ?) exist`;
      const params = [userId, materialId];

      const connection = await pool.getConnection(async (conn) => conn);
      const [rows] = await connection.query(query, params);
      connection.release();
      return rows[0];
    } catch (err) {
      response.successFalse(
        3001,
        "데이터베이스 연결에 실패하였습니다. UserDao error - selectExistMaterialId"
      );
    }
  },
  updateInfo: async function (data) {
    try {
      const query = `update useraccount set nickname= ? , gender = ? , jobId = ? , birthday = ? where id = ?;`;
      const params = [
        data.nickname,
        data.gender,
        data.jobId,
        data.birthday,
        data.id,
      ];
      const connection = await pool.getConnection(async (conn) => conn);
      connection.query(query, params, function (err, rows, fields) {
        if (err) {
          console.log(err);
        } else {
          console.log(rows.insertId);
        }
      });
      connection.release();
      return solution;
    } catch (err) {
      response.successFalse(
        3001,
        "데이터베이스 연결에 실패하였습니다. UserDao error - updateInfo"
      );
    }
  },
  selectVoteBoardRank: async () => {
    try {
      const query = `select bp.id, bp.boardId, bp.votedAt, bp.voteCount, b.title, b.subtitle, bi.id, bi.path, bi.type, bi.imageSize, bi.createAt 
      from boardpopular bp 
      join board b 
         on bp.boardId = b.id 
      left outer join (select * from boardimage where id in (select min(id) from boardimage group by boardId )) bi 
         on b.id = bi.boardId
      where bp.votedAt >= (select ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 0 ) from dual) 
      and bp.votedAt <= (select ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 6 ) from dual) 
      order by bp.voteCount desc
      limit 10;
      `;
      const connection = await pool.getConnection(async (conn) => conn);
      const [selectQuery] = await connection.query(query);
      connection.release();
      return selectQuery;
    } catch (error) {
      response.successFalse(
        3001,
        "데이터베이스 연결에 실패하였습니다. UserDao error - insertUserVote"
      );
    }
  },
  selectRankBoardVote: async () => {
    try {
      const query = `select * from board where viewCount >= (select avg(viewCount) from board)  order by  rand() desc  limit 12;`;
      const connection = await pool.getConnection(async (conn) => conn);
      const [seletList] = await connection.query(query);
      connection.release();
      return seletList;
    } catch (error) {
      response.successFalse(
        3001,
        "데이터베이스 연결에 실패하였습니다. UserDao error - insertUserVote"
      );
    }
  },
};

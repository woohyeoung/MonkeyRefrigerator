//BoardDao.js
const response = require("../utils/response");
// database 연결선
const { pool } = require("../config/database");

const mysql = require("mysql2/promise");

module.exports = {
  selectBoardListFirst: async function () {
    try {
      const query =
        `select b.id,
                                  b.title,
                                  b.subtitle,
                                  b.createAt,
                                  b.viewCount,
                                  u.nickname,
                                  u.profileImg,
                                  c.name category

                           from board b
                                    join useraccount u on b.userId = u.id
                                    join category c on b.categoryId = c.id

                           order by b.createAt desc, b.id limit 12;` +
        `select b.id,
                           b.title,
                           b.subtitle,
                           b.createAt,
                           b.viewCount,
                           u.nickname,
                           u.profileImg,
                           c.name category

                    from board b
                             join useraccount u on b.userId = u.id
                             join category c on b.categoryId = c.id

                    order by b.viewCount desc, b.id limit 12;`;

      const connection = await pool.getConnection(async (conn) => conn);
      const [rows] = await connection.query(query);
      connection.release();

      return rows;
    } catch (err) {
      return res.json(
        response.successFalse(
          3001,
          "데이터베이스 연결에 실패하였습니다. BoardDao error - selectBoardListFirst"
        )
      );
    }
  },
  selectBoardList: async function (id, createAt) {
    try {
      const query = `select b.id,
                                  b.title,
                                  b.subtitle,
                                  b.createAt createAt,
                                  u.nickname,
                                  u.profileImg,
                                  c.name category

                           from board b
                                    join useraccount u on b.userId = u.id
                                    join category c on b.categoryId = c.id
                           where b.createAt <= ?
                             and b.id > ?
                           order by b.createAt desc, b.id limit 12;`;
      const params = [createAt, id];
      const connection = await pool.getConnection(async (conn) => conn);
      const [rows] = await connection.query(query, params);
      connection.release();
      return rows;
    } catch (err) {
      return res.json(
        response.successFalse(
          3001,
          "데이터베이스 연결에 실패하였습니다. BoardDao error - selectBoardList"
        )
      );
    }
  },
  selectBoardListKeywordFirst: async function (keyword) {
    try {
      const query = `select b.id,
                                  b.title,
                                  b.subtitle,
                                  b.createAt,
                                  u.nickname,
                                  u.profileImg,
                                  c.name category

                           from board b
                                    join useraccount u on b.userId = u.id
                                    join category c on b.categoryId = c.id
                           where b.title like '%${keyword}%'
                           order by b.createAt desc, b.id limit 12;`;

      const connection = await pool.getConnection(async (conn) => conn);
      const [rows] = await connection.query(query);
      connection.release();
      return rows;
    } catch (err) {
      return res.json(
        response.successFalse(
          3001,
          "데이터베이스 연결에 실패하였습니다. BoardDao error - selectBoardListFirst"
        )
      );
    }
  },
  selectBoardListKeyword: async function (id, createAt, keyword) {
    try {
      const query = `select b.id,
                                  b.title,
                                  b.subtitle,
                                  b.createAt,
                                  u.nickname,
                                  u.profileImg,
                                  c.name category

                           from board b
                                    join useraccount u on b.userId = u.id
                                    join category c on b.categoryId = c.id
                           where (b.createAt <= ?
                               and b.id > ?)
                             and b.title like '%${keyword}%'
                           order by b.createAt desc, b.id limit 12;`;
      const params = [createAt, id, keyword];
      const connection = await pool.getConnection(async (conn) => conn);
      const [rows] = await connection.query(query, params);
      connection.release();
      return rows;
    } catch (err) {
      return res.json(
        response.successFalse(
          3001,
          "데이터베이스 연결에 실패하였습니다. BoardDao error - selectBoardList"
        )
      );
    }
  },

  selectBoardCount: async function () {
    try {
      const query = `select count(*) boardCount
                           from board;`;
      const connection = await pool.getConnection(async (conn) => conn);
      const [rows] = await connection.query(query);
      connection.release();
      return rows;
    } catch (err) {
      return res.json(
        response.successFalse(
          3001,
          "데이터베이스 연결에 실패하였습니다. BoardDao error - selectBoardCount"
        )
      );
    }
  },

  selectBoardDetail: async function (id) {
    try {
      const query =
        `select b.id,
                        b.title,
                        b.subtitle,
                        b.content,
                        b.difficulty,
                        b.cookTime,
                        b.servings,
                        b.subMaterial,
                        b.tagName,
                        b.viewCount,
                        date_format(b.createAt, '%Y-%m-%d') as createAt,
                        date_format(b.modifiedAt, '%Y-%m-%d') as modifiedAt,
                        u.nickname,
                        u.profileImg,
                        c.name category
                 from board b
                          join useraccount u on b.userId = u.id
                          join category c on b.categoryId = c.id
                 where b.id = ?;` +
        `select bi.path boardImgPath
                 from board b
                          left join boardImage bi on b.id = bi.boardId
                 where b.id = ?;` +
        `select m.keyName, bgm.count
                 from board b
                          join boardgetmaterial bgm on b.id = bgm.boardId
                          join material_r m on bgm.materialId = m.id
                 where b.id = ?;` +
        `update board
                 set viewCount = viewCount + 1
                 where id = ?;`;

      const params = [id];
      const connection = await pool.getConnection(async (conn) => conn);
      const [rows] = await connection.query(query, [
        params,
        params,
        params,
        params,
      ]);
      connection.release();
      return rows;
    } catch (err) {
      return res.json(
        response.successFalse(
          3001,
          "데이터베이스 연결에 실패하였습니다. BoardDao error - selectBoardDetail"
        )
      );
    }
  },

  selectBoardCategory: async function () {
    try {
      const query = `select id, name
                           from category;
            ;`;
      const connection = await pool.getConnection(async (conn) => conn);
      const [rows] = await connection.query(query);
      connection.release();
      return rows;
    } catch (err) {
      return res.json(
        response.successFalse(
          3001,
          "데이터베이스 연결에 실패하였습니다. BoardDao error - selectBoardCount"
        )
      );
    }
  },
  selectMaterialKey: async function (keyword) {
    try {
      const query = `select id, keyName
                           from material_r
                           where keyName = ?;`;
      const params = [keyword];
      const connection = await pool.getConnection(async (conn) => conn);
      const [rows] = await connection.query(query, params);

      connection.release();
      return rows;
    } catch (err) {
      return res.json(
        response.successFalse(
          3005,
          "데이터베이스 연결에 실패하였습니다. BoardDao error - selectMaterialKey"
        )
      );
    }
  },
  //board content 값만 insert
  insertBoardId: async function (board) {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      const query = `insert into board(userId, categoryId, title, subtitle, content, difficulty, cookTime,
                                             subMaterial, tagName)
                           values (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
      const params = [
        board.user.id,
        board.category.id,
        board.title,
        board.subtitle,
        board.content,
        board.difficulty,
        board.cookTime,
        board.subMaterial,
        board.tagName,
      ];
      const [rows] = await connection.query(query, params);
      connection.release();

      return rows.insertId;
    } catch (err) {
      return res.json(
        response.successFalse(
          4001,
          "데이터베이스 연결에 실패하였습니다. BoardDao error - insertBoardId"
        )
      );
    }
  },
  insertBoardIdImg: async function (boardId, imagePath, imageType, imageSize) {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      const query = `insert into BoardImage(boardId, path, type, imageSize)
                           values (?, ?, ?, ?);
            `;
      const params = [boardId, imagePath, imageType, imageSize];

      await connection.query(query, params);
      connection.release();
    } catch (err) {
      return res.json(
        response.successFalse(
          4001,
          "데이터베이스 연결에 실패하였습니다. BoardDao error - insertBoardIdImg"
        )
      );
    }
  },
  insertBoardGetMaterial: async function (boardId, materialId, materialCount) {
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      const query = `insert into boardgetmaterial(boardId, materialId, count)
                           values (?, ?, ?);
            `;
      const params = [boardId, materialId, materialCount];
      await connection.query(query, params);
      connection.release();
    } catch (err) {
      return res.json(
        response.successFalse(
          4001,
          "데이터베이스 연결에 실패하였습니다. BoardDao error - insertBoardGetMaterial"
        )
      );
    }
  },

  selectBoardImg: async function (boardId) {
    try {
      const query = `select path as boardImgPath
                           from boardimage
                           where boardId = ?
                           order by id limit 1;`;
      const params = [boardId];
      const connection = await pool.getConnection(async (conn) => conn);
      const [rows] = await connection.query(query, params);

      connection.release();
      return rows;
    } catch (err) {
      return res.json(
        response.successFalse(
          3005,
          "데이터베이스 연결에 실패하였습니다. BoardDao error - selectMaterialKey"
        )
      );
    }
  },
  selectBoardImg: async function (boardId) {
    try {
      const query = `select path as boardImgPath
                           from boardimage
                           where boardId = ?
                           order by id limit 1;`;
      const params = [boardId];
      const connection = await pool.getConnection(async (conn) => conn);
      const [rows] = await connection.query(query, params);

      connection.release();
      return rows;
    } catch (err) {
      return res.json(
        response.successFalse(
          3005,
          "데이터베이스 연결에 실패하였습니다. BoardDao error - selectMaterialKey"
        )
      );
    }
  },

  selectBoardListView: async function (id, viewCount) {
    try {
      const query = `select b.id,
                                  b.title,
                                  b.subtitle,
                                  b.createAt createAt,
                                  b.viewCount,
                                  u.nickname,
                                  u.profileImg,
                                  c.name category 

                           from board b
                                    join useraccount u on b.userId = u.id
                                    join category c on b.categoryId = c.id
                           where b.viewCount <= ?
                             and b.id > ?
                           order by b.viewCount desc, b.id limit 12;`;
      const params = [viewCount, id];
      const connection = await pool.getConnection(async (conn) => conn);
      const [rows] = await connection.query(query, params);
      connection.release();
      return rows;
    } catch (err) {
      return res.json(
        response.successFalse(
          3001,
          "데이터베이스 연결에 실패하였습니다. BoardDao error - selectBoardListView"
        )
      );
    }
  },
};

const response = require("../utils/response");

const { pool } = require("../config/database");

module.exports = {
  selectRefrigerator: async function (materialId, userId) {
    try {
      const query = `select distinct bb.id         id,
                                           uc.nickname   nickname,
                                           uc.profileImg profileImg,
                                           cate.name     categoryName,
                                           bb.title,
                                           bb.subtitle,
                                           bb.servings
                           from (select b.*
                                 from board b
                                          left join boardgetmaterial bgm on b.id = bgm.boardId
                                          left join material_r mr on bgm.materialId = mr.id
                                 where mr.id = ?
                                 order by rand() limit 100) bb
                                    left join boardgetmaterial bgm2 on bb.id = bgm2.boardId
                                    left join material_r mr2 on bgm2.materialId = mr2.id
                                    left join useraccount uc on bb.userId = uc.id
                                    left join category cate on bb.categoryId = cate.id
                           where bgm2.materialId IN
                                 (select ugm.materialId from usergetmaterial ugm where ugm.userId = ?)
                           order by bb.viewCount desc limit 12
            ;`;
      const params = [materialId, userId];

      const connection = await pool.getConnection(async (conn) => conn);
      const [rows] = await connection.query(query, params);

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
};

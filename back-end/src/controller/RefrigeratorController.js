const response = require("../utils/response");
const RefrigeratorDao = require("../dao/RefrigeratorDao");

module.exports = {
    findRefrigerator: async function (req, res) {
        const userId = req.tokenInfo.userId;
        const materialId = req.query.materialId;
        try {

            if(materialId ===null || materialId === undefined){
                 return res.json(
                    response.successFalse(1001, '주재료가 없습니다.')
                );
            }
            const List = await RefrigeratorDao.selectRefrigerator(materialId,userId)
            if (List.length === 0) {
                return res.json(
                    response.successFalse(1001, '목록이 없습니다.')
                );
            }
            console.log(List)
            return res.json(
                response.successTrue(
                    2001,
                    '조회에 성공하였습니다.',
                    List
                )
            );
        } catch (err) {
            return res.json(
                response.successFalse(
                    1001,
                    '서버와 통신에 실패하였습니다. RefrigeratorController/RefrigeratorDao error - findRefrigerator'
                )
            );
        }
    },

}
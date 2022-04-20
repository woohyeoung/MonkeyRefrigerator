//UserController.js
const response = require("../utils/response");
const userDao = require("../dao/UserDao");
const generateToken = require("../config/secret");
const UserDao = require("../dao/UserDao");
const jwt = require("jsonwebtoken");

module.exports = {
    getToken: async (req, res) => {
        const email = req.body.email;
        const pw = req.body.pw;
        try {
            const user = await userDao.selectUserAccount(email, pw);
            if (user === undefined) {
                return res.json(response.successFalse(6770, "유저 목록이 없습니다."));
            }
            let accessToken = generateToken(user[0].id, user[0].email);
            return res.json(
                response.successTrue(6771, "토큰을 전달하였습니다.", accessToken)
            );
        } catch (err) {
            return response.successFalse(
                1001,
                "서버와 통신에 실패하였습니다. UserController/UserDao error - getToken"
            );
        }
    },
    idDoubleChk: async (req, res) => {
        const id = req.query.id;
        const type = req.query.type;

        try {
            const cnt = await userDao.selectIdDoubleChk(id, type);

            if (!cnt) {
                return res.json(
                    response.successFalse(7101, "결과 값이 존재 하지 않습니다.")
                );
            }

            return res.json(
                response.successTrue(7002, "결과 값 조회에 성공했습니다.", cnt)
            );
        } catch (err) {
            return res.json(
                response.successFalse(
                    1001,
                    "서버와 통신에 실패하였습니다. UserController/UserDao error - idDoubleChk"
                )
            );
        }
    },
    signupInsert: async function (req, res) {
        const data = req.body;
        try {
            const signupformInsert = await UserDao.insertSignup(data);
        } catch (err) {
            return res.json(
                response.successFalse(
                    1001,
                    "서버와 통신에 실패하였습니다. UserController/UserDao error - signupInsert"
                )
            );
        }
    },
    getUserInformation: async function (req, res) {
        try {
            const token = req.tokenInfo;
            const userInfo = await UserDao.selectUserInfo(token.email);
            if (userInfo === undefined) {
                return res.json(
                    response.successFalse(1002, "전체 게시물 목록이 없습니다.")
                );
            } else {
                return res.json(
                    response.successTrue(
                        2001,
                        "게시물 목록 조회에 성공하였습니다.",
                        userInfo
                    )
                );
            }
        } catch (err) {
            return res.json(
                response.successFalse(
                    1001,
                    "서버와 통신에 실패하였습니다. UserController/UserDao error - getUserInformation"
                )
            );
        }
    },

    saveUserMaterialOne: async function (req, res) {
        const data = req.body;
        data.user.id = req.tokenInfo.userId;
        try {

            let cnt = await UserDao.selectUserGetMaterialCount(data.user.id);
            if (cnt > 5) {
                return res.json(
                    response.successFalse(7101, "5개이상 담을 수 없습니다.")
                );
            }
            let insertInfo = await UserDao.insertUserGetMaterial(data);
        } catch (err) {
            return res.json(
                response.successFalse(
                    1001,
                    "서버와 통신에 실패하였습니다. UserController/UserDao error - saveUserMaterialOne"
                )
            );
        }
    },

    findUserMaterialUserId: async function (req, res) {
        let userId = req.tokenInfo.userId;
        try {
            let userMaterialList = await UserDao.selectUserGetMaterialUserId(userId);

            // if (userMaterialList.length === 0) {
            //     return res.json(response.successFalse(1004, '회원이 가지고 있는 재료 목록이 없습니다.'));
            // }

            return res.json(
                response.successTrue(
                    2001,
                    "회원이 가지고 있는 재료 목록 조회에 성공하였습니다.",
                    userMaterialList
                )
            );
        } catch (err) {
            return res.json(
                response.successFalse(
                    1001,
                    "서버와 통신에 실패하였습니다. UserController/UserDao error - findUserMaterialUserId"
                )
            );
        }
    },


};

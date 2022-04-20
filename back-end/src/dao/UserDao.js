//UserDao.js
const response = require("../utils/response");
const {pool} = require("../config/database");
const crypto = require("crypto");
const base64crypto = (password) => {
    crypto.createHash("sha512").update(password).digest("base64");
};
const createSalt = () =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString("base64"));
        });
    });

const createHashedPassword = (plainPassword) =>
    new Promise(async (resolve, reject) => {
        const salt = await createSalt();
        crypto.pbkdf2(plainPassword, salt, 9999, 64, "sha512", (err, key) => {
            if (err) reject(err);
            resolve({password: key.toString("base64"), salt});
        });
    });

module.exports = {
    selectUserAccount: async function (email, pw) {
        try {
            const query = `SELECT id, email
                           FROM useraccount
                           WHERE email = '${email}'
                             and password = '${pw}';`;
            const connection = await pool.getConnection(async (conn) => conn);
            const [info] = await connection.query(query);
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
                    3001,
                    "데이터베이스 연결에 실패하였습니다. UserDao error - selectIdDoubleChk"
                )
            );
        }
    },
    insertSignup: async function (data) {
        try {
            const {password2, salt} = await createHashedPassword(data.password);

            const query = `insert into useraccount(email, password, nickname, name, jobId, gender, birthday)
                           values (?, ?, ?, ?, ?, ?, ?);`;
            const params = [
                data.email,
                salt,
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
                3001,
                "데이터베이스 연결에 실패하였습니다. UserDao error - insertSignup"
            );
        }
    },
    selectUserInfo: async function (id) {
        try {
            const query = `SELECT *
                           FROM useraccount
                           WHERE email = '${id}';`;
            const connection = await pool.getConnection(async (conn) => conn);
            const [info] = await connection.query(query);
            connection.release();
            return info;
        } catch (err) {
            response.successFalse(
                3001,
                "데이터베이스 연결에 실패하였습니다. UserDao error - selectUserInfo"
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

    insertUserGetMaterial: async function (data) {
        try {
            const query = `insert into usergetmaterial(userId, materialId) value (?,?);`;
            const connection = await pool.getConnection(async (conn) => conn);
            const params = [data.user.id, data.material.id];
            const [info] = await connection.query(query, params);
            connection.release();
            return info
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

};

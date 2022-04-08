// const express = require('express');
// const compression = require('compression');
// const methodOverride = require('method-override');

// /** 모듈 생성하기
//     exports / module.exports
//     exports는 module.exports를 참조합니다.
//     일반적으로 module.exports를 통해 모듈을 생성합니다.
//     모듈 불러오기
//     require("모듈 파일 경로") */

// module.exports = function () {
// 	const app = express();

// 	app.use(function (req, res, next) {
// 		res.header('Access-Control-Allow-Origin', '*');
// 		res.header(
// 			'Access-Control-Allow-Methods',
// 			'GET, POST, OPTIONS, PUT, PATCH, DELETE'
// 		);
// 		res.header(
// 			'Access-Control-Allow-Headers',
// 			'x-access-token, Origin, X-Requested-With, Content-Type, Accept'
// 		);
// 		next();
// 	});
// 	app.use(compression());

// 	app.use(express.json());

// 	app.use(express.urlencoded({ extended: true }));

// 	app.use(methodOverride());

// 	// require('../routes/boardRoute')(app);

// 	return app;
// };

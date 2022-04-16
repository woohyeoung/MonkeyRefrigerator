//jwt valid function --> 미들웨어
const jwt = require('../config/jwt');

module.exports = function (app) {
	const board = require('../controller/BoardController');
	// const jwtMiddleware = require('../config/jwt');

	app.route('/board').get(board.findBoardAll);
	app.route('/board/page').get(board.findBoardAllAfter);
	app.route('/board/category').get(board.findBoardCategory);
	// app.route('/board/detail').get(board.findBoardOne);
};

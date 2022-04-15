//BoardAction.js
import * as BoardApi from '../../api/BoardApi';
import { createPromiseThunk } from '../../api/AsyncUtil';

//액션 타입
//게시물 전체 목록 첫번째 목록 조회
export const BOARDLIST_GET = 'BOARDLIST_GET';
export const BOARDLIST_GET_SUCCESS = 'BOARDLIST_GET_SUCCESS';
export const BOARDLIST_GET_ERROR = 'BOARDLIST_GET_ERROR';
//게시물 전체 목록 첫번째 이후 목록 조회
export const BOARDLIST_AFTER_GET = 'BOARDLIST_AFTER_GET';
export const BOARDLIST_AFTER_GET_SUCCESS = 'BOARDLIST_AFTER_GET_SUCCESS';
export const BOARDLIST_AFTER_GET_ERROR = 'BOARDLIST_AFTER_GET_ERROR';

export const boardList = createPromiseThunk(
	BOARDLIST_GET,
	BoardApi.findBoardAll
);
export const boardListAfter = createPromiseThunk(
	BOARDLIST_AFTER_GET,
	BoardApi.findBoardAllAfter
);

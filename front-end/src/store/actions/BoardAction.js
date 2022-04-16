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
//게시물 저장 카테고리 목록 조회
export const CATEGORYLIST_GET = 'CATEGORYLIST_GET';
export const CATEGORYLIST_GET_SUCCESS = 'CATEGORYLIST_GET_SUCCESS';
export const CATEGORYLIST_GET_ERROR = 'CATEGORYLIST_GET_ERROR';
//키워드로 비슷한 재료 상위 5개 조회

export const boardList = createPromiseThunk(
	BOARDLIST_GET,
	BoardApi.findBoardAll
);
export const boardListAfter = createPromiseThunk(
	BOARDLIST_AFTER_GET,
	BoardApi.findBoardAllAfter
);
export const categoryList = createPromiseThunk(
	CATEGORYLIST_GET,
	BoardApi.findBoardCategory
);

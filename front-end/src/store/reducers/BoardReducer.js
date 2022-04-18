//BoardReducer.js
import {
  BOARDLIST_GET,
  BOARDLIST_GET_SUCCESS,
  BOARDLIST_GET_ERROR,
  BOARDLIST_AFTER_GET,
  BOARDLIST_AFTER_GET_SUCCESS,
  BOARDLIST_AFTER_GET_ERROR,
  BOARDDETAIL_GET,
  BOARDDETAIL_GET_SUCCESS,
  BOARDDETAIL_GET_ERROR,
  CATEGORYLIST_GET,
  CATEGORYLIST_GET_SUCCESS,
  CATEGORYLIST_GET_ERROR,
} from "../actions/BoardAction";
import { reducerUtils, handleAsyncActions } from "../../api/AsyncUtil";
const initialState = {
  boardList: reducerUtils.initial(),
  boardListAfter: reducerUtils.initial(),
  boardDetail: reducerUtils.initial(),
  categoryList: reducerUtils.initial(),
};

export default function boardReducer(state = initialState, action) {
  switch (action.type) {
    case BOARDLIST_GET:
    case BOARDLIST_GET_SUCCESS:
    case BOARDLIST_GET_ERROR:
      return handleAsyncActions(BOARDLIST_GET, "boardList")(state, action);
    case BOARDLIST_AFTER_GET:
    case BOARDLIST_AFTER_GET_SUCCESS:
    case BOARDLIST_AFTER_GET_ERROR:
      return handleAsyncActions(BOARDLIST_AFTER_GET, "boardListAfter")(
        state,
        action
      );
    case BOARDDETAIL_GET:
    case BOARDDETAIL_GET_SUCCESS:
    case BOARDDETAIL_GET_ERROR:
      return handleAsyncActions(BOARDDETAIL_GET, "boardDetail")(state, action);
    case CATEGORYLIST_GET:
    case CATEGORYLIST_GET_SUCCESS:
    case CATEGORYLIST_GET_ERROR:
      return handleAsyncActions(CATEGORYLIST_GET, "categoryList")(
        state,
        action
      );

    default:
      return state;
  }
}

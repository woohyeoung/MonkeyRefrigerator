import {
  LOGIN_VALI,
  LOGIN_VALI_ERROR,
  LOGIN_VALI_SUCCESS,
  ID_CHK,
} from "../actions/UserAction";
import { reducerUtils, handleAsyncActions } from "../../api/AsyncUtil";

const initialState = {
  loginUser: reducerUtils.initial(),
  idDoubleChk: reducerUtils.initial(),
};
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_VALI:
    case LOGIN_VALI_SUCCESS:
    case LOGIN_VALI_ERROR:
      return handleAsyncActions(LOGIN_VALI, "loginVali")(state, action);
    case ID_CHK:
      return handleAsyncActions(ID_CHK, "idDoubleChk")(state, action);
    default:
      return state;
  }
}

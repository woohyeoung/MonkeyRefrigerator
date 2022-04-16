import {
  LOGIN_VALI,
  LOGIN_VALI_ERROR,
  LOGIN_VALI_SUCCESS,
} from "../actions/UserAction";
import { reducerUtils, handleAsyncActions } from "../../api/AsyncUtil";

const initialState = {
  loginUser: reducerUtils.initial(),
};
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_VALI:
    case LOGIN_VALI_SUCCESS:
    case LOGIN_VALI_ERROR:
      return handleAsyncActions(LOGIN_VALI, "loginVali")(state, action);

    default:
      return state;
  }
}

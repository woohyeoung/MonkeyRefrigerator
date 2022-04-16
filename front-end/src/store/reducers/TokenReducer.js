//토큰담을거에용
import { LOGIN_VALI } from "../actions/UserAction";
import { reducerUtils, handleAsyncActions } from "../../api/AsyncUtil";

const initialState = {
  token: reducerUtils.initial(),
};
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_VALI:
      return handleAsyncActions(LOGIN_VALI, "loginUser")(state, action);
    default:
      return state;
  }
}

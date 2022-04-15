import { LOGIN_VALI } from "../actions/UserAction";
import { reducerUtils, handleAsyncActions } from "../../api/AsyncUtil";

const initialState = {
  loginUser: reducerUtils.initial(),
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_VALI:
      console.log("여기 리듀서");
      return handleAsyncActions(LOGIN_VALI, "loginUser")(state, action);
    default:
      return state;
  }
}

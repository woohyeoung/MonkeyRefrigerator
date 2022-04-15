import { HEADER_TOKEN } from "../actions/UserAction";
import { reducerUtils, handleAsyncActions } from "../../api/AsyncUtil";

const initialState = {
  headerToken: reducerUtils.initial(),
};
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case HEADER_TOKEN:
      return handleAsyncActions(HEADER_TOKEN, "headerToken")(state, action);
    default:
      return state;
  }
}

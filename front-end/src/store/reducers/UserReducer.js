//UserReducer.js
import { reducerUtils, handleAsyncActions } from "../../api/AsyncUtil";
import { SIGNUPFORM_INSERT } from "../actions/UserAction";

const initialState = {
  loginVali: reducerUtils.initial(),
};
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

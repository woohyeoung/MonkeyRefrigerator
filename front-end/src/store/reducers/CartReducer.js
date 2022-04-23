import { reducerUtils, handleAsyncActions } from "../../api/AsyncUtil";
import {
  USER_CART_GET,
  USER_CART_GET_SUCCESS,
  USER_CART_GET_ERROR,
  USER_CART_ADD,
  USER_CART_ADD_SUCCESS,
  USER_CART_ADD_ERROR,
  USER_CART_DEL,
  USER_CART_DEL_SUCCESS,
  USER_CART_DEL_ERROR,
} from "../actions/CartAction";

const initialState = {
  usercartget: reducerUtils.initial(),
  usercartadd: reducerUtils.initial(),
  usercartdel: reducerUtils.initial(),
};

export default function CartReducer(state = initialState, action) {
  switch (action.type) {
    case USER_CART_GET:
    case USER_CART_GET_SUCCESS:
    case USER_CART_GET_ERROR:
      return handleAsyncActions(USER_CART_GET, "usercartget")(state, action);
    case USER_CART_ADD:
    case USER_CART_ADD_SUCCESS:
    case USER_CART_ADD_ERROR:
      return handleAsyncActions(USER_CART_ADD, "usercartadd")(state, action);
    case USER_CART_DEL:
    case USER_CART_DEL_SUCCESS:
    case USER_CART_DEL_ERROR:
      return handleAsyncActions(USER_CART_DEL, "usercartdel")(state, action);
    default:
      return state;
  }
}

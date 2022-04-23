import * as CartApi from "../../api/CartApi";
import { createPromiseThunk } from "../../api/AsyncUtil";

export const USER_CART_GET = "USER_CART_GET";
export const USER_CART_GET_SUCCESS = "USER_CART_GET_SUCCESS";
export const USER_CART_GET_ERROR = "USER_CART_GET_ERROR";
export const USER_CART_ADD = "USER_CART_ADD";
export const USER_CART_ADD_SUCCESS = "USER_CART_ADD_SUCCESS";
export const USER_CART_ADD_ERROR = "USER_CART_ADD_ERROR";
export const USER_CART_DEL = "USER_CART_DEL";
export const USER_CART_DEL_SUCCESS = "USER_CART_DEL_SUCCESS";
export const USER_CART_DEL_ERROR = "USER_CART_DEL_ERROR";

export const getUserCart = createPromiseThunk(
  USER_CART_GET,
  CartApi.getUserCartInfo
);
export const addUserCart = createPromiseThunk(
  USER_CART_ADD,
  CartApi.addUserCartInfo
);
export const delUserCart = createPromiseThunk(
  USER_CART_DEL,
  CartApi.delUserCartInfo
);

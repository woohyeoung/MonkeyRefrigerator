import { Cookies, useCookies } from "react-cookie";
import * as UserApi from "../../api/UserApi";
import { createPromiseThunk } from "../../api/AsyncUtil";
const cookies = new Cookies();
const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};
const getCookie = (name) => {
  return cookies.get(name);
};
const removeCookie = (name, option) => {
  cookies.remove(name, { ...option });
};
export const HEADER_TOKEN = "HEADER_TOKEN";
export const HEADER_TOKEN_GET = "HEADER_TOKEN_GET";
export const HEADER_TOKEN_OUT = "HEADER_TOKEN_OUT";

//회원가입 insert
export const SIGNUPFORM_INSERT = "SIGNUPFORM_INSERT";

export const loginVali = (email, pw) => {
  const data = { email: email, pw: pw };
  return async (dispatch) => {
    dispatch({ type: HEADER_TOKEN });
    try {
      const token = await UserApi.getToken(data);
      if (token !== undefined) {
        // TokenAdmin("SET", "accessToken", token, { path: "/", secure: true });
        // window.alert("hi");
        // console.log(TokenAdmin("GET"));
        setCookie("accessToken", token, {
          path: "/",
        });
      }
      dispatch({ type: HEADER_TOKEN_GET, token: token });
    } catch (e) {
      dispatch({ type: HEADER_TOKEN_OUT, token: e, error: true });
    }
  };
};

export const SET_TOKEN = "SET_TOKEN";
export const handleLogin = () => {
  return async (dispatch) => {
    let token = getCookie("accessToken");
    // let token = TokenAdmin("GET");
    if (token) {
      dispatch({
        type: SET_TOKEN,
        result: true,
        token: token,
      });
    } else {
      dispatch({
        type: SET_TOKEN,
        result: false,
        token: null,
      });
    }
  };
};

export const signupform = createPromiseThunk(
  SIGNUPFORM_INSERT,
  UserApi.insertSignupForm
);

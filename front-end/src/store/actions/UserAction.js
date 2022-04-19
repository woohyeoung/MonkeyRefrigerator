import { Cookies } from "react-cookie";
import * as UserApi from "../../api/UserApi";
import { createPromiseThunk } from "../../api/AsyncUtil";
const cookies = new Cookies();
const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};
const getCookie = (name) => {
  return cookies.get(name);
};
export const SET_TOKEN = "SET_TOKEN";

//회원가입 insert
export const SIGNUPFORM_INSERT = "SIGNUPFORM_INSERT";

//사용자 프로필 GET
export const USERINFORMATION_GET = "USERINFORMATION_GET";
export const USERINFORMATION_GET_SUCCESS = "USERINFORMATION_GET_SUCCESS";
export const USERINFORMATION_GET_ERROR = "USERINFORMATION_GET_ERROR";

export const loginVali = (email, pw) => {
  const data = { email: email, pw: pw };
  return async (dispatch) => {
    try {
      const token = await UserApi.getToken(data);
      if (token !== undefined) {
        setCookie("accessToken", token, {
          path: "/",
          withCredentials: true,
        });
      }
      dispatch({
        type: SET_TOKEN,
        result: true,
        token: token,
      });
    } catch (e) {
      dispatch({
        type: SET_TOKEN,
        result: false,
        token: null,
      });
    }
  };
};

export const handleLogin = () => {
  return async (dispatch) => {
    let token = getCookie("accessToken");
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

export const userInformation = createPromiseThunk(
  USERINFORMATION_GET,
  UserApi.selectUserInformation
);

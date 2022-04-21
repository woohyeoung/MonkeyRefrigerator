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

//회원 재료 추가 POST
export const USERMATERIAL_POST = "USERMATERIAL_POST";
export const USERMATERIAL_POST_SUCCESS = "USERMATERIAL_POST_SUCCESS";
export const USERMATERIAL_POST_ERROR = "USERMATERIAL_POST_ERROR";

//회원이 가지고 있는 재료 GET
export const USERMATERIAL_GET = "USERMATERIAL_GET";
export const USERMATERIAL_GET_SUCCESS = "USERMATERIAL_GET_SUCCESS";
export const USERMATERIAL_GET_ERROR = "USERMATERIAL_GET_ERROR";

//회원이 가지고 있는 재료 삭제 DELETE
export const USERMATERIAL_DELETE = "USERMATERIAL_DELETE";
export const USERMATERIAL_DELETE_SUCCESS = "USERMATERIAL_DELETE_SUCCESS";
export const USERMATERIAL_DELETE_ERROR = "USERMATERIAL_DELETE_ERROR";

//사용자 프로필 비밀번호 변경
export const PASSWORD_UPDATE = "PASSWORD_UPDATE";

export const loginVali = (email, pw) => {
  const data = { email: email, pw: pw };
  return async (dispatch) => {
    try {
      const token = await UserApi.getToken(data);
      if (token !== undefined) {
        setCookie("accessToken", token, {
          path: "/",
          maxAge: 3600,
          // expires:,
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

export const userMaterialOne = createPromiseThunk(
  USERMATERIAL_POST,
  UserApi.saveUserMaterialOne
);
export const userMaterialUserId = createPromiseThunk(
  USERMATERIAL_GET,
  UserApi.findUserMaterialUserId
);

export const pwChange = createPromiseThunk(
  PASSWORD_UPDATE,
  UserApi.updatePassword
);

export const deleteUserGetMaterial = createPromiseThunk(
  USERMATERIAL_DELETE,
  UserApi.deleteUserGetMaterialUserId
);

import { Cookies } from "react-cookie";
import { getToken } from "../../api/UserApi";
<<<<<<< HEAD
import * as UserApi from "../../api/UserApi";
import { createPromiseThunk } from "../../api/AsyncUtil";
=======

>>>>>>> 5372ddd (feat:4/15, 헤더토큰연결중)
const cookies = new Cookies();
const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

//로그인 시도
export const LOGIN_VALI = "LOGIN_VALI";
export const LOGIN_VALI_SUCCESS = "LOGIN_VALI_SUCCESS";
export const LOGIN_VALI_ERROR = "LOGIN_VALI_ERROR";
//성공 시 토큰 발급
export const HEADER_TOKEN = "HEADER_TOKEN";

export const loginVali = (email, pw) => async (dispatch) => {
  dispatch({ type: LOGIN_VALI });
  const data = { email: email, pw: pw };
  try {
    const user = await getToken(data);
    if (user !== undefined) {
      setCookie(email, user, { path: "/", secure: true, sameSite: "none" });
    }
    dispatch({ type: HEADER_TOKEN }, user);
    dispatch({ type: LOGIN_VALI_SUCCESS, user });
  } catch (e) {
    dispatch({ type: LOGIN_VALI_ERROR, error: e });
  }
};

const validate = (data, e) => {
  if (data.result.length < 1) {
    alert("이메일 또는 비밀번호가 맞지 않습니다.");
  } else {
    alert("로그인 성공");
    //return <Link to="/"></Link>;
  }
};

import { Cookies } from "react-cookie";
import { getToken } from "../../api/UserApi";
const cookies = new Cookies();
const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};
const getCookie = (name) => {
  return cookies.get(name);
};
// const removeCookie = (name, option) => {
//   cookies.remove(name, { ...option });
// };
export const HEADER_TOKEN = "HEADER_TOKEN";
export const HEADER_TOKEN_GET = "HEADER_TOKEN_GET";
export const HEADER_TOKEN_OUT = "HEADER_TOKEN_OUT";

export const loginVali = (email, pw) => {
  const data = { email: email, pw: pw };
  return async (dispatch) => {
    dispatch({ type: HEADER_TOKEN });
    try {
      const token = await getToken(data);
      if (token !== undefined) {
        setCookie("accessToken", token, {
          path: "/",
          secure: true,
          sameSite: "none",
        });
      }
      dispatch({ type: HEADER_TOKEN_GET, token: token });
    } catch (e) {
      dispatch({ type: HEADER_TOKEN_OUT, token: e, error: true });
    }
  };
};
// export const handleLogout = (data) => async (dispatch) => {
//   console.log(data);
//   if (data) {
//     removeCookie("accessToken", { path: "/", domain: ".localhost:8080" });
//   }
//   let token = getCookie("accessToken");
//   console.log(token);
//   if (token === undefined) {
//     dispatch({ type: SET_TOKEN, result: false, token: null });
//     dispatch({ type: HEADER_TOKEN_OUT, token: null });
//   }
// };

export const SET_TOKEN = "SET_TOKEN";
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

import { Cookies } from "react-cookie";
import { getToken } from "../../api/UserApi";
const cookies = new Cookies();

const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};
const getCookie = (name) => {
  return cookies.get(name);
};
export const HEADER_TOKEN = "HEADER_TOKEN";
export const HEADER_TOKEN_GET = "HEADER_TOKEN_GET";
export const HEADER_TOKEN_OUT = "HEADER_TOKEN_OUT";
export const tokenVali = async (data) => {
  const token = await getToken(data);
  if (token !== undefined) {
    setCookie("accessToken", token);
  }
  return token;
};
export const loginVali = (email, pw) => {
  const data = { email: email, pw: pw };
  return async (dispatch) => {
    dispatch({ type: HEADER_TOKEN });
    try {
      let token = getCookie("accessToken");
      if (token === undefined) {
        token = tokenVali(data);
      }
      dispatch({ type: HEADER_TOKEN_GET, token: token });
    } catch (e) {
      dispatch({ type: HEADER_TOKEN_OUT, token: e, error: true });
    }
  };
};

import { Cookies } from "react-cookie";

import { findUser } from "../../api/UserApi";
export const LOGIN_VALI = "LOGIN_VALI";

const cookies = new Cookies();
const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};
export const loginVali = (email, pw) => async (dispatch) => {
  dispatch({ type: LOGIN_VALI });
  const data = { email: email, pw: pw };
  try {
    const user = await findUser(data);
    console.log(user);
    if (user !== undefined) {
      setCookie(email, user, { path: "/", secure: true, sameSite: "none" });
    }
  } catch (e) {}
};

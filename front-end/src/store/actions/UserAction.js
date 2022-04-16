import { Cookies } from "react-cookie";
import { getToken, idDoubleChk } from "../../api/UserApi";
const cookies = new Cookies();
const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

//로그인 시도, 성공 시 토큰 발급
export const LOGIN_VALI = "LOGIN_VALI";
export const LOGIN_VALI_SUCCESS = "LOGIN_VALI_SUCCESS";
export const LOGIN_VALI_ERROR = "LOGIN_VALI_ERROR";
export const ID_CHK = "ID_CHK";

export const loginVali = (email, pw) => async (dispatch) => {
  dispatch({ type: LOGIN_VALI });
  const data = { email: email, pw: pw };
  try {
    const user = await getToken(data);
    if (user !== undefined) {
      setCookie(email, user, { path: "/", secure: true, sameSite: "none" });
    }
  } catch (e) {}
};

const validate = (data, e) => {
  if (data.result.length < 1) {
    alert("이메일 또는 비밀번호가 맞지 않습니다.");
  } else {
    alert("로그인 성공");
    //return <Link to="/"></Link>;
  }
};

export const idChk = (id) => async (dispatch) => {
  dispatch({ type: ID_CHK });
  const data = { id: id };
  const idData = await idDoubleChk(data);
  // console.log(idData);
  return idData;
};

import { Link } from "react-router-dom";
import { findUser } from "../../api/UserApi";
export const LOGIN_VALI = "LOGIN_VALI";

export const loginVali = (email, pw) => async (dispatch) => {
  dispatch({ type: LOGIN_VALI });
  const data = { email: email, pw: pw };
  try {
    console.log("여기 액션");
    const user = await findUser(data);
    validate(user, email);
  } catch (e) {}
};

const validate = (data, e) => {
  if (data.result.length < 1) {
    alert("이메일 또는 비밀번호가 맞지 않습니다.");
  } else {
    alert("로그인 성공");
    return <Link to="/"></Link>;
  }
};

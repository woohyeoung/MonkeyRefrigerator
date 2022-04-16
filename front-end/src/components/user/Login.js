//Login.js
//Install Component;
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginVali } from "../../store/actions/UserAction";
//User Component
//Style
import "./SignUp.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const dispatch = useDispatch();
  //Handler
  const emailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const pwHandler = (e) => {
    setPw(e.currentTarget.value);
  };

  const onClickLogin = async (e) => {
    e.preventDefault();
    if (email === "") alert("이메일이 입력되어있지 않습니다.");
    else if (pw === "") alert("비밀번호가 입력되어있지 않습니다.");
    else {
      let a = dispatch(loginVali(email, pw));
      console.log(a);
    }
    setEmail("");
    setPw("");
  };
  return (
    <div className="loginContainer">
      <form className="loginFormCon" onSubmit={onClickLogin}>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={emailHandler}
          placeholder="이메일을 입력하세요."
        />
        <label>Password</label>
        <input
          type="password"
          value={pw}
          onChange={pwHandler}
          placeholder="비밀번호를 입력하세요."
        />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

//SingUp.js
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SignUp.css";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import BirthPick from "./DatePicker";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { idChk } from "../../store/actions/UserAction";

function SignUp() {
  const userStore = useSelector((state) => state.userReducer);

  const [startDate, setStartDate] = useState(new Date());
  const [idCheck, setIdCheck] = useState(false); //아이디 중복 체크
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [gender, setGender] = useState("m");
  const [job, setJob] = useState("");
  const [birth, setBirth] = useState("");
  const [userForm, setUserForm] = useState({});

  const dispatch = useDispatch();

  const idInput = useRef();

  const checkHandler = ({ target }) => {
    //id 중복
    setIdCheck(!idCheck);
  };

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeNickName = (e) => {
    setNickName(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangePasswordChk = (e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  };
  const onChangeGender = (e) => {
    setGender(e.target.value);
  };
  const onChangeJob = (e) => {
    setJob(e.target.value);
  };
  const onChangeBirth = (e) => {
    alert("##");
  };

  const signUpFormSubmit = (e) => {
    if (!isEmail(id)) {
      alert("아이디(이메일)이 형식에 맞지 않습니다.");
      idInput.current.focus();
    }

    // let form ={
    //   id : id
    //   email :email
    // }
    // console.log(form)
    // setUserForm(form)
    // dispatch
  };

  const isEmail = (email) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(email);
  };

  const parentFunction = (data) => {
    console.log(data);
  };

  const onClickIdChk = (e) => {
    if (id == null || id == "") {
      alert("아이디를 입력해주세요.");
      idInput.current.focus();
    }

    const idstore = dispatch(idChk(id));
    //console.log(idstore);

    console.log(userStore.idDoubleChk);
  };

  useEffect(() => {
    // console.log(userStore.idDoubleChk);
  }, [userStore.idDoubleChk.data]);

  // useEffect(() => {
  //   console.log(userStore + "#$#$#$#$");
  //   if (userStore.idDoubleChk.loading === true) {
  //     // console.log(userStore.boardList.data.data.result);
  //     setIdCheck(true);
  //   } else {
  //     setIdCheck(false);
  //   }
  // }, [userStore.idDoubleChk.loading]);

  return (
    <>
      <form>
        <div id="signup_content">
          <Card>
            <CardContent>
              <h3>
                <label for="id">ID(Email)</label>
              </h3>
              <div class="pwchk">
                <div class="box_pwchk">
                  <span class="box int_pw">
                    <input
                      type="text"
                      id="idEamil"
                      class="int"
                      maxlength="20"
                      required
                      ref={idInput}
                      onChange={onChangeId}
                    />
                  </span>
                </div>
                <div class="doublechk">
                  <Button variant="warning" onClick={onClickIdChk}>
                    중복체크
                  </Button>
                  {idCheck === true ? <p>check</p> : <></>}
                </div>
              </div>
              <h3>
                <label for="pw">비밀번호</label>
              </h3>
              <div class="box_id">
                <span class="box int_pw">
                  <input
                    type="password"
                    id="pw"
                    name="pwCheck"
                    class="int"
                    maxlength="20"
                    required
                    onChange={onChangePassword}
                  />
                </span>
              </div>
              <h3>
                <label for="pw">비밀번호 재확인</label>
              </h3>
              <div class="pwchk">
                <div class="box_pwchk">
                  <span class="box int_pw">
                    <input
                      type="password"
                      id="pwCheck"
                      name="pwCheck"
                      class="int"
                      maxlength="20"
                      required
                      onChange={onChangePasswordChk}
                    />
                  </span>
                </div>
                {passwordError && (
                  <div style={{ color: "red" }}>
                    비밀번호가 일치하지 않습니다.
                  </div>
                )}
              </div>
              <h3>
                <label for="userName">이름</label>
              </h3>
              <div class="box_id">
                <span class="box int_pw">
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    class="int"
                    maxlength="20"
                    required
                    onChange={onChangeName}
                  />
                </span>
              </div>
              <h3>
                <label for="nickName">닉네임</label>
              </h3>
              <div class="pwchk">
                <div class="box_pwchk">
                  <span class="box int_pw">
                    <input
                      type="text"
                      id="nickName"
                      name="nickName"
                      class="int"
                      maxlength="20"
                      required
                      onChange={onChangeNickName}
                    />
                  </span>
                </div>
                <div class="doublechk">
                  <Button variant="warning">중복체크</Button>{" "}
                </div>
              </div>
              <h3>
                <label for="gender">성별</label>
              </h3>
              <div class="box_id">
                <div class="genderCheck">
                  <input
                    type="radio"
                    id="gender"
                    name="gender"
                    value="m"
                    checked={gender == "m"}
                    onChange={onChangeGender}
                  />
                  <label for="gender">남성</label>
                  <input
                    type="radio"
                    id="gender"
                    name="gender"
                    value="f"
                    checked={gender == "f"}
                    onChange={onChangeGender}
                  />
                  <label for="gender">여성</label>
                </div>
              </div>
              <h3>
                <label for="job">직업</label>
              </h3>
              <div class="box_id">
                <select
                  class="signupList"
                  name="jobList"
                  onChange={onChangeJob}
                  required
                >
                  <option value="">--선택--</option>
                  <option value="학생">학생</option>
                  <option value="군인">군인</option>
                  <option value="주부">주부</option>
                  <option value="아빠">아빠</option>
                  <option value="기타">기타</option>
                </select>
              </div>
              <h3>
                <label for="birth">생년월일</label>
              </h3>
              <div class="box_id">
                <BirthPick setStartDate={setStartDate} />
              </div>
            </CardContent>
            <Button
              variant="outline-secondary"
              onClick={() => {
                signUpFormSubmit();
              }}
            >
              Secondary
            </Button>{" "}
          </Card>
        </div>
      </form>
    </>
  );
}

export default SignUp;

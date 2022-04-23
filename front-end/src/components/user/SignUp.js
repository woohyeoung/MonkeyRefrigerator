//SingUp.js
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Cookies } from "react-cookie";
import "./SignUp.css";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import BirthPick from "./DatePicker";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { signupform, handleLogin } from "../../store/actions/UserAction";
import axios from "axios";
import moment from "moment";
import { baseUrl } from "../../api/BaseUrl";
import checkicon from "../../assets/icon/outline_check_circle_black_24dp.png";
import cancelicon from "../../assets/icon/outline_highlight_off_black_24dp.png";

function SignUp() {
  const userStore = useSelector((state) => state.userReducer);

  const [startDate, setStartDate] = useState(new Date());
  const [idCheck, setIdCheck] = useState(-1); //아이디 중복 체크
  const [nicknameCheck, setNicknameCheck] = useState(-1); //닉네임 중복 체크
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [pwRegexCheck, setPwRegexCheck] = useState(false); //비밀번호 정규식 체크
  const [passwordError, setPasswordError] = useState(false);
  const [gender, setGender] = useState("m");
  const [job, setJob] = useState("");
  const dispatch = useDispatch();

  const idInput = useRef();
  const nicknameInput = useRef();
  const pwInput = useRef();
  const pwCheckInput = useRef();
  const nameInput = useRef();
  const jobInput = useRef();

  const onChangeId = (e) => {
    setId(e.target.value);
    setIdCheck(-1);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeNickName = (e) => {
    setNickName(e.target.value);
    setNicknameCheck(-1);
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

  //비밀번호 정규식 적용
  useEffect(() => {
    setPwRegexCheck(isPw(password));
  }, [password]);

  //formsubmit
  const signUpFormSubmit = (e) => {
    let flag = false;

    if (isSubmit()) {
      if (!isEmail(id)) {
        alert("아이디(이메일)이 형식에 맞지 않습니다.");
        idInput.current.focus();
        return;
      }
      if (idCheck != 0) {
        alert("아이디 중복체크를 해주세요.");
        return;
      }
      if (!pwRegexCheck) {
        alert("비밀번호가 형식에 맞지 않습니다.");
        pwInput.current.focus();
        return;
      }
      if (passwordError) {
        alert("비밀번호가 일치하지 않습니다.");
        pwCheckInput.current.focus();
        return;
      }
      if (nicknameCheck != 0) {
        alert("닉네임 중복체크를 해주세요.");
        return;
      }

      let formData = {
        email: id,
        password: password,
        nickname: nickName,
        name: name,
        jobId: job,
        gender: gender,
        birth: moment(startDate).format("YYYYMMDD"),
      };
      // console.log(startDate);
      dispatch(signupform(formData));
      window.location.href = "/login";
    }
  };

  function isSubmit() {
    if (!id) {
      alert("아이디를 입력해주세요.");
      idInput.current.focus();
      return false;
    }
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      pwInput.current.focus();
      return false;
    }
    if (!passwordCheck) {
      alert("비밀번호 재확인을 입력해주세요.");
      pwCheckInput.current.focus();
      return false;
    }
    if (!name) {
      alert("이름을 입력해주세요.");
      nameInput.current.focus();
      return false;
    }
    if (!nickName) {
      alert("닉네임을 입력해주세요.");
      nicknameInput.current.focus();
      return false;
    }
    if (!job) {
      alert("직업을 선택해주세요.");
      nicknameInput.current.focus();
      return false;
    }

    return true;
  }

  //이메일 정규식 확인
  const isEmail = (email) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(email);
  };

  //비밀번호 정규식 확인(8자 이상, 문자, 숫자, 특수문자 포함)
  const isPw = (password) => {
    const pwRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,}$/;
    return pwRegex.test(password);
  };

  const onClickIdChk = (type) => {
    let typedata;
    if (type == "email") {
      if (id == null || id == "") {
        alert("아이디를 입력해주세요.");
        idInput.current.focus();
        return;
      }
      typedata = id;
    } else if (type == "nickname") {
      if (nickName == null || nickName == "") {
        alert("닉네임을를 입력해주세요.");
        nicknameInput.current.focus();
        return;
      }
      typedata = nickName;
    }
    // 중복 검사를 하기위한 axios api
    async function check(typedata) {
      const idDoubleChk = (typedata) => {
        const result = axios
          .get(`${baseUrl}idChk`, {
            params: { id: typedata, type: type },
          })
          .then((count) => {
            if (type == "email") {
              if (count.data.result[0].cnt == 0) {
                setIdCheck(0);
              } else if (count.data.result[0].cnt > 0) {
                setIdCheck(1);
              }
            } else if (type == "nickname") {
              if (count.data.result[0].cnt == 0) {
                setNicknameCheck(0);
              } else if (count.data.result[0].cnt > 0) {
                setNicknameCheck(1);
              }
            }
            return count;
          });

        return result;
      };
      let result = await idDoubleChk(typedata);
      return result;
    }
    check(typedata);
  };

  function iconRerender(type) {
    if (type == "email") {
      if (idCheck == 0) {
        return <img src={checkicon} />;
      } else if (idCheck == 1) {
        return <img src={cancelicon} />;
      }
    } else if (type == "nickname") {
      if (nicknameCheck == 0) {
        return <img src={checkicon} />;
      } else if (nicknameCheck == 1) {
        return <img src={cancelicon} />;
      }
    }
  }

  return (
    <>
      <form name="signup_form">
        <div id="signup_content">
          <Card>
            <CardContent>
              <h2>회원가입</h2>
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
                      placeholder="ex)example123@naver.com"
                    />
                  </span>
                </div>
                <div class="doublechk">
                  <Button
                    variant="warning"
                    onClick={() => {
                      onClickIdChk("email");
                    }}
                    value="email"
                  >
                    중복체크
                  </Button>
                  {iconRerender("email")}
                </div>
              </div>
              <h3>
                <label for="pw">비밀번호</label>
              </h3>
              <div class="pwchk">
                <div class="box_pwchk">
                  <span class="box int_pw">
                    <input
                      type="password"
                      id="pw"
                      name="pwCheck"
                      class="int"
                      maxlength="20"
                      required
                      ref={pwInput}
                      onChange={onChangePassword}
                      placeholder="문자, 숫자, 특수기호 포함 8자 이상"
                    />
                  </span>
                </div>
                {password != "" && password != null ? (
                  pwRegexCheck ? (
                    <></>
                  ) : (
                    <div style={{ color: "red" }}>
                      비밀번호 형식이 맞지않습니다. (문자, 숫자, 특수문자 포함)
                    </div>
                  )
                ) : (
                  <></>
                )}
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
                      ref={pwCheckInput}
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
                      ref={nicknameInput}
                      onChange={onChangeNickName}
                    />
                  </span>
                </div>
                <div class="doublechk">
                  <Button
                    variant="warning"
                    onClick={() => {
                      onClickIdChk("nickname");
                    }}
                  >
                    중복체크
                  </Button>
                  {iconRerender("nickname")}
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
                    value="w"
                    checked={gender == "w"}
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
                  ref={jobInput}
                >
                  <option value="">--선택--</option>
                  <option value="1">학생</option>
                  <option value="2">군인</option>
                  <option value="3">주부</option>
                  <option value="4">직장인</option>
                  <option value="5">아빠</option>
                  <option value="6">기타</option>
                </select>
              </div>
              <h3>
                <label for="birth">생년월일</label>
              </h3>
              <div class="box_id">
                <BirthPick setStartDate={setStartDate} type="signup" />
              </div>
            </CardContent>
            <div class="btn_submt">
              <Button
                variant="success"
                onClick={() => {
                  signUpFormSubmit();
                }}
              >
                회원가입
              </Button>{" "}
            </div>
          </Card>
        </div>
      </form>
    </>
  );
}

export default SignUp;

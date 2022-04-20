//Profile.js
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import "./SignUp.css";
import BirthPick from "./DatePicker";
import { Button } from "react-bootstrap";
import { baseUrl } from "../../api/BaseUrl";
import axios from "axios";
import {
  userInformation,
  handleLogin,
  pwChange,
} from "../../store/actions/UserAction";
import Loading from "../shared/CustomLoading";
import { logout } from "../Header";
import Cookies from "js-cookie";
import TextField from "@mui/material/TextField";
import "./Profile.css";
import { useCookies } from "react-cookie";

function Profile() {
  const userStore = useSelector((state) => state.userReducer);
  const tokenReducer = useSelector((state) => state.tokenReducer);
  const tokenStore = Cookies.get("accessToken");
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    setLoading(true);
    console.log(tokenReducer.token, " 토큰");
    if (tokenReducer.token) dispatch(userInformation(tokenReducer.token));
    else dispatch(userInformation(tokenStore));
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (userStore.userInformation.data) {
      setUserInfo([...userStore.userInformation.data.result]);
    }
  }, [userStore.userInformation.data]);

  console.log(userStore);
  console.log(userInfo);
  return <>{loading ? <Loading /> : <ProfileBody data={userInfo[0]} />}</>;
}

export default Profile;

const ProfileBody = (props) => {
  console.log(props.data);
  const [userInfo, setUserInfo] = useState(props.data);
  const [startDate, setStartDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const handleModal = (type) => {
    switch (type) {
      case "OPEN":
        setModalOpen(true);
        return;
      case "CLOSE":
      default:
        setModalOpen(false);
        return;
    }
  };

  const setValue = (type) => {
    switch (type) {
      case "id":
        return userInfo.id;
      case "email":
        return userInfo.email;
      case "password":
        return userInfo.password;
      case "nickname":
        return userInfo.nickname;
      case "gender":
        return userInfo.gender;
      default:
        return "none";
    }
  };
  // useEffect(() => {
  //   if (props.data) {
  //     setUserInfo(props.data);
  //   }
  // }, [props]);
  return (
    <>
      <div>
        <PasswordModal
          open={modalOpen}
          close={() => handleModal("CLOSE")}
          // userId={setValue("id")}
        />
      </div>
      <div id="signup_content">
        {!userInfo ? (
          <div style={{ marginTop: "150px" }}>
            <Loading />
          </div>
        ) : (
          <Card>
            <CardContent>
              <h2>{userInfo.name ? userInfo.name : "이름없음"}</h2>
              <div className="profile_imgdiv">
                <img
                  class="profile_img"
                  src="https://usertradersbucket.s3.ap-northeast-2.amazonaws.com/basic/ic_profile_gray.png"
                />

                <div className="profile_imgtext">프로필 대표 이미지</div>
              </div>
              <div className="account_content">
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
                        value={setValue("email")}
                        maxlength="20"
                        readOnly
                      />
                    </span>
                  </div>
                </div>
                <h3>
                  <label for="pw">비밀번호</label>
                  <Button
                    onClick={() => handleModal("OPEN")}
                    variant="outline-dark"
                  >
                    변경
                  </Button>
                </h3>

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
                        value={setValue("nickname")}
                        readOnly
                      />
                    </span>
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
                      checked={setValue("gender") === "m" ? true : false}
                    />
                    <label for="gender">남성</label>
                    <input
                      type="radio"
                      id="gender"
                      name="gender"
                      value="w"
                      checked={setValue("gender") === "w" ? true : false}
                    />
                    <label for="gender">여성</label>
                  </div>
                </div>
                <h3>
                  <label for="job">직업</label>
                </h3>
                <div class="box_id">
                  <select class="signupList" name="jobList">
                    <option value="0">--선택--</option>
                    <option
                      value="1"
                      selected={userInfo.jobId == 1 ? true : false}
                    >
                      학생
                    </option>
                    <option
                      value="2"
                      selected={userInfo.jobId == 2 ? true : false}
                    >
                      군인
                    </option>
                    <option
                      value="3"
                      selected={userInfo.jobId == 3 ? true : false}
                    >
                      주부
                    </option>
                    <option
                      value="4"
                      selected={userInfo.jobId == 4 ? true : false}
                    >
                      직장인
                    </option>
                    <option
                      value="5"
                      selected={userInfo.jobId == 5 ? true : false}
                    >
                      아빠
                    </option>
                    <option
                      value="6"
                      selected={userInfo.jobId == 6 ? true : false}
                    >
                      기타
                    </option>
                  </select>
                </div>
                <h3>
                  <label for="birth">생년월일</label>
                </h3>
                <div class="box_id">
                  <BirthPick
                    setStartDate={startDate}
                    birth={userInfo.birthday}
                  />
                </div>
              </div>
            </CardContent>
            <div class="btn_submt">
              <Button variant="success" onClick={() => {}}>
                수정
              </Button>{" "}
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

const PasswordModal = (props) => {
  const dispatch = useDispatch();
  const { open, close, header } = props;
  const [modalStyle, setModalStyle] = useState("none");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [pwRegexCheck, setPwRegexCheck] = useState(false); //비밀번호 정규식 체크
  const [passwordError, setPasswordError] = useState(false);
  console.log(props.userId);
  const onChangePassword = (e) => {
    setPw(e.target.value);
  };
  const onChangePasswordChk = (e) => {
    setPasswordError(e.target.value !== pw);
    setPwCheck(e.target.value);
  };

  //비밀번호 정규식 적용
  useEffect(() => {
    setPwRegexCheck(isPw(pw));
  }, [pw]);

  const pwSubmit = () => {
    if (!pw) {
      alert("비밀번호를 입력해주세요.");
      return false;
    }
    if (!pwCheck) {
      alert("비밀번호 재확인을 입력해주세요.");
      return false;
    }
    if (!pwRegexCheck) {
      alert("비밀번호가 형식에 맞지 않습니다.");
      return;
    }
    let formData = {
      userId: props.userId,
      password: pw,
    };
    dispatch(pwChange(formData));
  };
  //비밀번호 정규식 확인(8자 이상, 문자, 숫자, 특수문자 포함)
  const isPw = (password) => {
    const pwRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{7,}$/;
    return pwRegex.test(password);
  };

  useEffect(() => {
    open ? setModalStyle("block") : setModalStyle("none");
  }, [open]);
  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            비밀번호 변경
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <div className="pwchange">
              {/* <button /> */}
              <TextField
                style={{ marginRight: "15px" }}
                label="Password"
                type="password"
                variant="outlined"
                helperText="비밀번호를 입력해주세요."
                onChange={onChangePassword}
              />
              <TextField
                style={{ marginRight: "15px" }}
                label="Password Confirm"
                type="password"
                variant="outlined"
                helperText="비밀번호를 다시 입력해주세요."
                onChange={onChangePasswordChk}
              />
            </div>
          </main>
          <footer>
            <div
              style={{ display: "flex", float: "right", marginBottom: "10px" }}
            >
              {passwordError && (
                <div style={{ color: "red" }}>
                  비밀번호가 일치하지 않습니다.
                </div>
              )}
              <button style={{}} type="submit" onClick={pwSubmit}>
                수정
              </button>
            </div>
          </footer>
        </section>
      ) : null}
    </div>

    // <div className="modalBody">
    //   <div
    //     style={{
    //       display: modalStyle,
    //     }}
    //   >

    //   </div>
    // </div>
  );
};

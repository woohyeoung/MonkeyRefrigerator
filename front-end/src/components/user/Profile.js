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

//icon
import checkicon from "../../assets/icon/outline_check_circle_black_24dp.png";
import cancelicon from "../../assets/icon/outline_highlight_off_black_24dp.png";

function Profile(props) {
  const userStore = useSelector((state) => state.userReducer);
  const tokenReducer = useSelector((state) => state.tokenReducer);
  const tokenStore = Cookies.get("accessToken");
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (tokenStore) {
      dispatch(userInformation(tokenStore));
      setToken(tokenStore);
    }

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  useEffect(() => {
    if (userStore.userInformation.data) {
      setUserInfo([...userStore.userInformation.data.result]);
    }
  }, [userStore.userInformation.data]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ProfileBody data={userInfo[0]} token={tokenStore} />
      )}
    </>
  );
}

export default Profile;

const ProfileBody = React.memo(function (props) {
  const [userInfo, setUserInfo] = useState(props.data);
  const [modalOpen, setModalOpen] = useState(false);
  const [token, setToken] = useState(props.token);

  const [nicknameCheck, setNicknameCheck] = useState(-1); //닉네임 중복 체크
  // const [id, setId] = useState(props.data.email);
  const [nickname, setNickname] = useState("");
  // const [gender, setGender] = useState(userInfo.gender);
  // const [job, setJob] = useState(userInfo.jobId);
  // const [startDate, setStartDate] = useState(userInfo.birthday);

  const idInput = useRef();
  const nicknameInput = useRef();

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

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
  console.log(userInfo);
  const setValue = (type) => {
    switch (type) {
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

  const onClickIdChk = (type) => {
    let typedata;
    if (type == "nickname") {
      if (nickname == null || nickname == "") {
        alert("닉네임을를 입력해주세요.");
        nicknameInput.current.focus();
        return;
      }
      typedata = nickname;
    }
    // 중복 검사를 하기위한 axios api
    async function check(typedata) {
      const idDoubleChk = (typedata) => {
        const result = axios
          .get(`${baseUrl}idChk`, {
            params: { id: typedata, type: type },
          })
          .then((count) => {
            if (type == "nickname") {
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
    if (type == "nickname") {
      if (nicknameCheck == 0) {
        return <img src={checkicon} />;
      } else if (nicknameCheck == 1) {
        return <img src={cancelicon} />;
      }
    }
  }

  return (
    <>
      <div>
        <PasswordModal
          open={modalOpen}
          close={() => handleModal("CLOSE")}
          token={token}
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
              <h2>{userInfo.name ? userInfo.name : "이름 없어"}</h2>
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
                        disabled
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
                        class="int"
                        maxlength="20"
                        placeholder={setValue("nickname")}
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
                  <BirthPick birth={userInfo.birthday} type="profile" />
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
});

const PasswordModal = (props) => {
  const dispatch = useDispatch();

  const { open, close, header, userId, token } = props;

  const [modalStyle, setModalStyle] = useState("none");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [pwRegexCheck, setPwRegexCheck] = useState(false); //비밀번호 정규식 체크
  const [passwordError, setPasswordError] = useState(false);

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
      password: pw,
      token: token,
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

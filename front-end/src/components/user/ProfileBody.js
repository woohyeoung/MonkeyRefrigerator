import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import "./SignUp.css";
import BirthPick, { yoon } from "./DatePicker";
import { Button } from "react-bootstrap";
import { baseUrl } from "../../api/BaseUrl";
import axios from "axios";
import {
  userInformation,
  handleLogin,
  pwChange,
  updateUserInfo,
} from "../../store/actions/UserAction";
import Loading from "../shared/CustomLoading";
import { logout } from "../Header";
import Cookies from "js-cookie";
import TextField from "@mui/material/TextField";
import "./Profile.css";
import { useCookies } from "react-cookie";
import moment from "moment";

//icon
import checkicon from "../../assets/icon/outline_check_circle_black_24dp.png";
import cancelicon from "../../assets/icon/outline_highlight_off_black_24dp.png";
import trashIcon from "../../assets/icon/trash.png";
import { useSelect } from "@mui/base";

const ProfileBody = (props) => {
  const [userInfo, setUserInfo] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [token, setToken] = useState(props.token);

  const [nicknameCheck, setNicknameCheck] = useState(-1);
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [jobId, setJobId] = useState();
  const [birthday, setBirthday] = useState(new Date());
  const tokenStore = useSelector((state) => state.tokenReducer.token);

  const nicknameInput = useRef();

  const birthDatePick = (date) => {
    setBirthday(date);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (tokenStore !== undefined) setToken(props.token);
  });
  useEffect(() => {
    setTimeout(() => {
      setUserInfo(props.data[0]);
    }, 150);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setEmail(userInfo.email);
      setNickname(userInfo.nickname);
      setGender(userInfo.gender);
      setBirthday(userInfo.birthday);
      setJobId(userInfo.jobId);
    }, 500);
  }, [userInfo]);

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
  };

  const onChangeJobId = (e) => {
    setJobId(e.target.value);
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
      if (nickname == userInfo.nickname) {
        setNicknameCheck(2); //2 : 기존 닉네임과 동일
      } else {
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
                  if (nickname === userInfo.nickname) {
                    setNicknameCheck(2); //2 : 기존 닉네임과 동일
                  }
                }
              }
              return count;
            });

          return result;
        };

        let result = await idDoubleChk(typedata);
        return result;
      }
    }
    check(typedata);
  };

  function iconRerender(type) {
    if (type == "nickname") {
      if (nicknameCheck == 0) {
        return <img src={checkicon} alt="images" />;
      } else if (nicknameCheck == 1) {
        return <img src={cancelicon} alt="images" />;
      }
    }
  }

  const updateUserSubmit = () => {
    if (isSubmit()) {
      var formData = {
        data: {
          id: userInfo.id,
          nickname: nickname,
          gender: gender,
          jobId: jobId,
          birthday: moment(birthday).format("YYYYMMDD"),
        },
        token: token,
      };

      dispatch(updateUserInfo(formData));
    }
  };

  function isSubmit() {
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      nicknameInput.current.focus();
      return false;
    }
    if (!jobId) {
      alert("직업을 선택해주세요.");
      nicknameInput.current.focus();
      return false;
    }
    if (nicknameCheck != 0) {
      if (nickname != userInfo.nickname) {
        alert("닉네임 중복체크를 해주세요.");
        return false;
      }
    }
    return true;
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
                        value={email}
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
                        value={nickname}
                        onChange={onChangeNickname}
                        required
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
                      checked={gender === "m"}
                      onChange={onChangeGender}
                    />
                    <label for="gender">남성</label>
                    <input
                      type="radio"
                      id="gender"
                      name="gender"
                      value="w"
                      checked={gender === "w"}
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
                    onChange={onChangeJobId}
                    required
                  >
                    <option value="0">--선택--</option>
                    <option value="1" selected={jobId == 1 ? true : false}>
                      학생
                    </option>
                    <option value="2" selected={jobId == 2 ? true : false}>
                      군인
                    </option>
                    <option value="3" selected={jobId == 3 ? true : false}>
                      주부
                    </option>
                    <option value="4" selected={jobId == 4 ? true : false}>
                      직장인
                    </option>
                    <option value="5" selected={jobId == 5 ? true : false}>
                      아빠
                    </option>
                    <option value="6" selected={jobId == 6 ? true : false}>
                      기타
                    </option>
                  </select>
                </div>
                <h3>
                  <label for="birth">생년월일</label>
                </h3>
                <div class="box_id">
                  <BirthPick
                    birthday={birthday}
                    setBirthday={birthDatePick}
                    type="profile"
                  />
                </div>
              </div>
            </CardContent>
            <div class="btn_submt">
              <Button variant="success" onClick={updateUserSubmit}>
                수정
              </Button>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default ProfileBody;

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
  );
};

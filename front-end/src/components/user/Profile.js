//Profile.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import "./SignUp.css";
import BirthPick from "./DatePicker";
import { Button } from "react-bootstrap";
import { baseUrl } from "../../api/BaseUrl";
import axios from "axios";
import { userInformation, handleLogin } from "../../store/actions/UserAction";
import Loading from "../shared/CustomLoading";
import { logout } from "../Header";

function Profile() {
  const userStore = useSelector(
    (state) => state.userReducer.userInformation.data
  );
  const dispatch = useDispatch();
  const tokenReducer = useSelector((state) => state.tokenReducer.token);
  const secretKey = process.env.ACCESS_TOKEN_SECRET;

  const [startDate, setStartDate] = useState(new Date());
  const [id, setId] = useState("");
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    handleLogin();
  });
  useEffect(() => {
    dispatch(userInformation(tokenReducer));
  }, []);
  useEffect(() => {
    const testYoon = async () => {
      setUserInfo(userStore.result[0]);
      setStartDate(userInfo.createAt);
    };
    testYoon();
  }, [userStore]);
  useEffect(() => {
    if (userStore && !userStore.isSuccess) {
      console.log(userStore.isSuccess);
      logout();
      alert("토큰이 만료되어 로그아웃되었습니다.");
    }
  }, [tokenReducer]);
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
  return (
    <>
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
                        readOnly
                        value={setValue("password")}
                      />
                    </span>
                  </div>
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
                  <BirthPick setStartDate={startDate} />
                </div>
                <div class="pwchk">
                  <div class="box_pwchk">
                    <span class="box int_pw">
                      <input
                        type="text"
                        id="birthday"
                        name="birthday"
                        class="int"
                        maxlength="20"
                        readOnly
                      />
                    </span>
                  </div>
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
}

export default Profile;

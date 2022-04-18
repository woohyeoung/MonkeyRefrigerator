//Profile.js
import React, { useState } from "react";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import "./SignUp.css";
import BirthPick from "./DatePicker";
import { Button } from "react-bootstrap";

function Profile() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <div id="signup_content">
        <Card>
          <CardContent>
            <h2>김희수님</h2>
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
                  <input type="radio" id="gender" name="gender" value="m" />
                  <label for="gender">남성</label>
                  <input type="radio" id="gender" name="gender" value="w" />
                  <label for="gender">여성</label>
                </div>
              </div>
              <h3>
                <label for="job">직업</label>
              </h3>
              <div class="box_id">
                <select class="signupList" name="jobList">
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
              {/* <div class="box_id">
                <BirthPick setStartDate={setStartDate} />
              </div> */}
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
      </div>
    </>
  );
}

export default Profile;

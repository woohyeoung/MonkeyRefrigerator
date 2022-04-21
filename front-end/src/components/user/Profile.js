//Profile.js
import React, { useEffect, useState, useRef, useCallback } from "react";
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
import ProfileBody from "./ProfileBody";

function Profile(props) {
  const tokenReducer = useSelector((state) => state.tokenReducer);
  const tokenStore = Cookies.get("accessToken");

  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  console.log(tokenStore);
  console.log(props.token);
  useEffect(() => {
    const test = async () => {
      setLoading(true);
      await dispatch(userInformation(tokenStore));
      setToken(tokenStore);
    };
    test();
    setLoading(false);
  }, []);

  const userStore = useSelector((state) => state.userReducer);
  const [userInfo, setUserInfo] = useState();

  console.log(userStore);

  useEffect(() => {
    if (userStore.userInformation.data) {
      setUserInfo([...userStore.userInformation.data.result]);
    }
  }, [userStore.userInformation.data]);
  const [test, setTest] = useState(false);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ProfileBody data={userInfo} token={tokenStore} />
      )}
    </>
  );
}

export default Profile;

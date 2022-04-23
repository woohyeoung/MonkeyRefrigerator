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
  const [token, setToken] = useState(Cookies.get("accessToken"));
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.userReducer);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    setLoading(true);
    dispatch(userInformation(token));
    setLoading(false);
  }, []);
  useEffect(() => {
    if (token === undefined && tokenReducer.token !== null)
      setToken(tokenReducer.token);
  }, [tokenReducer]);

  useEffect(() => {
    if (userStore?.userInformation?.data) {
      setUserInfo([...userStore.userInformation.data.result]);
    }
  }, [userStore?.userInformation?.data]);

  return (
    <>
      {!loading && userInfo ? (
        <ProfileBody data={userInfo} token={token} />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Profile;

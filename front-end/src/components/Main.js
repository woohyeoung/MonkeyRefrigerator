//Main.js
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  lazy,
  Suspense,
} from "react";
import "./Main.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import gsap from "gsap";
import dungdunglogo from "../assets/monkey_2.png";

import BoardList from "./board/BoardList";
import BoardCreate from "./board/BoardCreate";
import { Route, Switch } from "react-router-dom";
import { Login } from "./user/Login";
import SignUp from "./user/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../store/actions/UserAction";
import PublicRoute from "./user/PublicRoute";
import PrivateRoute from "./user/PrivateRoute";
import Header from "./Header";
import BoardDetail from "./board/BoardDetail";
import Profile from "./user/Profile";
import { Refrigerator } from "./search/Refrigerator";

function Main() {
  const dispatch = useDispatch();
  const tokenReducer = useSelector((state) => state.tokenReducer.token);
  useEffect(() => {
    if (tokenReducer === null) dispatch(handleLogin());
  });
  const dungdungRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      dungdungRef.current,
      { y: 0 },
      {
        y: -100,
        opacity: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "Power1.out",
      }
    );
  });

  return (
    <>
      <Header />
      <div className="mainContainer">
        <Switch>
          <PublicRoute restricted={false} exact path="/">
            <div className="mainHeadLine">
              <div className="dungdung" ref={dungdungRef}>
                {dungdung}
              </div>
              <div className="mainVote">
                <Card variant="outlined">{mainVoteCard}</Card>
              </div>
            </div>
            <div className="mainBody">
              <div className="mainBodyCon"></div>
              <div className="mainBodyCon"></div>
            </div>
            메인 페이지 - Router 들어가야함
          </PublicRoute>
          <PublicRoute
            restricted={true}
            component={Login}
            path="/login"
            exact
          />
          <PublicRoute
            restricted={true}
            component={SignUp}
            path="/signup"
            exact
          />
          <PrivateRoute component={Profile} path="/profile" exact />
          <PublicRoute
            restricted={false}
            component={BoardList}
            path="/board"
            exact
          />
          <PublicRoute component={BoardCreate} path="/create" exact />
          <PrivateRoute component={Refrigerator} path="/refrigerator" exact />
          <Route path="/board/:id">
            <BoardDetail />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Main;
const dungdung = (
  <div className="dung">
    <img src={dungdunglogo} alt="dungdung" />
  </div>
);

const mainVoteCard = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        이주의 레시피
      </Typography>
      <Typography variant="h5" component="div">
        이번주의 레시피를 투표해주세요!
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Pick Me!
      </Typography>
      <Typography variant="body2">
        투표해 주신 분들 중 10분을 추첨해서 상품을 드립니다!
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

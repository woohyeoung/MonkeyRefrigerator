//Main.js
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  lazy,
  Suspense,
} from "react";
import "./Main.css";
import BoardList from "./board/BoardList";
import { Link, Route, Switch } from "react-router-dom";
import Icon from "@mdi/react";
import Box from "@mui/material/Box";
//Login
import { Login } from "./user/Login";

function Main() {
  return (
    <>
      <div className="content">
        <div className="container">
          <Switch>
            <Route exact path="/">
              메인 페이지 - Router 들어가야함
              <br />
            </Route>
            <Route path="/board">
              <BoardList />
            </Route>
            <Route path={"/login"}>
              <Login />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
}

export default Main;

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
  const tokenReducer = useSelector((state) => state.tokenReducer.authenticated);
  useEffect(() => {
    dispatch(handleLogin());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="mainContainer">
        <Switch>
          <PublicRoute restricted={false} exact path="/">
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
          <PublicRoute component={BoardList} path="/board" exact />
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

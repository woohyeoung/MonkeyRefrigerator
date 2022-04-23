import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../store/actions/UserAction";
import { Cookies } from "react-cookie";
import { IsLogin } from "./IsLogin";
import Loading from "../shared/CustomLoading";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => {
    const privateLock = async () => {
      setLoading(true);
      dispatch(handleLogin());
    };
    privateLock();
    setTimeout(() => {
      setToken(cookie.get("accessToken"));
      setLoading(false);
    }, 200);
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        !IsLogin() ? (
          <Redirect to="/login" />
        ) : loading ? (
          <Loading />
        ) : (
          <Component {...props} token={token} />
        )
      }
    />
  );
};
export default PrivateRoute;

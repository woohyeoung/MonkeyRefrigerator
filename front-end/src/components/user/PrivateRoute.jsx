import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin } from "../../store/actions/UserAction";
import { Cookies } from "react-cookie";
import { IsLogin } from "./IsLogin";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const tokenStore = useSelector((state) => state.tokenReducer.token);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (!tokenStore) {
      setLoading(true);
      dispatch(handleLogin());
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    if (cookie.get("accessToken")) {
      setToken(cookie.get("accessToken"));
    }
  }, [loading]);
  return (
    <Route
      {...rest}
      render={(props) =>
        !IsLogin() ? (
          <Redirect to="/login" />
        ) : loading ? (
          <></>
        ) : (
          <Component {...props} token={token} />
        )
      }
    />
  );
};
export default PrivateRoute;

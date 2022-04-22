//Install-Style-User
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import {
  mdiMagnify,
  mdiAccount,
  mdiFridge,
  mdiAccountPlus,
  mdiAccountArrowRight,
  mdiClipboardText,
  mdiClipboardPlus,
  mdiMenu,
  mdiLogout,
  mdiCart,
} from "@mdi/js";
import Icon from "@mdi/react";
import "./Header.css";
import { handleLogin } from "../store/actions/UserAction";

function Header() {
  const dispatch = useDispatch();
  const tokenReducer = useSelector((state) => state.tokenReducer.authenticated);
  const cookie = new Cookies();
  const [isLogin, setIsLogin] = useState(false);
  const menu1 = useRef();
  const menu2 = useRef();
  const [menu, setMenu] = useState(false);
  const [imgUrl, setImgUrl] = useState("/monkey_2.png");
  const monkey = useRef();
  useEffect(() => {
    if (isLogin && !tokenReducer) {
      if (!cookie.get("accessToken")) {
        logout();
        alert("토큰이 만료되어 로그아웃 되었습니다.");
        window.location.reload();
      }
      dispatch(handleLogin());
    }
  });
  useEffect(() => {
    tokenReducer ? setIsLogin(true) : setIsLogin(false);
  }, [tokenReducer]);
  return (
    <>
      <header>
        <div className="header">
          <div className="row-1">
            <Link to="/">
              <div className="h-logo">
                <img
                  onMouseOver={() => {
                    setImgUrl("/monkey_3.png");
                    monkey.current.src = imgUrl;
                  }}
                  onMouseOut={() => {
                    setImgUrl("/monkey_2.png");
                    monkey.current.src = imgUrl;
                  }}
                  ref={monkey}
                  src={imgUrl}
                  width={90}
                  height={90}
                  alt="homeLogo"
                ></img>
              </div>
            </Link>
            <div className="h-title">
              <span>Monkey Refrigerator</span>
            </div>
            <div className="h-nav-item-alw">
              <input className="inputbox" type="text" placeholder="Search" />
              <Icon
                className="searchIcon"
                path={mdiMagnify}
                title="search"
                size={2}
                color="white"
              />
              <Link to="/board">
                <Icon
                  className="boardIcon"
                  path={mdiClipboardText}
                  title="board"
                  size={2}
                  color="white"
                />
              </Link>
            </div>
            <div
              className="h-menu"
              onClick={(e) => {
                menu ? setMenu(false) : setMenu(true);
              }}
            >
              <Icon path={mdiMenu} title="menu" size={2} color="white" />
            </div>
            <div className="h-nav">
              {isLogin ? (
                <div>
                  <div
                    className={menu ? "h-nav-item active" : "h-nav-item"}
                    ref={menu1}
                  >
                    <hr />
                    <Link to="/create">
                      <Icon
                        path={mdiClipboardPlus}
                        title="register"
                        size={2}
                        color="#9D2437"
                      />
                      <div className="sub-title">Create</div>
                    </Link>
                    <hr />
                    <Link to="/refrigerator">
                      <Icon
                        path={mdiFridge}
                        title="refrigerator"
                        size={2}
                        color="#9D2437"
                      />
                      <div className="sub-title" style={{ fontSize: "12px" }}>
                        Refrigerator
                      </div>
                    </Link>
                    <hr />
                    <Link to="/profile">
                      <Icon
                        path={mdiAccount}
                        title="profile"
                        size={2}
                        color="#9D2437"
                      />
                      <div className="sub-title">Profile</div>
                    </Link>
                    <hr />
                    <Link to="/cart">
                      <Icon
                        path={mdiCart}
                        title="cart"
                        size={2}
                        color="#9D2437"
                      />
                      <div className="sub-title">Cart</div>
                    </Link>
                    <hr />
                    <Link>
                      <Icon
                        path={mdiLogout}
                        title="logout"
                        size={2}
                        onClick={logout}
                        color="#9D2437"
                      />
                      <div className="sub-title">Logout</div>
                    </Link>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {!isLogin ? (
                <div>
                  <div
                    className={menu ? "h-nav-items active" : "h-nav-items"}
                    ref={menu2}
                  >
                    <div>
                      <Link to="/signup">
                        <Icon
                          path={mdiAccountPlus}
                          title="signup"
                          size={2}
                          color={"#9D2437"}
                        />
                        <div className="sub-title">Sign Up</div>
                      </Link>
                    </div>
                    <hr />
                    <div>
                      <Link to="/login">
                        <Icon
                          path={mdiAccountArrowRight}
                          title="login"
                          size={2}
                          color={"#9D2437"}
                        />
                        <div className="sub-title">Login</div>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export const logout = () => {
  const cookie = new Cookies();
  cookie.remove("accessToken");
  window.location.href = "/";
};
export default React.memo(Header);

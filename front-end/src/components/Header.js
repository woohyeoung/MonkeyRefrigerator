//Header.js
<<<<<<< HEAD
import React, { useEffect, useState, useRef } from "react";
import "./Header.css";
=======
import React, { useEffect, useState, useRef, useCallback } from 'react';
import './Header.css';
>>>>>>> upstream/master
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
//router
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../store/actions/UserAction";

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [imgUrl, setImgUrl] = useState("/monkey_2.png");
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const monkey = useRef();
  const menu1 = useRef();
  const menu2 = useRef();
  const tokenReducer = useSelector((state) => state.tokenReducer.authenticated);
  const cookie = new Cookies();
  useEffect(() => {
    dispatch(handleLogin());
  });
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
              {/* <Link to="/search">
=======
import { Link, useHistory } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin } from '../store/actions/UserAction';
import { useLocation } from 'react-router';
import { keywordSave } from '../store/actions/SearchAction';

function Header() {
	const [isLogin, setIsLogin] = useState(false);
	const [imgUrl, setImgUrl] = useState('/monkey_2.png');
	const [menu, setMenu] = useState(false);
	const dispatch = useDispatch();
	const monkey = useRef();
	const menu1 = useRef();
	const menu2 = useRef();
	const tokenReducer = useSelector((state) => state.tokenReducer.authenticated);
	const cookie = new Cookies();
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		dispatch(handleLogin());
	});
	useEffect(() => {
		if (isLogin && !tokenReducer) {
			if (!cookie.get('accessToken')) {
				logout();
				alert('토큰이 만료되어 로그아웃 되었습니다.');
				window.location.reload();
			}
			dispatch(handleLogin());
		}
	});
	useEffect(() => {
		tokenReducer ? setIsLogin(true) : setIsLogin(false);
	}, [tokenReducer]);

	const searchInput = useRef();

	const [keyword, setKeyword] = useState('');

	const onChangeKeyword = useCallback(
		(e) => {
			setKeyword(e.target.value);
		},
		[keyword]
	);
	//엔터시 재료 검색
	const onKeyPress = async (e) => {
		if (e.key == 'Enter') {
			if (e.target.value === '') {
				window.alert('한글자 이상 입력해주세요.');
				return;
			}
			if (location.pathname === '/search') {
				e.target.value = '';
				dispatch(keywordSave(keyword));
			} else {
				e.target.value = '';
				async function pushSearch() {
					await history.push({
						pathname: '/search',
					});
				}
				dispatch(keywordSave(keyword));
				pushSearch();
			}
		}
	};

	return (
		<>
			<header>
				<div className="header">
					<div className="row-1">
						<Link to="/">
							<div className="h-logo">
								<img
									onMouseOver={() => {
										setImgUrl('/monkey_3.png');
										monkey.current.src = imgUrl;
									}}
									onMouseOut={() => {
										setImgUrl('/monkey_2.png');
										monkey.current.src = imgUrl;
									}}
									ref={monkey}
									src={imgUrl}
									width={90}
									height={90}
								></img>
							</div>
						</Link>

						<div className="h-title">
							<span>Monkey Refrigerator</span>
						</div>
						<div className="h-nav-item-alw">
							<input
								onKeyPress={onKeyPress}
								onChange={onChangeKeyword}
								className="inputbox"
								type="text"
								placeholder="Search"
							/>
							<Icon
								className="searchIcon"
								path={mdiMagnify}
								title="search"
								size={2}
								color="white"
							/>
							{/* <Link to="/search">
>>>>>>> upstream/master
                <div className="sub-title">검색</div>
              </Link> */}
              <Link to="/board">
                <Icon
                  className="boardIcon"
                  path={mdiClipboardText}
                  title="board"
                  size={2}
                  color="white"
                />
                {/* <div className="sub-title">레시피</div> */}
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
                      {/* <div className="sub-title">등록</div> */}
                    </Link>
                    <hr />
                    <Link to="/refrigerator">
                      <Icon
                        path={mdiFridge}
                        title="refrigerator"
                        size={2}
                        color="#9D2437"
                      />
                      {/* <div className="sub-title">냉장고</div> */}
                    </Link>
                    <hr />
                    <Link to="/profile">
                      <Icon
                        path={mdiAccount}
                        title="profile"
                        size={2}
                        color="#9D2437"
                      />
                      {/* <div className="sub-title">프로필</div> */}
                    </Link>
                    <hr />
                    <Link to="/cart">
                      <Icon
                        path={mdiCart}
                        title="cart"
                        size={2}
                        color="#9D2437"
                      />
                      {/* <div className="sub-title">장바구니</div> */}
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
                      {/* <div className="sub-title">로그아웃</div> */}
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
                        {/* <div className="sub-title">회원가입</div> */}
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
                        {/* <div className="sub-title">로그인</div> */}
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

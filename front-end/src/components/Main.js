//Main.js
import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	lazy,
	Suspense,
} from 'react';
import './Main.css';
import BoardList from './board/BoardList';
import BoardCreate from './board/BoardCreate';
import { Link, Route, Switch } from 'react-router-dom';
import Icon from '@mdi/react';
import Box from '@mui/material/Box';
//Login
import { Login } from './user/Login';
//Signup
import Signup from './user/SignUp';

function Main() {
	return (
		<>
			<div className="content">
				<div className="container">
					<Switch>
						<Route exact path="/">
							메인 페이지 - Router 들어가야함
						</Route>
						<Route path="/board">
							<BoardList />
						</Route>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/create">
							<BoardCreate />
						</Route>
					</Switch>
				</div>
			</div>
		</>
	);
}

export default Main;

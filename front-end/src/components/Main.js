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
import SignUp from './user/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin } from '../store/actions/UserAction';
import PublicRoute from './user/PublicRoute';
import PrivateRoute from './user/PrivateRoute';

function Main() {
	const dispatch = useDispatch();
	const tokenReducer = useSelector((state) => state.tokenReducer.authenticated);
	console.log(tokenReducer);
	useEffect(() => {
		dispatch(handleLogin());
	}, [dispatch]);
	return (
		<>
			<div className="content">
				<div className="container">
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
						<PrivateRoute component={BoardList} path="/board" exact />
						<PrivateRoute component={BoardCreate} path="/create" exact />
					</Switch>
				</div>
			</div>
		</>
	);
}

export default Main;

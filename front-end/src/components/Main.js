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
import { Link, Route, Switch } from 'react-router-dom';
import Icon from '@mdi/react';
import Footer from './Footer';

function Main() {
	return (
		<>
			<div className="center">
				<Switch>
					<Route exact path="/">
						메인 페이지 - Router 들어가야함
						<br />
					</Route>
					<Route path="/board">
						<BoardList />
					</Route>
					<Footer />
				</Switch>
			</div>
		</>
	);
}

export default Main;

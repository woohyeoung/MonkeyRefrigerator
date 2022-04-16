// import logo from './logo.svg';
import React, { useContext, useEffect, useState } from 'react';
import './App.css';
//redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './store/reducers/indexReducer';
import { BrowserRouter, Route } from 'react-router-dom';

//Header
import Header from './components/Header';

//Main
import Main from './components/Main';

//store
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

//최상위 컴포넌트 App
function App() {
	return (
		<Provider store={store}>
			<Header />
			<div className="container" style={{ background: '#fcf6f5ff' }}>
				<BrowserRouter>
					<Main />
				</BrowserRouter>
			</div>
		</Provider>
	);
}

export default App;

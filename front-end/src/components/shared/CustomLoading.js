//CustomLoading.js
import React from 'react';
// import ReactLoading from 'react-loading';
import './loading.css';
import 'react-spinner-animated/dist/index.css';
import {
	BarLoader,
	DoubleBubble,
	SlidingPebbles,
	Spinner,
} from 'react-spinner-animated';

const Loading = ({ type, color }) => (
	<>
		<Spinner
			className="border"
			text={'로딩중... '}
			bgColor={'white'}
			center={true}
			width={'200px'}
			height={'200px'}
		/>
	</>
);

export default Loading;

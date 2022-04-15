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
			text={'Loading...'}
			bgColor={'white'}
			center={true}
			width={'150px'}
			height={'150px'}
		/>
	</>
);

export default Loading;

import React, { useRef, useState, useEffect } from 'react';
import Icon from '@mdi/react';
import './scroll_to.css';
import { mdiArrowUpDropCircle } from '@mdi/js';
import { mdiArrowDownDropCircle } from '@mdi/js';
import $ from 'jquery';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

// var windowHeight = document.body.scrollHeight;
// var windowHeight = $(document).height() - $(window).height();
/* 오른쪽 하단 스크롤 올리기 내리기 숨기기 */
//스크롤시 버튼 사라지게 하기 제이쿼리
$(window).scroll(function () {
	$('#to-top').hide();
	$('#to-bottom').hide();

	clearTimeout($.data(this, 'scrollTimer'));
	$.data(
		this,
		'scrollTimer',
		setTimeout(function () {
			/**
			 * $(window).scrollTop()
			 * : 스크롤의 위치에 따라 변하는 값 (세로 좌표)
			 * : 맨 위에서 0으로 시작하여 맨아래 도달시 스크롤 길이 max값을 가짐.
			 * */
			// console.log($(document).height() - $(window).height());
			// console.log(Math.round($(window).scrollTop()));
			if (
				Math.round($(window).scrollTop()) >=
				$(document).height() - $(window).height()
			) {
				$('#to-top').show();
			} else if ($(this).scrollTop()) {
				$('#to-top').show();
				$('#to-bottom').show();
			} else {
				$('#to-bottom').show();
			}
		}, 250)
	);
});
// 윈도우 높이 구하기
function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}

function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowDimensions;
}

function ScrollTo() {
	// const { height, width } = useWindowDimensions();
	const [height_, setHeight_] = useState();
	// console.log($(document).height() - $(window).height() + 1);
	// console.log(height_);

	const height = $(document).height() - $(window).height() + 1;
	useEffect(() => {
		setHeight_(height);
	}, [$(window).scrollTop()]);
	const toTop = useRef();
	const toBottom = useRef();
	// // 페이지 맨위로 올리기
	const onTop = () => {
		// 	// 페이지 위치를 최상단으로 부드럽게(0.5초 동안) 이동.
		gsap.to(window, { duration: 0.5, scrollTo: 0 });
	};
	const onBottom = () => {
		// 	// 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
		gsap.to(window, { duration: 0.7, scrollTo: height_ });
	};
	return (
		<>
			{/* <!--TO BOTTOM BUTTON--> */}
			<div onClick={onBottom} ref={toTop} id="to-bottom">
				<Icon path={mdiArrowDownDropCircle} title="search" size={2} />
			</div>
			{/* <!--TO TOP BUTTON--> */}
			<div onClick={onTop} ref={toBottom} id="to-top">
				<Icon path={mdiArrowUpDropCircle} title="search" size={2} />
			</div>
		</>
	);
}

export default ScrollTo;

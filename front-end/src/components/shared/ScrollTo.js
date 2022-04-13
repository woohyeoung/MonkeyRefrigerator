import React, { useRef } from 'react';
import Icon from '@mdi/react';
import './scroll_to.css';
import { mdiArrowUpDropCircle } from '@mdi/js';
import { mdiArrowDownDropCircle } from '@mdi/js';
import $ from 'jquery';
import gsap from 'gsap';

/* 오른쪽 하단 스크롤 올리기 내리기 숨기기 */
var windowHeight = document.body.scrollHeight;
console.log(windowHeight);
// 페이지 맨위로 올리기
const toTopEl = $('#to-top');

// 페이지 맨아래로 내리기
const toBottomEl = $('#to-bottom');

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

			if (
				Math.round($(window).scrollTop()) ===
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

// // 페이지 맨위로 올리기
// toTopEl.addEventListener('click', function () {
// 	// 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
// 	gsap.to(window, 0.4, {
// 		scrollTo: 0,
// 	});
// });

// // 페이지 맨아래로 내리기
// toBottomEl.addEventListener('click', function () {
// 	// 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
// 	gsap.to(window, 0.4, {
// 		scrollTo: windowHeight,
// 	});
// });

function ScrollTo() {
	// 페이지 맨위로 올리기
	toTopEl.on('click', () => {
		// 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
		gsap.to(window, 0.4, {
			scrollTo: 0,
		});
	});

	// 페이지 맨아래로 내리기
	toBottomEl.on('click', () => {
		// 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
		gsap.to(window, 0.4, {
			scrollTo: windowHeight,
		});
	});
	return (
		<>
			{/* <!--TO BOTTOM BUTTON--> */}
			<div id="to-bottom">
				<Icon path={mdiArrowUpDropCircle} title="search" size={2} />
			</div>
			{/* <!--TO TOP BUTTON--> */}
			<div id="to-top">
				<Icon path={mdiArrowDownDropCircle} title="search" size={2} />
			</div>
		</>
	);
}

export default ScrollTo;

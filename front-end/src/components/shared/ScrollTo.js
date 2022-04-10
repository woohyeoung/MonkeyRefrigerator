import React, { useRef } from 'react';
import Icon from '@mdi/react';
import './scroll_to.css';
import { mdiArrowUpDropCircle } from '@mdi/js';
import { mdiArrowDownDropCircle } from '@mdi/js';

function ScrollTo() {
	const scroll = useRef();
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

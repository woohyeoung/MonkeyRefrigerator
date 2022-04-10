//Header.js
import React from 'react';
import './Header.css';
import { mdiMagnify } from '@mdi/js';
import { mdiFridge } from '@mdi/js';
import { mdiAccount } from '@mdi/js';
import Icon from '@mdi/react';

function Header() {
	return (
		<>
			<header>
				<div className="header">
					<div className="row">
						<div className="h-title">
							<span>❗타이틀❗</span>
						</div>
						<div className="h-icon">
							<Icon path={mdiMagnify} title="search" size={2} />
							<Icon path={mdiFridge} title="search" size={2} />
							<Icon path={mdiAccount} title="search" size={2} />
						</div>
					</div>
				</div>
				<div></div>
			</header>
		</>
	);
}

export default Header;

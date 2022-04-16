//Header.js
import React, { useState } from 'react';
import './Header.css';
import {
	mdiMagnify,
	mdiFridgeOutline,
	mdiAccount,
	mdiFridge,
	mdiAccountArrowRight,
	mdiClipboardText,
	mdiClipboardPlus,
} from '@mdi/js';

import {
	MailOutlined,
	AppstoreOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import Icon from '@mdi/react';
import { Menu } from 'antd';
import logoImg from '../assets/monkey_2.png';
import Navigator from './Navigator';

//router
import { Link, useHistory } from 'react-router-dom';

function Header() {
	const [isLogin, setIsLogin] = useState(false);
	const history = useHistory();
	return (
		<>
			<header>
				<div className="header">
					<div className="row">
						<div className="h-logo">
							<img src={logoImg} width={90} height={90}></img>
						</div>
						<div className="h-title">
							<span>Monkey Refrigerator</span>
						</div>
						{/* antd nav */}
						<div className="h-menu">{/* <Navigator /> */}</div>

						<div className="h-icon ">
							<Icon path={mdiMagnify} title="search" size={2} color="white" />

							<Icon
								path={mdiClipboardText}
								title="board"
								size={2}
								color="white"
							/>

							{!isLogin ? (
								<>
									<Icon
										path={mdiClipboardPlus}
										title="register"
										size={2}
										color="white"
									/>

									<Icon
										path={mdiFridge}
										title="refrigerator"
										size={2}
										color="white"
									/>
									<Link to="/signUp">
										<Icon path={mdiAccount} title="profile" size={2} />
									</Link>
								</>
							) : (
								<>
									<Link to="/signUp">
										<Icon
											path={mdiAccountArrowRight}
											title="signup"
											size={2}
											color={'white'}
										/>
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
				<div></div>
			</header>
		</>
	);
}

export default Header;

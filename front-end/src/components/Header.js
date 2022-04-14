//Header.js
import React, { useState } from 'react';
import './Header.css';
import { mdiMagnify } from '@mdi/js';
import { mdiFridge } from '@mdi/js';
import { mdiAccount } from '@mdi/js';
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
import { Link } from 'react-router-dom';

function Header() {
	const [isLogin, setIsLogin] = useState(false);
	return (
		<>
			<header>
				<div className="header">
					<div className="row">
						<div className="h-logo">
							<div className="row">
								<img src={logoImg} width={90} height={90}></img>
								<div className="h-title">
									<span>❗Monkey Refrigerator❗</span>
								</div>
							</div>
						</div>

						{/* antd nav */}
						<div className="h-menu">
							<Navigator />
						</div>

						<div className="h-icon">
							{!isLogin ? (
								<>
									<Icon path={mdiMagnify} title="search" size={2} />
									<Icon path={mdiFridge} title="refrigerator" size={2} />
									<Link to="/signUp">
										<Icon path={mdiAccount} title="profile" size={2} />
									</Link>
								</>
							) : (
								<>
									<Link to="/signUp">
										<Icon
											path={mdiAccount}
											title="search"
											size={2}
											color={'red'}
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

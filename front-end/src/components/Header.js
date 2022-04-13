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

//router
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

function Header() {
	const [current, setCurrent] = useState('mail');
	const handleClick = (e) => {
		console.log('click ', e);
		this.setState({ current: e.key });
	};

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
							<Menu
								style={{ background: 'rgb(224, 224, 232)' }}
								onClick={handleClick}
								selectedKeys={[current]}
								mode="horizontal"
							>
								<Menu.Item key="mail" icon={<MailOutlined />}>
									Navigation One
								</Menu.Item>
								<Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
									Navigation Two
								</Menu.Item>
								<SubMenu
									key="SubMenu"
									icon={<SettingOutlined />}
									title="Navigation Three - Submenu"
								>
									<Menu.ItemGroup title="Item 1">
										<Menu.Item key="setting:1">Option 1</Menu.Item>
										<Menu.Item key="setting:2">Option 2</Menu.Item>
									</Menu.ItemGroup>
									<Menu.ItemGroup title="Item 2">
										<Menu.Item key="setting:3">Option 3</Menu.Item>
										<Menu.Item key="setting:4">Option 4</Menu.Item>
									</Menu.ItemGroup>
								</SubMenu>
								<Menu.Item key="alipay">
									<a
										href="https://ant.design"
										target="_blank"
										rel="noopener noreferrer"
									>
										Navigation Four - Link
									</a>
								</Menu.Item>
							</Menu>
						</div>

						<div className="h-icon">
							{!isLogin ? (
								<>
									<Icon path={mdiMagnify} title="search" size={2} />
									<Icon path={mdiFridge} title="search" size={2} />
									<Link to="/signUp">
										<Icon path={mdiAccount} title="search" size={2} />
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

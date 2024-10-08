//Рисуем самую первую верхнюю картинку и провнеряем залогинены ли 
import React from 'react';
import s from './AppHeader.module.css';
import { NavLink } from 'react-router-dom';
import { Avatar, Button, Col, Layout, Menu, MenuProps, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserLogin, selectIsAuth } from '../../redux/auth-selectors';
import { logout } from '../../redux/auth-reducer';
import { AppDispatch } from '../../redux/redux-store';
import Logo  from '../../img/Logo.jpg';





//Типизация для "Header"-а
export type PropsType = {}


const { Header } = Layout;
//Горизонтальное меню вверху
const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
	key,
	label: `nav ${key}`,
}));

const AppHeader:React.FC<PropsType> = (props) => {

	// То, что раньше пробрасывали сверху из "State", получаем тут через "useSelector"------------------
	const isAuth = useSelector(selectIsAuth);
	const login = useSelector(selectCurrentUserLogin);


	//		ПРИВЕДЕНИЕ ТИПОВ для "UseDispatch"-а из-за изменений в Redux-е
	//const dispatch = useDispatch()
	const dispatch: AppDispatch = useDispatch()
	//Разлогиниться
	const logoutCallback = ()=> {
		dispatch(logout())
	}
//-----------------------------------------------------------------------------------------------------

	return (
		<Header className={s.header}>
			<Row>
				<Col span={3}>
					<div className={s.logoBlock}>	
						<img className={s.demoLogo} src={Logo} alt=''/>
					</div>
				</Col>

				<Col span={17} className={s.logoText}>
					<div>social network</div>
				</Col>

				{isAuth ? <>
					
					<Col className={s.loginBlock} span={4}>
						<div>
							<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
							&nbsp;&nbsp;&nbsp;{login} 
						</div>
						<Button onClick={logoutCallback}>Log out</Button>
					</Col>

					
					</>
				: 	<Col span={4} className={s.loginButton}>
						<Button>
							<NavLink to={'/login'}>Login</NavLink>
						</Button>
					</Col>
				}
			</Row>



      {/* <Menu
         theme="dark"
         mode="horizontal"
         defaultSelectedKeys={['2']}
         items={items1}
         style={{ flex: 1, minWidth: 0 }}
      />
      

		
		{isAuth ? 
					<div>
						<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
						{login} 
						<Button onClick={logputCallback}>Log out</Button>
					</div>
					: <NavLink to={'/login'}>Login</NavLink>} */}
		
		</Header> 

	);
}

export default AppHeader;
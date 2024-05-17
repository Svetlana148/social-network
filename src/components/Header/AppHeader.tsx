//Рисуем самую первую верхнюю картинку и провнряем залогинены ли 
import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { Avatar, Button, Col, Layout, Menu, MenuProps, Row } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserLogin, selectIsAuth } from '../../redux/auth-selectors';
import { logout } from '../../redux/auth-reducer';
import { AppDispatch } from '../../redux/redux-store';



//Типизация для "Header"-а
export type PropsType = {
	// isAuth: boolean
	// login: string | null
	// logout: ()=>void
}


const { Header } = Layout;
//Горизонтальное меню вверху
const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
	key,
	label: `nav ${key}`,
}));

const AppHeader:React.FC<PropsType> = (props) => {

	// То, что раньше пробрасывали сверху из "State", получаем тут через "useSelector"
	const isAuth = useSelector(selectIsAuth);
	const login = useSelector(selectCurrentUserLogin);


	//------ПРИВЕДЕНИЕ ТИПОВ для "UseDispatch"-а из-за изменений в Redux-е--------------------
	//const dispatch = useDispatch()
	const dispatch: AppDispatch = useDispatch()
	const logputCallback = ()=> {
		dispatch(logout())
	}





	return (

		<Header >
      <div className="demo-logo" />


		<Row>
				<Col span={18}>
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={['2']}
					items={items1}
					
				/>
				</Col>
				

				{isAuth ? <>
							<Col span={1}>
								<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
							</Col>

							<Col span={5}>
								{login} <Button onClick={logputCallback}>Log out</Button>
							</Col>
							</>

							
						: 	<Col span={6}>
								<NavLink to={'/login'}>Login</NavLink>
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
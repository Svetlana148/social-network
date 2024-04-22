//Боковая панель на главном экране (sidebar)

import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';


//Типизация для "Navbar"-а
type PropsType = {
	// frendsData:
}

const Navbar:React.FC<PropsType> = (props) => {
	return (
		<div className={s.sidebar}>

			<nav className={s.nav}>
				<div>
					<NavLink to='/Profile' className={ navData => navData.isActive ? s.activeLink : s.link }>Profile</NavLink>
				</div>
				
				<div>
					<NavLink to='/Dialogs' className={ navData => navData.isActive ? s.activeLink : s.link }>Messages</NavLink>
				</div>

				<div >
					<NavLink to='/News' className={ navData => navData.isActive ? s.activeLink : s.link }>News</NavLink>
				</div>

				<div >
					<NavLink to='/Users' className={ navData => navData.isActive ? s.activeLink : s.link }>Users</NavLink>
				</div>

				<div >
					<NavLink to='/Music' className={ navData => navData.isActive ? s.activeLink : s.link }>Music</NavLink>
				</div>

				<div >
					<NavLink to='/Settings' className={ navData => navData.isActive ? s.activeLink : s.link }>Settings</NavLink>
				</div>

				
			</nav>

			<div>
				Frends
				<div>
					{/* {props.frendsData} */}
				</div>
			</div>
		</div>
	);
}

export default Navbar;
import React from "react";
import s from "./DialogItem.module.css";
import { NavLink } from "react-router-dom";






const DialogItem = (props) => {
	let path = '/Dialogs/' + props.id;
	return (
		<div>
			<div className={s.dialog + ' ' + s.active}>
				<NavLink to={path}>
				
					<img className={s.avatar} src="https://cspromogame.ru//storage/upload_images/avatars/1299.jpg" alt="" />
				
					{props.name} 
				</NavLink>
					
			</div>
		</div>
	)
}

// ---------------------------------------------------------------




export default DialogItem;
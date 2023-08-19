import React from "react";
import s from "./DialogItem.module.css";
import { NavLink } from "react-router-dom";



const DialogItem = (props) => {
	let path = '/Dialogs/' + props.id;
	return (
		<div className={s.dialog + ' ' + s.active}>
			<NavLink to={path}>{props.name} </NavLink>
		</div>
	)
}

// ---------------------------------------------------------------



const Dialogs = (props) => {

	let dialogsData = [
		{ id: 1, name: "Ola" },
		{ id: 2, name: 'Masha' },
		{ id: 3, name: 'Katy' }
	];


	let dialogsElements = dialogsData.map(d => <DialogItem name={d.name} id={d.id} />);
// -----------------------------------


export default DialogItem;
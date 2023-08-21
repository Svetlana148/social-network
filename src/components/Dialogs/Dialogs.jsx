import React from "react";
import s from "./Dialogs.module.css";
// import { NavLink } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem.jsx";
import Message from "./Message/Message.jsx";


const Dialogs = (props) => {
	
// ---------------------------------------------------------------
	let messagesData = [
		{id: 1, message: 'Hallo'},
		{id: 2, message: 'Tchudfg'},
		{id: 2, message: 'Gut'}
	];

	let messagesElement = messagesData.map(m => <Message message = {m.message} />);
// -----------------------------------

	let dialogsData = [
		{ id: 1, name: "Ola" },
		{ id: 2, name: 'Masha' },
		{ id: 3, name: 'Katy' }
	];

	let dialogsElements = dialogsData.map(d => <DialogItem name={d.name} id={d.id} />);
//-----------------------------------

	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>
				{dialogsElements}
			</div>

			<div className={s.messages}>
				{messagesElement}
			</div>

		</div>
	)
}
export default Dialogs;
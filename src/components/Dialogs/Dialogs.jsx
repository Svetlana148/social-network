import React from "react";
import s from "./Dialogs.module.css";
// import { NavLink } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem.jsx";
import Message from "./Message/Message.jsx";


const Dialogs = (props) => {
	


	let messagesElement = props.messagesData.map(m => <Message message = {m.message} />);
	let dialogsElements = props.dialogsData.map(d => <DialogItem name={d.name} id={d.id} />);
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
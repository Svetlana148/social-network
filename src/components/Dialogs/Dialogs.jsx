import React from "react";
import s from "./Dialogs.module.css";
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

const Message=(props)=>{
	return(
		<div className="message">
			{props.message}
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



	let dialogsElements = dialogsData.
	map(dialog => <DialogItem name={dialog.name} id={dialog.id} />)

	
// -----------------------------------

	let messagesData = [
		{id: 1, message: 'Hallo'},
		{id: 2, message: 'Tchudfg'},
		{id: 2, message: 'Gut'}
	];
// -----------------------------------


	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>

				{dialogsElements}
				{/* let DialogItem = (dialog => (dialogsData)) */}

				
			</div>


			<div className={s.messages}>
								
				{/* <div className={s.message}>Hallo</div>
				<Message message='Hallo'/>*/}
				


				<Message message={messagesData[0].message} />
				<Message message={messagesData[1].message} />
				<Message message={messagesData[2].message} />

			</div>

		</div>
	)
}
export default Dialogs;
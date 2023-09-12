import React from "react";
import s from "./Dialogs.module.css";
// import { NavLink } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem.jsx";
import Message from "./Message/Message.jsx";
// import {updateNewMessageTextActionCreator, addMessageActionCreator} from './../../redux/dialogs-reducer';


const Dialogs = (props) => {




let newMessageElement = React.createRef();


let onMessageChange = ()=>{
	let text =  newMessageElement.current.value;
		// BLLstate renew------------------------
		props.updateNewMessageText(text);

};
// value------------------------------------
// take from state  - props    newMessageText

// addMessage-----------------------------------------
let addMessage = ()=>{
	props.addMessage();
};
// ----------------------------------------------------------------------------

	let dialogsElements = props.dialogsPage.dialogsData.map(d => <DialogItem name={d.name} id={d.id} />);
	let messagesElement = props.dialogsPage.messagesData.map(m => <Message message = {m.message} />);

//-----------------------------------

	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>
				{dialogsElements}
			</div>

			<div className={s.messages}>
				{messagesElement}
{/* --------------------------------------------------------------------------- */}
				<div>
				<textarea onChange={onMessageChange} ref={newMessageElement} value={props.newMessageText}/>
				</div>

				<div>
					<button onClick={addMessage}>Send</button>
				</div>
{/* --------------------------------------------------------------------------- */}



			</div>
			
			

		</div>
	)
}
export default Dialogs;
import React from "react";
import s from "./Dialogs.module.css";
// import { NavLink } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem.jsx";
import Message from "./Message/Message.jsx";
import {updateNewMessageTextActionCreator, addMessageActionCreator} from './../../redux/State';


const Dialogs = (props) => {



// ref------------------------------------
let newMessageElement = React.createRef();

// onChange-------------------------------
let onMessageChange = ()=>{
	let text =  newMessageElement.current.value;
		// BLLstate renew------------------------
		props.dispatch(updateNewMessageTextActionCreator(text));
};
// value------------------------------------
// take from state  - props    newMessageText

// addMessage-----------------------------------------
// take from BLLstate  - props    addMessage
let addMessage = ()=>{
	props.dispatch(addMessageActionCreator());
};
// ----------------------------------------------------------------------------




	let dialogsElements = props.Data.dialogsData.map(d => <DialogItem name={d.name} id={d.id} />);
	let messagesElement = props.Data.messagesData.map(m => <Message message = {m.message} />);

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
				<textarea onChange={onMessageChange} ref={newMessageElement} value={props.Data.newMessageText}/>
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
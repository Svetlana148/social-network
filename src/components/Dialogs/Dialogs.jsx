import React from "react";
import s from "./Dialogs.module.css";
import { Navigate } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem.jsx";
import Message from "./Message/Message.jsx";
// import {updateNewMessageTextActionCreator, addMessageActionCreator} from './../../redux/dialogs-reducer';
import { Field, reduxForm } from 'redux-form';



const Dialogs = (props) => {

let newMessageElement = React.createRef();

// let onMessageChange = ()=>{
// 	let text =  newMessageElement.current.value;
// 		// BLLstate renew------------------------
// 		props.updateNewMessageText(text);
// };



// addMessage-----------------------------------------
// let addMessage = ()=>{
// 	props.addMessage();
// };

// Redux-Form---------------------------------------------
let addNewMessage=(values)=>{
	props.addMessage(values.newMessageText);
};
// ----------------------------------------------------------------------------

	let dialogsElements = props.dialogsPage.dialogsData.map(d => <DialogItem name={d.name} id={d.id} />);
	let messagesElement = props.dialogsPage.messagesData.map(m => <Message message = {m.message} />);

//   Check LOGIN-----------------------------------


if (!props.isAuth) return <Navigate to={("/Login")}/>


//-----------------------------------

	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>
				{dialogsElements}
			</div>

			<div className={s.messages}>
				<div>{messagesElement}</div>


				<div><AddMessageFormRedux onSubmit={addNewMessage}/></div>
				{/* <div>
				<textarea onChange={onMessageChange} ref={newMessageElement} value={props.newMessageText}/>
				</div>

				<div>
					<button onClick={addMessage}>Send</button>
				</div> */}
			</div>
		</div>
	)
}

// ---Redux-Form-----------------------------------------------------------------------

const AddMessageForm = (props) =>{
	return(
		<form onSubmit ={props.handleSubmit}>
			<div>
				<Field component={"textarea"} 
						name={"newMessageText"} 
						placeholder={"Enter your message"}>
				</Field>
				{/* <textarea 
					onChange={onMessageChange} 
					value={props.newMessageText} 
					placeholder={"Enter your message"}/> */}
			</div>

			<div>
				<button>Send</button>
			</div>
		</form>
	);
}

const AddMessageFormRedux=reduxForm({
	form : "dialogAddMessageForm"
})(AddMessageForm)




// --------------------------------------------------------------------------



export default Dialogs;
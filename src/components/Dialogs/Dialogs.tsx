//Отрисовывает все диалоги и Message-и
// и вызывает форму для добавления Message-а

import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { AddMessageActionCreatorType, InitialStateType } from "../../redux/dialogs-reducer";
import { AddMessageForm } from "./Message/AddMessageForm/AddMessageForm";



type PropsType = {							//Типизируем Props-ы к-ты "Dialogs"
	dialogsPage: InitialStateType
	addMessageActionCreator: AddMessageActionCreatorType
}



const Dialogs : React.FC<PropsType> = (props) => {

	let state = props.dialogsPage;	//Вспомогательно берем в "let state ="(с которым далее будем работать) только "props.dialogsPage"

	//Отрисовывает все диалоги и Message-и  ------------------------------------------------------------------
	let dialogsElements = state.dialogsData.map(d => <DialogItem name={d.name} id={d.id} />);
	let messagesElement = state.messagesData.map(m => <Message message={m.message} />);
	// let newMessageText = state.newMessageText;

	// Данные из Form-ы ---------------------------------------------
	// let addNewMessage = (values: { newMessageText: string }) => { props.addMessageActionCreator(values.newMessageText); };	// addMessage-----
	// ----------------------------------------------------------------------------

	//  Проверка заLOGIN-нены ли происходит в "DialogsContainer.tsx" и  далее перенаправление на "Login" в "WithAuthRedirect"
	//т.о. здесь проверки уже нет--------------------------------------------------------------------------------------------------



	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>
				{dialogsElements}
			</div>

			<div className={s.messages}>
				<div>{messagesElement}</div>


				<div><AddMessageForm addMessageActionCreator = {props.addMessageActionCreator}/></div>
			</div>
		</div>
	)
}

// ---Redux-Form-----------------------------------------------------------------------

// const AddMessageForm = (props) =>{
// 	return(
// 		<form onSubmit ={props.handleSubmit}>
// 			<div>
// 				<Field component={"textarea"} 
// 						name={"newMessageText"} 
// 						placeholder={"Enter your message"}>
// 				</Field>


// 				{/* <textarea 
// 					onChange={onMessageChange} 
// 					value={props.newMessageText} 
// 					placeholder={"Enter your message"}/> */}

// 			</div>

// 			<div>
// 				<button>Send</button>
// 			</div>
// 		</form>
// 	);
// }





// --------------------------------------------------------------------------



export default Dialogs;
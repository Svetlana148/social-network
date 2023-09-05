import React from "react";
import s from "./Dialogs.module.css";
// import { NavLink } from "react-router-dom";
import {updateNewMessageTextActionCreator, addMessageActionCreator} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';


const DialogsContainer = (props) => {


let onMessageChange = (text)=>{
		props.store.dispatch(updateNewMessageTextActionCreator(text));
		
};

let addMessage = ()=>{
	props.store.dispatch(addMessageActionCreator());
};
// ----------------------------------------------------------------------------

let state = props.store.getState();



	return (
		<Dialogs updateNewMessageText = {onMessageChange} addMessage = {addMessage} 
					dialogsData = {state.dialogsPage.dialogsData} messagesData = {state.dialogsPage.messagesData}
					NewMessageText = {state.dialogsPage.NewMessageText} />
	)
}

export default DialogsContainer;
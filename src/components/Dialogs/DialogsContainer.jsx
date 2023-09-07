import React from "react";
import s from "./Dialogs.module.css";
// import { NavLink } from "react-router-dom";
import {updateNewMessageTextActionCreator, addMessageActionCreator} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';



// const DialogsContainer = (props) => {


// let onMessageChange = (text)=>{
// 		props.store.dispatch(updateNewMessageTextActionCreator(text));
		
// };

// let addMessage = ()=>{
// 	props.store.dispatch(addMessageActionCreator());
// };
// // ----------------------------------------------------------------------------

// let state = props.store.getState();



// 	return (
// 		<Dialogs updateNewMessageText = {onMessageChange} addMessage = {addMessage} 
// 					dialogsData = {state.dialogsPage.dialogsData} messagesData = {state.dialogsPage.messagesData}
// 					newMessageText = {state.dialogsPage.newMessageText} />
// 	)
// }
// -----------------------------------------------------------------------------------------------------------
let mapStateToProps = (state)=>{
	return{
		dialogsPage : state.dialogsPage
	}
}
let mapDispatchToProps = (dispatch)=>{
	return{
		updateNewMessageText : (text)=>{
			let action = updateNewMessageTextActionCreator(text);
			dispatch(action);
		},
		
		addMessage : ()=>{
			dispatch(addMessageActionCreator());
		}
	}
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);


export default DialogsContainer;
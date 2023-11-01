import React from "react";
import s from "./Dialogs.module.css";
// import { NavLink } from "react-router-dom";
import {updateNewMessageTextActionCreator, addMessageActionCreator} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';



// -----------------------------------------------------------------------------------------------------------
let mapStateToProps = (state)=>{
	return{
		dialogsPage : state.dialogsPage,
		isAuth : state.auth.isAuth
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
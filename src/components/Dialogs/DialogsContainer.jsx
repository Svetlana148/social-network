import React from "react";
import s from "./Dialogs.module.css";
// import { NavLink } from "react-router-dom";
import {updateNewMessageTextActionCreator, addMessageActionCreator} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../hok/withAuthRedirect.js';
import { compose } from "redux";



// -----------------------------------------------------------------------------------------------------------
let mapStateToProps = (state)=>{
	return{
		dialogsPage : state.dialogsPage,
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

// HOK---------------------------------------------------



//let AuthRedirectComponent = withAuthRedirect(Dialogs);


//const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);


export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs);
//DialogsContainer;
import React from "react";
// import s from "./Users.module.css";
import {followAC, unfollowAC,setUsersAC} from '../../redux/users-reducer';
import Users from './Users';
import {connect} from 'react-redux';




let mapStateToProps = (state)=>{
	return{
		users : state.usersPage.users
	}
}


let mapDispatchToProps = (dispatch)=>{
	return{
		follow : (userId)=>{
			let action = followAC(userId);
			dispatch(action);
		},
		unfollow : (userId)=>{
			let action = unfollowAC(userId);
			dispatch(action);
		},
		
		setUsers : (users)=>{
			dispatch(setUsersAC(users));
		}
	}
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);


export default UsersContainer;
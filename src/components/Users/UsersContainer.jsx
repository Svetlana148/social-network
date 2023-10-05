import React from "react";
// import s from "./Users.module.css";
import {followAC, unfollowAC, setUsersAC, setCurrentPageAC, setTotalUsersCountAC} from '../../redux/users-reducer';
import Users from './Users';
import {connect} from 'react-redux';




let mapStateToProps = (state)=>{
	return{
		users : state.usersPage.users,
		pageSize : state.usersPage.pageSize,
		totalUsersCount : state.usersPage.totalUsersCount,
		currentPage : state.usersPage.currentPage,
	}
}


let mapDispatchToProps = (dispatch)=>{
	return{
		follow : (userId)=>{
			dispatch(followAC(userId));
		},

		unfollow : (userId)=>{
			let action = unfollowAC(userId);
			dispatch(action);
		},
		
		// send in BLL users
		setUsers : (users)=>{
			dispatch(setUsersAC(users));
		},

		// send in BLL current page
		setCurrentPage : (pageNumber)=>{
			dispatch(setCurrentPageAC(pageNumber));
		},

		// send in BLL total count of users
		setTotalUsersCount : (totalUsersCount)=>{

			dispatch(setTotalUsersCountAC(totalUsersCount));
		},


	}
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);


export default UsersContainer;
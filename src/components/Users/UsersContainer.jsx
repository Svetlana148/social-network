import React from 'react';
// import s from './Users.module.css';
import {followAC, unfollowAC, setUsersAC, setCurrentPageAC, setTotalUsersCountAC, toggleIsFetchingAC} from '../../redux/users-reducer';
import Users from './Users';
import axios from 'axios';
import {connect} from 'react-redux';
import Preloader from '../common/preloader/Preloader.jsx';





class UsersAPIComponent extends React.Component {
	
	onPageChanged = (numberPage)=>{
		this.props.setCurrentPage(numberPage);

		this.props.toggleIsFetching(true);
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${numberPage}&count=${this.props.pageSize}`)
		.then (responce =>{
			this.props.toggleIsFetching(false);
			this.props.setUsers(responce.data.items);
		});
	}

	componentDidMount(){
		this.props.toggleIsFetching(true);
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
		.then (responce =>{
			this.props.toggleIsFetching(false);
			this.props.setUsers(responce.data.items);
			this.props.setTotalUsersCount(responce.data.totalCount);

			});
	}

	render(){

		return <>
			{this.props.isFetching ? <Preloader /> : null}
			<Users 
					totalUsersCount={this.props.totalUsersCount}
					pageSize={this.props.pageSize}
					currentPage={this.props.currentPage}
					onPageChanged = {this.onPageChanged}
					users = {this.props.users}
					follow = {this.props.follow}
					unfollow = {this.props.unfollow}
					isFetching= {this.props.isFetching}
					/>
		</>
	}
}




let mapStateToProps = (state)=>{
	return{
		users : state.usersPage.users,
		pageSize : state.usersPage.pageSize,
		totalUsersCount : state.usersPage.totalUsersCount,
		currentPage : state.usersPage.currentPage,
		isFetching : state.usersPage.isFetching,
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

		toggleIsFetching : (isFetching)=>{
			dispatch(toggleIsFetchingAC(isFetching));
		},
	}
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent);


export default UsersContainer;
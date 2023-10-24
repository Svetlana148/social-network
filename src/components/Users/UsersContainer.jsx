import React from 'react';
// import s from './Users.module.css';
import {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching} from '../../redux/users-reducer';
import Users from './Users';
import axios from 'axios';
import {connect} from 'react-redux';
import Preloader from '../common/preloader/Preloader.jsx';
import {usersAPI} from '../api/api.js';






class UsersAPIComponent extends React.Component {
	
	onPageChanged = (numberPage)=>{
		this.props.setCurrentPage(numberPage);

		this.props.toggleIsFetching(true);
		usersAPI.getUsers(numberPage, this.props.pageSize).then (data =>{
			this.props.toggleIsFetching(false);
			this.props.setUsers(data.items);
		});
	}

	componentDidMount(){
		this.props.toggleIsFetching(true);

		usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then (data =>{
			this.props.toggleIsFetching(false);
			this.props.setUsers(data.items);
			this.props.setTotalUsersCount(data.totalCount);

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




const UsersContainer = connect(mapStateToProps, 
	{follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching})(UsersAPIComponent);


export default UsersContainer;
import React from 'react';
// import s from './Users.module.css';
import {follow, unfollow, toggleFollowingProgress,
	getUsers} from '../../redux/users-reducer';
import Users from './Users';
import {connect} from 'react-redux';
import Preloader from '../common/preloader/Preloader.jsx';
import {withAuthRedirect} from '../hok/withAuthRedirect.js';








class UsersAPIComponent extends React.Component {


	componentDidMount(){

		this.props.getUsers(this.props.currentPage, this.props.pageSize);
		// this.props.toggleIsFetching(true);

		// usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then (data =>{
		// 	this.props.toggleIsFetching(false);
		// 	this.props.setUsers(data.items);
		// 	this.props.setTotalUsersCount(data.totalCount);

		// 	});
	}




	
	onPageChanged = (numberPage)=>{

		this.props.getUsers(numberPage, this.props.pageSize);

		// this.props.setCurrentPage(numberPage);

		// this.props.toggleIsFetching(true);
		// usersAPI.getUsers(numberPage, this.props.pageSize).then (data =>{
		// 	this.props.toggleIsFetching(false);
		// 	this.props.setUsers(data.items);
		// });
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
					followingInProgress= {this.props.followingInProgress} 
					toggleFollowingProgress= {this.props.toggleFollowingProgress}
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
		followingInProgress : state.usersPage.followingInProgress,
	}
}




const UsersContainer = withAuthRedirect(connect(mapStateToProps, 
	{follow, unfollow, toggleFollowingProgress, getUsers})(UsersAPIComponent));


export default UsersContainer;
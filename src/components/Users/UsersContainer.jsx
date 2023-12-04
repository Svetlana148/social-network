import React from 'react';
// import s from './Users.module.css';
import { follow, unfollow, toggleFollowingProgress, requestUsers } from '../../redux/users-reducer';
import Users from './Users';
import { connect } from 'react-redux';
import Preloader from '../common/preloader/Preloader.jsx';
import { withAuthRedirect } from '../hok/withAuthRedirect.js';
import { compose } from 'redux';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors.js';



class UsersAPIComponent extends React.Component {


	componentDidMount() {

		this.props.requestUsers(this.props.currentPage, this.props.pageSize);
		// this.props.toggleIsFetching(true);
	}


	onPageChanged = (numberPage) => {

		this.props.requestUsers(numberPage, this.props.pageSize);

		// this.props.setCurrentPage(numberPage);

		// this.props.toggleIsFetching(true);
		// usersAPI.requestUsers(numberPage, this.props.pageSize).then (data =>{
		// 	this.props.toggleIsFetching(false);
		// 	this.props.setUsers(data.items);
		// });
	}



	render() {

		return <>
			{this.props.isFetching ? <Preloader /> : null}
			<Users
				totalUsersCount={this.props.totalUsersCount}
				pageSize={this.props.pageSize}
				currentPage={this.props.currentPage}
				onPageChanged={this.onPageChanged}
				users={this.props.users}
				follow={this.props.follow}
				unfollow={this.props.unfollow}
				isFetching={this.props.isFetching}
				followingInProgress={this.props.followingInProgress}
				toggleFollowingProgress={this.props.toggleFollowingProgress}
			/>
		</>
	}
}

// let mapStateToProps = (state)=>{
// 	return{
// 		users : state.usersPage.users,
// 		pageSize : state.usersPage.pageSize,
// 		totalUsersCount : state.usersPage.totalUsersCount,
// 		currentPage : state.usersPage.currentPage,
// 		isFetching : state.usersPage.isFetching,
// 		followingInProgress : state.usersPage.followingInProgress,
// 	}
// }

let mapStateToProps = (state) => {
	return {
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state),
	}
}






export default compose(
	withAuthRedirect,
	connect(mapStateToProps, { follow, unfollow, toggleFollowingProgress, requestUsers }))
	(UsersAPIComponent);
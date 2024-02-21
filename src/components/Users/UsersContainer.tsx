import React from 'react';
// import s from './Users.module.css';
import { follow, unfollow, toggleFollowingProgress, requestUsers } from '../../redux/users-reducer';
import Users from './Users';
import { connect } from 'react-redux';
import Preloader from '../common/preloader/Preloader.jsx';
import { withAuthRedirect } from '../hoc/withAuthRedirect.js';
import { compose } from 'redux';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors.js';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';


//Типизируем Props-сы к-ты UsersAPIComponent
type PropsType ={
	pageSize : number
	currentPage : number
	isFetching : boolean
	totalUsersCount : number
	users : Array<UserType> 
	followingInProgress : Array<number>

	follow : ()=>void 
	unfollow : ()=>void 
	requestUsers : (currentPage : number, pageSize : number)=>void // Ф-ция принимает параметры и ничего не возвращает
}

class UsersAPIComponent extends React.Component<PropsType> {

	componentDidMount() {

		this.props.requestUsers(this.props.currentPage, this.props.pageSize);
		// this.props.toggleIsFetching(true);
	}


	onPageChanged = (numberPage : number) => {

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
				// isFetching={this.props.isFetching}
				followingInProgress={this.props.followingInProgress}
				// toggleFollowingProgress={this.props.toggleFollowingProgress}
			/>
		</>
	}
}


let mapStateToProps = (state: AppStateType) => {
	return {
		//Здесь используются селекторы
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state),
	}
}





// compose применяет к к-те последовательно разные HOC (High_Order_Component)
// HOC - ф-ция, кот. принимает 1 к-ту, а возвращает контейнерную к-ту над входящей, стобы дать первой к-те какие-то данные
export default compose(
	
	withAuthRedirect,
	connect(mapStateToProps, { follow, unfollow, toggleFollowingProgress, requestUsers }))
	(UsersAPIComponent);
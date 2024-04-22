import React from 'react';
// import s from './Users.module.css';
import { follow, unfollow, requestUsers } from '../../redux/users-reducer';
import Users from './Users';
import { connect } from 'react-redux';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

//  Структура контейнеров:    compose   (withAuthRedirect( connect  ( UsersAPIComponent (Users)))) 

//Типизируем 3 вида Props-сотв для к-ты UsersAPIComponent
type OwnPropsType = {
	pageTitle: string
}

type MapStatePropsType = {
	pageSize: number
	currentPage: number
	isFetching: boolean
	totalUsersCount: number
	users: Array<UserType>
	followingInProgress: Array<number>
}

type MapDispatchPropsType = {
	follow: (userId: number) => void
	unfollow: (userId: number) => void
	requestUsers: (currentPage: number, pageSize: number) => void // Ф-ция принимает параметры и ничего не возвращает
}
// Общий тип для для к-ты UsersAPIComponent, состоит из всех 3 видов Props-сов
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
//------------------------------------------------------------------------------------

class UsersAPIComponent extends React.Component<PropsType> {

	componentDidMount() {

		this.props.requestUsers(this.props.currentPage, this.props.pageSize);
		// this.props.toggleIsFetching(true);
	}


	onPageChanged = (numberPage: number) => {

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
			<h2>{this.props.pageTitle}</h2>
			{this.props.isFetching ? <Preloader /> : null}
			<Users
				totalUsersCount={this.props.totalUsersCount}
				pageSize={this.props.pageSize}
				currentPage={this.props.currentPage}
				onPageChanged={this.onPageChanged}
				users={this.props.users}
				follow={this.props.follow}
				unfollow={this.props.unfollow}
				//isFetching={this.props.isFetching}
				followingInProgress={this.props.followingInProgress}
			// toggleFollowingProgress={this.props.toggleFollowingProgress}
			/>
		</>
	}
}

// Типизируем mapStateToProps через state: AppStateType
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		//Здесь используются селекторы (getUsers(state))
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
//MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, PropsType
export default compose<React.ComponentType>(

	withAuthRedirect,
	// типы для connect-а    TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState-основной глоб.State 
	connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>

		(mapStateToProps, { follow, unfollow, requestUsers }))
	//

	(UsersAPIComponent);



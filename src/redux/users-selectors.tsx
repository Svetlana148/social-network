// Селекторы принимают "State" целиком и оттуда достают нужное им

import {createSelector} from 'reselect'; 
import { AppStateType } from '../redux/redux-store';


//-----------------------------------------------------
// Типизируем getUsersSelector селектор через (state : AppStateType)
export const getUsersSelector= (state : AppStateType) => {
	return state.usersPage.users;
}

export const getUsers = createSelector(getUsersSelector, (users) => {
	return users.filter(u => true);
})
//-----------------------------------------------------

export const getPageSize = (state : AppStateType) => {
	return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state : AppStateType) => {
	return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state : AppStateType) => {
	return state.usersPage.currentPage;
}
export const getIsFetching = (state : AppStateType) => {
	return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state : AppStateType) => {
	return state.usersPage.followingInProgress;
}
export const getUsersFilter = (state : AppStateType) => {
	return state.usersPage.filter;
}

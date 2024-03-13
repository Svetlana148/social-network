import { usersAPI } from '../components/api/users-api';
import { UserType } from '../types/types';
import { updateObjectInArray } from '../utils/object-helpers';
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-store';

import { Dispatch } from 'redux'


//Типизируем initialState
let initialState = {
	users: [] as Array<UserType>, //Типизируем как массив ранее описанных типов
	pageSize: 10,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [] as Array<number>, //массив userId
};
//Выделяем  Type из initialState
type InitialStateType = typeof initialState;




const usersReducer = (state = initialState, action : ActionsTypes): InitialStateType => {
	switch (action.type) {

		case 'USERS/FOLLOW':
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", { followed: true }),
			}


		case 'USERS/UNFOLLOW':
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", { followed: false }),

				// users : state.users.map( u=>
				// 	{if (u.id===action.userId) {
				// 		return{...u, followed : false}
				// 		};
				// 		return(u);
				// 	})			
			};



		case 'USERS/SET_USERS':
			return {
				...state,
				// users : [...state.users, ...action.users]
				users: action.users
			};

		case 'USERS/SET_CURRENT_PAGE':
			return {
				...state,
				currentPage: action.currentPage
			};

		case 'USERS/SET_TOTAL_USERS_COUNT':
			return { ...state, totalUsersCount: action.totalUsersCount };

			case 'USERS/TOGGLE_IS_FETCHING':
			return { ...state, isFetching: action.isFetching };

		case 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
			return {
				...state,
				followingInProgress: action.isFetching ?
					[...state.followingInProgress, action.userId] :
					state.followingInProgress.filter(id => id !== action.userId),
			};
		
		default:
			return (state);
	}
};
export default usersReducer;


//-ActionCreator  SET--------------------------------------------------------------
// ActionCreator  Post-----------------------------------------
// Типизируем все "actions"------------------------
type ActionsTypes = InferActionsTypes<typeof actions>

// Упаковываем все АС в Объект "actions"------------------------
export const actions = {
	//Ключ(название АС) : значение (сам АС)
	followSuccess : (userId: number) => ({ type: 'USERS/FOLLOW', userId } as const),
	unfollowSuccess : (userId: number) => {return { type: 'USERS/UNFOLLOW', userId } as const},
	setCurrentPage : (currentPage: number) => {return { type: 'USERS/SET_CURRENT_PAGE', currentPage: currentPage } as const},
	setTotalUsersCount : (totalUsersCount: number) => {return { type: 'USERS/SET_TOTAL_USERS_COUNT', totalUsersCount: totalUsersCount } as const},
	toggleIsFetching : (isFetching: boolean) => {return { type: 'USERS/TOGGLE_IS_FETCHING', isFetching: isFetching } as const},
	toggleFollowingProgress : (isFetching: boolean, userId: number)=> {return { type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const},
	setUsers : (users: Array<UserType>) =>({ type: 'USERS/SET_USERS', users } as const),
}

//--type ActionsTypes = typeof actions;



//-----------------ThunkCreators-----------------------------------------------------------------------------

//Типизируем ThunkCreator requestUsers------------------

// Подготавливаем типизацию для 		
//"async (dispatch : DispatchType, getState : AppStateType ) => {"
//внутри requestUsers
//{ Dispatch } from 'redux'
type DispatchType = Dispatch<ActionsTypes>  //для const "_followUnfollowFlow"

type ThunkType = BaseThunkType<ActionsTypes>  //Локальный "ThunkType" типизирован общим типом "BaseThunkType" с нашими "<ActionsTypes>"-ми
//--------------------------------------------------




export const requestUsers = (page: number, pageSize: number): ThunkType => {

	return (
		async (dispatch: DispatchType, getState) => {
			dispatch(actions.toggleIsFetching(true));
			dispatch(actions.setCurrentPage(page));

			let data = await usersAPI.requestUsers(page, pageSize);
			dispatch(actions.toggleIsFetching(false));
			dispatch(actions.setUsers(data.items));
			dispatch(actions.setTotalUsersCount(data.totalCount));
		}
	);
}

//------------------------------------
//"_followUnfollowFlow"    '_Имя'  Так записываются внутренние ф-ции

//Это (_followUnfollowFlow) общая чать для const-ант follow и unfollow
//"=> FollowSuccessType | UnFollowSuccessType" - что по итогу получим, когда на вход дадим followSuccess/unfollowSuccess, см далее в "const follow" и "const unfollow"
export const _followUnfollowFlow = 			
	async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {
		dispatch(actions.toggleFollowingProgress(true, userId));
		let response = await apiMethod(userId);
		if (response.data.resultCode === 0) {
			dispatch(actionCreator(userId))
		};
		dispatch(actions.toggleFollowingProgress(false, userId));
	}


// Типизируем ": ThunkType"-этим  follow 
export const follow = (userId: number): ThunkType => {
	return (
		async (dispatch) => {
			// let apiMethod = usersAPI.follow.bind(usersAPI);
			// let actionCreator = followSuccess;

			_followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI),actions.followSuccess);
		}
	)
}

export const unfollow = (userId: number): ThunkType => {
	return (
		async (dispatch) => {
			_followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
		}
	)
}
//------------------------------------


import { APIResponseType } from '../components/api/api';
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
	filter: {term: ""}
};
//Выделяем  Type из initialState
export type InitialStateType = typeof initialState; //export для использования в "user-reducer.test.ts"
export type FilterType = typeof initialState.filter; //export для использования в "SaerchForm.tsx"




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

			case 'USERS/SET_FILTER':
			return {
				...state,
				filter: action.payload
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
	setFilter : (term: string) => {return { type: 'USERS/SET_FILTER', payload: {term} } as const},
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




export const requestUsers = (page: number, pageSize: number, term : string): ThunkType => {

	return (
		async (dispatch: DispatchType, getState) => {
			dispatch(actions.toggleIsFetching(true));
			dispatch(actions.setCurrentPage(page));
			dispatch(actions.setFilter(term));


			let data = await usersAPI.requestUsers(page, pageSize, term);
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
	async (dispatch: DispatchType, 
			userId: number, 
			apiMethod: (userId:number) => Promise<APIResponseType>, 
			actionCreator: (userId: number) => ActionsTypes) => {
		dispatch(actions.toggleFollowingProgress(true, userId));  //"actions.toggleFollowingProgress(true, userId)" - наш объект
		let response = await apiMethod(userId);
		if (response.resultCode === 0) {
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

			await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI),actions.followSuccess);	
			//нужен "await", т.к. тут асинхр.ф-ция внутри др-й асинхр-й ф-ции
		}
	)
}

export const unfollow = (userId: number): ThunkType => {
	return (
		async (dispatch) => {
			await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
		}
	)
}
//------------------------------------


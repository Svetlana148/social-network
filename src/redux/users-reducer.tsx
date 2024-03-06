import { usersAPI } from '../components/api/api';
import { UserType } from '../types/types';
import { updateObjectInArray } from '../utils/object-helpers';
import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'setUsers';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';



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




const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {

		case FOLLOW:

			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", { followed: true }),
			}


		case UNFOLLOW:
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



		case SET_USERS:
			return {
				...state,
				// users : [...state.users, ...action.users]
				users: action.users
			};

		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.currentPage
			};

		case SET_TOTAL_USERS_COUNT:
			return { ...state, totalUsersCount: action.totalUsersCount };

		case TOGGLE_IS_FETCHING:
			return { ...state, isFetching: action.isFetching };

		case TOGGLE_IS_FOLLOWING_PROGRESS:
			return {
				...state,
				followingInProgress: action.isFetching ?
					[...state.followingInProgress, action.userId] :
					state.followingInProgress.filter(id => id !== action.userId),
			};
		// return {
		// 	...state,
		// 	followingInProgress : action.userId,
		// }

		default:
			return (state);
	}
};
export default usersReducer;


//-ActionCreator  SET--------------------------------------------------------------
// ActionCreator  Post-----------------------------------------

//Общий тип из всех Action-ов, чтобы исп-ть его в осн.const usersReducer, где есть case-ы  в соот в-и с разными action-нами
type ActionsTypes = FollowSuccessType | UnFollowSuccessType | SetCurrentPageType | SetTotalUsersCountType | ToggleIsFetchingType
	| ToggleFollowingProgressType | SetUsersType


type FollowSuccessType = { //Типизимруем followSuccess
	type: typeof FOLLOW
	userId: number
}
export const followSuccess = (userId: number): FollowSuccessType => ({ type: FOLLOW, userId });



type UnFollowSuccessType = { //Типизимруем UnFollowSuccess
	type: typeof UNFOLLOW
	userId: number
}
export const unfollowSuccess = (userId: number): UnFollowSuccessType => {
	return { type: UNFOLLOW, userId };
};


type SetCurrentPageType = { //Типизимруем setCurrentPage
	type: typeof SET_CURRENT_PAGE
	currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => {
	return { type: SET_CURRENT_PAGE, currentPage: currentPage };
};



type SetTotalUsersCountType = { //Типизимруем setTotalUsersCount
	type: typeof SET_TOTAL_USERS_COUNT
	totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => {
	return { type: SET_TOTAL_USERS_COUNT, totalUsersCount: totalUsersCount };
};


type ToggleIsFetchingType = { //Типизимруем toggleIsFetching
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
	return { type: TOGGLE_IS_FETCHING, isFetching: isFetching };
};


type ToggleFollowingProgressType = { //Типизимруем toggleFollowingProgress
	type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
	isFetching: boolean
	userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType => {
	return { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId };
};


type SetUsersType = { //Типизимруем setUsers
	type: typeof SET_USERS
	users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType =>
	({ type: SET_USERS, users });






//-----------------ThunkCreators-----------------------------------------------------------------------------

//Типизируем ThunkCreator requestUsers------------------

// Подготавливаем типизацию для 		
//"async (dispatch : DispatchType, getState : AppStateType ) => {"
//внутри requestUsers
type GetStateType = () => AppStateType
//{ Dispatch } from 'redux'
type DispatchType = Dispatch<ActionsTypes>  //для const "_followUnfollowFlow"
//Promise<void> - что ф-ция возвращает
//AppStateType - весь State
//unknown - extra параметры
//ActionsTypes - Action-ы, которые можно  dispatch-ить из thunk-и
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>


export const requestUsers = (page: number, pageSize: number): ThunkType => {

	return (
		async (dispatch: DispatchType, getState: GetStateType) => {
			dispatch(toggleIsFetching(true));
			dispatch(setCurrentPage(page));

			let data = await usersAPI.requestUsers(page, pageSize);
			dispatch(toggleIsFetching(false));
			dispatch(setUsers(data.items));
			dispatch(setTotalUsersCount(data.totalCount));
		}
	);
}

//------------------------------------
//Это (_followUnfollowFlow) общая чать для const-ант follow и unfollow
//"=> FollowSuccessType | UnFollowSuccessType" - что по итогу получим, когда на вход дадим followSuccess/unfollowSuccess, см далее в "const follow" и "const unfollow"
export const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => FollowSuccessType | UnFollowSuccessType) => {
	dispatch(toggleFollowingProgress(true, userId));
	let response = await apiMethod(userId);
	if (response.data.resultCode === 0) {
		dispatch(actionCreator(userId))
	};
	dispatch(toggleFollowingProgress(false, userId));
}


// Типизируем ": ThunkType"-этим  follow 
export const follow = (userId: number): ThunkType => {
	return (
		async (dispatch) => {
			// let apiMethod = usersAPI.follow.bind(usersAPI);
			// let actionCreator = followSuccess;

			_followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
		}
	)
}

export const unfollow = (userId: number): ThunkType => {
	return (
		async (dispatch) => {
			_followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
		}
	)
}
//------------------------------------


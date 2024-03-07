import { usersAPI } from '../components/api/api';
import { UserType } from '../types/types';
import { updateObjectInArray } from '../utils/object-helpers';
import { AppStateType, InferActionsTypes } from './redux-store';
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'


// const FOLLOW = 'FOLLOW';
// const UNFOLLOW = 'UNFOLLOW';
// const SET_USERS = 'setUsers';
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
// const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
// const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
// const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';



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

		case 'FOLLOW':
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", { followed: true }),
			}


		case 'UNFOLLOW':
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



		case 'SET_USERS':
			return {
				...state,
				// users : [...state.users, ...action.users]
				users: action.users
			};

		case 'SET_CURRENT_PAGE':
			return {
				...state,
				currentPage: action.currentPage
			};

		case 'SET_TOTAL_USERS_COUNT':
			return { ...state, totalUsersCount: action.totalUsersCount };

			case 'TOGGLE_IS_FETCHING':
			return { ...state, isFetching: action.isFetching };

		case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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
	followSuccess : (userId: number) => ({ type: 'FOLLOW', userId } as const),
	unfollowSuccess : (userId: number) => {return { type: 'UNFOLLOW', userId } as const},
	setCurrentPage : (currentPage: number) => {return { type: 'SET_CURRENT_PAGE', currentPage: currentPage } as const},
	setTotalUsersCount : (totalUsersCount: number) => {return { type: 'SET_TOTAL_USERS_COUNT', totalUsersCount: totalUsersCount } as const},
	toggleIsFetching : (isFetching: boolean) => {return { type: 'TOGGLE_IS_FETCHING', isFetching: isFetching } as const},
	toggleFollowingProgress : (isFetching: boolean, userId: number)=> {return { type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const},
	setUsers : (users: Array<UserType>) =>({ type: 'SET_USERS', users } as const),
}




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
//Это (_followUnfollowFlow) общая чать для const-ант follow и unfollow
//"=> FollowSuccessType | UnFollowSuccessType" - что по итогу получим, когда на вход дадим followSuccess/unfollowSuccess, см далее в "const follow" и "const unfollow"
export const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {
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


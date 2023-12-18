import { usersAPI } from '../components/api/api';
import { updateObjectInArray } from '../utils/object-helpers';



const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'setUsers';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
	users: [],
	pageSize: 5,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	// followingInProgress : false,
	followingInProgress: [],
};





const usersReducer = (state = initialState, action) => {
	switch (action.type) {

		case FOLLOW:

			let result = {
				...state,

				users: updateObjectInArray(state.users, action.userId, "id", { followed: true }),
				// users : state.users.map( u=>
				// 	{
				// 		if (u.id===action.userId) {
				// 			return{...u, followed : true}
				// 		};
				// 		return(u);
				// 	})			
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



// ActionCreator  Post-----------------------------------------

export const followSuccess = (userId) => ({ type: FOLLOW, userId });


export const unfollowSuccess = (userId) => {
	return { type: UNFOLLOW, userId };
};

export const setCurrentPage = (currentPage) => {
	return { type: SET_CURRENT_PAGE, currentPage: currentPage };
};


export const setTotalUsersCount = (totalUsersCount) => {
	return { type: SET_TOTAL_USERS_COUNT, totalUsersCount: totalUsersCount };
};

export const toggleIsFetching = (isFetching) => {
	return { type: TOGGLE_IS_FETCHING, isFetching: isFetching };
};

export const toggleFollowingProgress = (isFetching, userId) => {
	return { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId };
};
//-ActionCreator  SET--------------------------------------------------------------

export const setUsers = (users) => ({ type: SET_USERS, users });






//-----------------ThunkCreators-----------------------------------------------------------------------------

export const requestUsers = (page, pageSize) => {
	return (
		async (dispatch) => {
			dispatch(toggleIsFetching(true));
			dispatch(setCurrentPage(page));

			let data = await usersAPI.requestUsers(page, pageSize);
			dispatch(toggleIsFetching(false));
			dispatch(setUsers(data.items));
			dispatch(setTotalUsersCount(data.totalCount));
		}
	);
}



export const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
	debugger
	dispatch(toggleFollowingProgress(true, userId));
	let response = await apiMethod(userId);
	if (response.data.resultCode == 0) {
		dispatch(actionCreator(userId))
	};
	dispatch(toggleFollowingProgress(false, userId));
}


export const follow = (userId) => {
	return (
		async (dispatch) => {
			// let apiMethod = usersAPI.follow.bind(usersAPI);
			// let actionCreator = followSuccess;

			followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
		}
	)
}


export const unfollow = (userId) => {
	return (
		async (dispatch) => {
			followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
		}
	)
}


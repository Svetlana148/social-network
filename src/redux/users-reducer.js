import {usersAPI} from '../components/api/api';


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'setUsers';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
	users: [],
	pageSize : 5,
	totalUsersCount :0,
	currentPage : 1,
	isFetching : false,
	// followingInProgress : false,
	followingInProgress : [],
};





const usersReducer = (state = initialState, action)=>{
	switch(action.type){

		case FOLLOW:
		
			let result = {
			...state,
			//users : [...state.users], its the same as bellow
			users : state.users.map( u=>
				{
					if (u.id===action.userId) {
						return{...u, followed : true}
					};
					return(u);
				})			
			}

			return result;


		case UNFOLLOW:
		return {
		...state,
		users : state.users.map( u=>
			{if (u.id===action.userId) {
				return{...u, followed : false}
				};
				return(u);
			})			
		};



		case SET_USERS:
			return {
				...state,
				// users : [...state.users, ...action.users]
				users : action.users
			};

		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage : action.currentPage
			};
		
		case SET_TOTAL_USERS_COUNT:
			return {...state,	totalUsersCount : action.totalUsersCount};

		case TOGGLE_IS_FETCHING:
			return {...state,	isFetching : action.isFetching};

		case TOGGLE_IS_FOLLOWING_PROGRESS:
			return {...state,	
				followingInProgress : action.isFetching ?
				[...state.followingInProgress, action.userId] : 
				state.followingInProgress.filter(id=>id !== action.userId),
			};
			// return {
			// 	...state,
			// 	followingInProgress : action.userId,
			// }

		default:
			return(state);
	}
}; 


export default usersReducer;

// ActionCreator  Post-----------------------------------------

export const followSuccess = (userId)=>({type : FOLLOW, userId});


export const unfollowSuccess = (userId)=>{
	return {type : UNFOLLOW, userId};
};

export const setCurrentPage = (currentPage)=>{
	return {type : SET_CURRENT_PAGE, currentPage:currentPage};
};


export const setTotalUsersCount = (totalUsersCount)=>{
	return {type : SET_TOTAL_USERS_COUNT, totalUsersCount:totalUsersCount};
};

export const toggleIsFetching = (isFetching)=>{
	return {type : TOGGLE_IS_FETCHING, isFetching:isFetching};
};

export const toggleFollowingProgress = (isFetching, userId)=>{
	return {type : TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId};
};





//ThunkCreators-----------------------------------------------------------------------------

export const getUsers = (currentPage, pageSize)=>{
	return(
		(dispatch)=>{
			dispatch(toggleIsFetching(true));

			usersAPI.getUsers(currentPage, pageSize)
				.then (data =>{
				dispatch(toggleIsFetching(false));
				dispatch(setUsers(data.items));
				dispatch(setTotalUsersCount(data.totalCount));
				});
		}
	)
}



export const follow = (userId)=>{
	return(
		(dispatch)=>{
		
			dispatch(toggleFollowingProgress (true, userId));
			usersAPI.follow (userId)

									.then (responce =>{
							
											if (responce.data.resultCode === 0) {
												dispatch(followSuccess(userId))
											}
											dispatch(toggleFollowingProgress (false, userId))
										});
		}
	)
}


export const unfollow = (userId)=>{
	return(
		(dispatch)=>{
			dispatch(toggleFollowingProgress (true, userId));
			usersAPI.unfollow (userId)

									.then (responce =>{
											if (responce.data.resultCode === 0){
												dispatch(unfollowSuccess(userId))
											}
											dispatch(toggleFollowingProgress (false, userId))
										});
		}
	)
}

export const setUsers = (users)=>({type : SET_USERS, users});
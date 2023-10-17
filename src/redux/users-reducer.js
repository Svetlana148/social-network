const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'setUsers';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';


let initialState = {
	users: [],
	pageSize : 5,
	totalUsersCount :0,
	currentPage : 1,
	isFetching : false,
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


		default:
			return(state);
	}
}; 


export default usersReducer;

// ActionCreator  Post-----------------------------------------

export const followAC = (userId)=>({type : FOLLOW, userId});


export const unfollowAC = (userId)=>{
	return {type : UNFOLLOW, userId};
};

export const setCurrentPageAC = (currentPage)=>{
	return {type : SET_CURRENT_PAGE, currentPage:currentPage};
};


export const setTotalUsersCountAC = (totalUsersCount)=>{
	return {type : SET_TOTAL_USERS_COUNT, totalUsersCount:totalUsersCount};
};

export const toggleIsFetchingAC = (isFetching)=>{
	return {type : TOGGLE_IS_FETCHING, isFetching:isFetching};
};

export const setUsersAC = (users)=>({type : SET_USERS, users});
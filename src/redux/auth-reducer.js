const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
// const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';


let initialState = {
	userId: null,
	email : null,
	login :null,
	isFetching : false,    //Loading is going
};





const authReducer = (state = initialState, action)=>{
	switch(action.type){
		
			case SET_USER_DATA:
				return {
					...state,
					...action.data
				};

			



		case TOGGLE_IS_FETCHING:
			return {...state,	isFetching : action.isFetching};


		default:
			return(state);
	}
}; 


export default authReducer;

// ActionCreator  Post-----------------------------------------


export const setAuthUsersData = (userId, email, login,)=>({type : SET_USER_DATA, data : {userId, email, login}});



export const toggleIsFetching = (isFetching)=>{
	return {type : TOGGLE_IS_FETCHING, isFetching:isFetching};
};

import {authAPI} from '../components/api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';


let initialState = {
	userId: null,
	email : null,
	login :null,
	isFetching : false,    //Loading is going
	isAuth : false,
};



const authReducer = (state = initialState, action)=>{
	switch(action.type){
		
		case SET_USER_DATA:

				return {
					...state,
					...action.payload,
				};


		case TOGGLE_IS_FETCHING:
			return {...state,	isFetching : action.isFetching};


		default:
			return(state);
	}
}; 
export default authReducer;





// ActionCreator  Post-----------------------------------------

export const setAuthUserData = (userId, email, login, isAuth)=>
										({type : SET_USER_DATA, payload : {userId, email, login, isAuth}});


export const toggleIsFetching = (isFetching)=>{
	return {type : TOGGLE_IS_FETCHING, isFetching:isFetching};
};







// ------------THUNK Creators-----------------------------------------------------------------

export const getAuthUserData = ()=>(dispatch)=>{
	authAPI.me()
		.then (responce =>{
		// this.props.toggleIsFetching(false)
			if (responce.data.resultCode === 0){
				let {id, email, login} = responce.data.data;
				dispatch(setAuthUserData(id, email, login, true));
			}
	});
};


export const login = (email, password,rememberMe)=>(dispatch)=>{
	authAPI.login(email, password,rememberMe)
		.then (responce =>{
		// this.props.toggleIsFetching(false)
			if (responce.data.resultCode === 0){
				dispatch(getAuthUserData());
			}
	});
};


export const logout = ()=>(dispatch)=>{
	authAPI.logout()
		.then (responce =>{
		// this.props.toggleIsFetching(false)
			if (responce.data.resultCode === 0){
				dispatch(setAuthUserData(null, null, null, false));
			}
	});
}


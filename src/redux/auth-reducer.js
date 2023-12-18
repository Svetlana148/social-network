import { stopSubmit } from 'redux-form';
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

export const getAuthUserData = ()=>	async(dispatch)=>{
	let response = await authAPI.me();
	
	// this.props.toggleIsFetching(false)
	if (response.data.resultCode === 0){
		let {id, email, login} = response.data.data;
		dispatch(setAuthUserData(id, email, login, true));
	};
};


export const login = (email, password,rememberMe)=>async (dispatch)=>{
	let response = await authAPI.login(email, password,rememberMe);
	
	// this.props.toggleIsFetching(false)
	if (response.data.resultCode === 0){
				dispatch(getAuthUserData());
	}

	//Останавливаем Submit  усли есть ошибка---------------------------------------------
	else{
		//messages[0] Возьмем нулевое сообщение---------------------------------------------
		let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
		dispatch(stopSubmit("login", {_error : message}));
	}
};


export const logout = ()=>async (dispatch)=>{
	let response = await authAPI.logout();
	// this.props.toggleIsFetching(false)
	if (response.data.resultCode === 0){
		dispatch(setAuthUserData(null, null, null, false));
	}
}


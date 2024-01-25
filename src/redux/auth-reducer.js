//Это BLL (Business Logic Layer) - уровень. 
//Здесь Thunk-и принимают и обрабатывают ответы от сервера
// и dispatch-ат actionS в зависимости от асинхронного ответа-----------------------------------------

// auth-reducer.js описывает изменения State-а для Login-формы


import { stopSubmit } from 'redux-form';
import {authAPI, securityAPI} from '../components/api/api';

// const-ты надо называть так: 
// имя проекта/ имя reducer-а/ имя const-ты  
// Ex: samuri-network/auth/SET_USER_DATA
const SET_USER_DATA = 'auth/SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';


// Начальный State
let initialState = {
	userId: null,
	email : null,
	login :null,
	isFetching : false,    //Loading is going
	isAuth : false,
	// Если captcha :null, то ее нее показываем
	captchaUrl : null,

};



const authReducer = (state = initialState, action)=>{
	switch(action.type){
		
		case SET_USER_DATA:
		case	GET_CAPTCHA_URL_SUCCESS:

				return {
					// Достать из State-а все значения (см. initialState)
					...state,
					// Добавить в конец скопированного State-а то значение, которое мы ввтащим из action.payload (там лежит captcha)
					...action.payload
				};


		case TOGGLE_IS_FETCHING:
			return {...state,	isFetching : action.isFetching};


		default:
			return(state);
	}
}; 
export default authReducer;





// ActionCreator  Post-----------------------------------------
// Устанавливаем данные User-а при заполнении  Login-формы

export const setAuthUserData = (userId, email, login, isAuth)=>
										({type : SET_USER_DATA, payload : {userId, email, login, isAuth}});


//Крутилка при ожидании									
export const toggleIsFetching = (isFetching)=>{
	return {type : TOGGLE_IS_FETCHING, isFetching:isFetching};
};


//captcha
export const getCaptchaUrlSuccess = (captchaUrl)=>{
	return {type : GET_CAPTCHA_URL_SUCCESS, payload : {captchaUrl}};
};




// ------------THUNK Creators-----------------------------------------------------------------
// Запрос на мой профайл 
export const getAuthUserData = ()=>	async(dispatch)=>{
	let response = await authAPI.me();
	
	// this.props.toggleIsFetching(false)
	if (response.data.resultCode === 0){
		let {id, email, login} = response.data.data;
		dispatch(setAuthUserData(id, email, login, true));
	};
};

// Запрос на заЛогиниться
export const login = (email, password,rememberMe, captcha)=>async (dispatch)=>{
	let response = await authAPI.login(email, password,rememberMe,captcha);
	
	// this.props.toggleIsFetching(false)
	if (response.data.resultCode === 0){
		// Если мы авторизовались успешно, то получаем доп. данные
				dispatch(getAuthUserData());
	}
	
	//Останавливаем Submit  усли есть ошибка---------------------------------------------
	else{
		if (response.data.resultCode === 10){
			dispatch(getCaptchaUrl());
		}
		//messages[0] Возьмем нулевое сообщение---------------------------------------------
		let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
		dispatch(stopSubmit("login", {_error : message}));
	}
};


// Запрос на разЛогиниться
export const logout = ()=>async (dispatch)=>{
	let response = await authAPI.logout();
	// this.props.toggleIsFetching(false)
	if (response.data.resultCode === 0){
		dispatch(setAuthUserData(null, null, null, false));
	}
}


// Запрос на Captcha-у у сервера и далее 
// засылаем ответ сервера в state (dispatch-им Action Creator с полученным ответом)-------------------------------------------
// это ThunkCreator export const getCaptchaUrl = ()=>
export const getCaptchaUrl = ()=> 

// ниже идет сама Thunk-а
	async (dispatch)=>{
		const response = await securityAPI.getCaptchaUrl();
		const captchaUrl = response.data.url;

		dispatch(getCaptchaUrlSuccess(captchaUrl));
};
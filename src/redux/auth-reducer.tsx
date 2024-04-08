//Это BLL (Business Logic Layer) - уровень. 
//Здесь Thunk-и принимают и обрабатывают ответы от сервера
// и dispatch-ат actionS в зависимости от асинхронного ответа-----------------------------------------

// auth-reducer.tsx описывает изменения State-а для Login-формы


import { FormAction, stopSubmit } from 'redux-form';
import { ResultCodesEnum, ResultCodesCaptchaEnum } from '../components/api/api';
import { authAPI } from '../components/api/auth-api';
import { securityAPI } from '../components/api/security-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { Action } from 'redux';


// const-ты надо называть так: 
// имя проекта/ имя reducer-а/ имя const-ты  
// Ex: samuri-network/auth/SET_USER_DATA
// const SET_USER_DATA = 'auth/SET_USER_DATA';
// const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';




// Начальный State
let initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isFetching: false as boolean,    //Loading is going
	isAuth: false,
	captchaUrl: null as string | null, 	// Если captcha :null, то ее нее показываем
};
// Получаем тип из initialState
export type InitialStateType = typeof initialState;
//-------------------------------------------------------------------------------------

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {

		case 'auth/SET_USER_DATA':   //Это теперь наши бывшие const-ты
		case 'auth/GET_CAPTCHA_URL_SUCCESS':

			return {
				// Достать из State-а все значения (см. initialState)
				...state,
				// Добавить в конец скопированного State-а то значение, которое мы ввтащим из action.payload (там лежит captcha)
				...action.payload
			};

		//Крутилка при ожидании	
		// case TOGGLE_IS_FETCHING:
		// 	return { ...state, isFetching: action.isFetching };


		default:
			return (state);
	}
};
export default authReducer;





// ActionCreator-ы  -----------------------------------------
// Устанавливаем данные User-а при заполнении  Login-формы


// Типизируем все AC-ры  ------------------------------------------------------------
//1. Упакуем все AC-ры в 1 Объект "actions" 
export const actions = {
	setAuthUserData : (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
	({ type: 'auth/SET_USER_DATA', payload: { userId, email, login, isAuth } } as const),   //Даем  названия const-ам в соотв-и с  Redux-Ducks "app/..."

	//captcha
	getCaptchaUrlSuccess : (captchaUrl: string) => {
		return { type: 'auth/GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl } as const};
	},
}
//2.  Типизируем все "actions"
type ActionsType = InferActionsTypes<typeof actions>	
// 3. Типизируем Thunk-и
//Локальный "ThunkType" типизирован общим типом "BaseThunkType" с нашими "<ActionsType>"-ми
type ThunkType = BaseThunkType<ActionsType | FormAction>  //"FormAction" из 'redux-form'-мы, чтобы добавить в dispatch "Sabmit"

//------------------------------------------------------------

//Крутилка при ожидании									
// export const toggleIsFetching = (isFetching) => {
// 	return { type: TOGGLE_IS_FETCHING, isFetching: isFetching };
// };



// ------------THUNK Creators-----------------------------------------------------------------
// Запрос на личный профайл "me"
export const getAuthUserData = () : ThunkType => async (dispatch) => {
	let meDataResponse = await authAPI.me();

	// this.props.toggleIsFetching(false)
	if (meDataResponse.resultCode === ResultCodesEnum.Success) {
		let { id, email, login } = meDataResponse.data;
		dispatch(actions.setAuthUserData(id, email, login, true));
	};
};

// Запрос на заЛогиниться
export const login = (email: string, password: string, rememberMe: boolean, captcha: string)  : ThunkType => //"ThunkType" им типизируем наш ThunkCreator
	async (dispatch) => {
	let loginData = await authAPI.login(email, password, rememberMe, captcha);

	// this.props.toggleIsFetching(false)
	if (loginData.resultCode === ResultCodesEnum.Success) {
		// Если мы авторизовались успешно, то получаем доп. данные
		dispatch(getAuthUserData());
	}

	//Останавливаем Submit если есть ошибка---------------------------------------------
	else {
		if (loginData.resultCode === ResultCodesCaptchaEnum.CaptchaIsRequired) {
			dispatch(getCaptchaUrl());
		}
		//messages[0] Возьмем нулевое сообщение---------------------------------------------
		let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
		dispatch(stopSubmit("login", { _error: message }));
	}
};


// Запрос на разЛогиниться
export const logout = () : ThunkType => async (dispatch: any) => {
	let response = await authAPI.logout();
	// this.props.toggleIsFetching(false)
	if (response.data.resultCode === ResultCodesEnum.Success) {
		dispatch(actions.setAuthUserData(null, null, null, false));
	}
}


// Запрос на Captcha-у у сервера (запрос лежит в "security-api.ts")
//и далее засылаем ответ сервера в state (dispatch-им Action Creator с полученным ответом)-------------------------------------------



// это ThunkCreator "export const getCaptchaUrl = ()=>"
export const getCaptchaUrl = () : ThunkType =>

	// ниже идет сама Thunk-а
	async (dispatch: any) => {
		const response = await securityAPI.getCaptchaUrl();
		const captchaUrl = response.data.url;

		dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
	};
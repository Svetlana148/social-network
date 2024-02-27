//Это BLL (Business Logic Layer) - уровень. 
//Здесь Thunk-и принимают и обрабатывают ответы от сервера
// и dispatch-ат actionS в зависимости от асинхронного ответа-----------------------------------------

// auth-reducer.tsx описывает изменения State-а для Login-формы


import { stopSubmit } from 'redux-form';
import { ResultCodesEnum, ResultCodesCaptchaEnum, authAPI, securityAPI } from '../components/api/api';

// const-ты надо называть так: 
// имя проекта/ имя reducer-а/ имя const-ты  
// Ex: samuri-network/auth/SET_USER_DATA
const SET_USER_DATA = 'auth/SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';



// Тип для initialState
export type InitialStateType2 = {
	userId: number | null,
	email: string | null,
	login: string | null,
	isFetching: boolean,    //Loading is going
	isAuth: boolean,
	// Если captcha :null, то ее нее показываем
	captchaUrl: string | null,
};



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


const authReducer = (state = initialState, action: any): InitialStateType => {
	switch (action.type) {

		case SET_USER_DATA:
		case GET_CAPTCHA_URL_SUCCESS:

			return {
				// Достать из State-а все значения (см. initialState)
				...state,
				// Добавить в конец скопированного State-а то значение, которое мы ввтащим из action.payload (там лежит captcha)
				...action.payload
			};


		case TOGGLE_IS_FETCHING:
			return { ...state, isFetching: action.isFetching };


		default:
			return (state);
	}
};
export default authReducer;





// ActionCreator-ы  -----------------------------------------
// Устанавливаем данные User-а при заполнении  Login-формы



// Типизируем AC - setAuthUserData------------------------------------------------------------
// Типизируем Объект payload
type setAuthUserDataActionPayloadType = {
	userId: number | null
	email: string | null
	login: string | null
	isAuth: boolean
};

type setAuthUserDataActionType = {
	type: typeof SET_USER_DATA
	payload: setAuthUserDataActionPayloadType

};

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType =>
	({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } });
//------------------------------------------------------------

//Крутилка при ожидании									
// export const toggleIsFetching = (isFetching) => {
// 	return { type: TOGGLE_IS_FETCHING, isFetching: isFetching };
// };


//captcha------------------------------------------------------------
// Типизируем captchaAC 
type getCaptchaUrlSuccessActionType = {
	type: typeof GET_CAPTCHA_URL_SUCCESS
	payload: { captchaUrl: string }
};
//captcha
export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => {
	return { type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } };
};
//-------------------------------------------------------------------------------------




// ------------THUNK Creators-----------------------------------------------------------------
// Запрос на мой профайл "me"
export const getAuthUserData = () => async (dispatch: any) => {
	let meDataResponce = await authAPI.me();

	// this.props.toggleIsFetching(false)
	if (meDataResponce.resultCode === ResultCodesEnum.Success) {
		let { id, email, login } = meDataResponce.data;
		dispatch(setAuthUserData(id, email, login, true));
	};
};

// Запрос на заЛогиниться
export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
	let loginData = await authAPI.login(email, password, rememberMe, captcha);

	// this.props.toggleIsFetching(false)
	if (loginData.resultCode === ResultCodesEnum.Success) {
		// Если мы авторизовались успешно, то получаем доп. данные
		dispatch(getAuthUserData());
	}

	//Останавливаем Submit  усли есть ошибка---------------------------------------------
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
export const logout = () => async (dispatch: any) => {
	let response = await authAPI.logout();
	// this.props.toggleIsFetching(false)
	if (response.data.resultCode === ResultCodesEnum.Success) {
		dispatch(setAuthUserData(null, null, null, false));
	}
}


// Запрос на Captcha-у у сервера и далее 
// засылаем ответ сервера в state (dispatch-им Action Creator с полученным ответом)-------------------------------------------

// это ThunkCreator export const getCaptchaUrl = ()=>
export const getCaptchaUrl = () =>

	// ниже идет сама Thunk-а
	async (dispatch: any) => {
		const response = await securityAPI.getCaptchaUrl();
		const captchaUrl = response.data.url;

		dispatch(getCaptchaUrlSuccess(captchaUrl));
	};
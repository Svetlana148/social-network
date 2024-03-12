import { instance, APIResponseType, ResultCodesCaptchaEnum, ResultCodesEnum } from './api';


// Группа запросов на сервер для login/logout/me-текущий пользователь-------------------------

// Типы для "authAPI"...................



// Общий Тип-Generic"APIResponseType" для всех "Response"-ов в api.ts...................
//Конкретизируем общий тип "APIResponseType" для "MeResponse"
type MeResponseDataType = {  // Тип для "me()" в "authAPI"
	id: number   // Тип для объекта data: {id : number, email: string, login : string}
	email: string
	login: string
}

//Конкретизируем общий тип "APIResponseType"  для "LoginResponse"
type LoginResponseDataType = {   // Тип для "login()" в "authAPI"
	userId: number   // Тип для объекта data: {id : number, email: string, login : string}
}
// ................................


export const authAPI = {
	// from HeaderContainer------
	//Типизируем Promis "me"

	me() {
		return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data); //c then-ом твозврашаем конкретные нужные данные,безthen-все и технич-е тоже
	},
	login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
		return instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodesCaptchaEnum>>(`auth/login`, { email, password, rememberMe, captcha })
			.then(res => res.data);
	},
	// logout(email : string, password : string, rememberMe : boolean = false) {
	logout() {
		return instance.delete(`auth/login`);
	}
}

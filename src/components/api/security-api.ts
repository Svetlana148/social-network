import {instance} from './api';

// Группа запросов на сервер для Security(CAPTHA)--------------------------

//Типизируем запрос "get" для "securityAPI"
type GetCaptchUrlResponseType ={
	url : string
}

export const securityAPI = {
	// Сами придумал название ф-ции и в ней шлем запрос на сервер на Captch-у
	getCaptchaUrl() {
		return instance.get<GetCaptchUrlResponseType>(`security/get-captcha-url`);
	},
}
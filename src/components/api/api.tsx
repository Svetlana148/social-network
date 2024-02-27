//Это DAl (Data Access Layer) - уровень. 
//Здесь все ЗАПРОСЫ НА СЕРВЕР-----------------------------------------
//current user support--------------------------------------- 
import axios from 'axios';
import {ProfileType} from '../../types/types';



//  Шаблон запроса на сервер (далее везде он используется при др. запросах)--------------------------
const instance = axios.create({
	// чтобы прилипла Coocke
	withCredentials: true,
	headers: { "API-KEY": "495ccbaa-f1de-49f2-aee6-bb202e0b4fca" },
	baseURL: `https://social-network.samuraijs.com/api/1.0/`,
});


// Группа запросов на сервер для USER--------------------------
export const usersAPI = {
	requestUsers(currentPage = 1, pageSize = 10) {
		return (
			instance.get(`users?page=${currentPage}&count=${pageSize}`)
				.then(responce => {
					return responce.data
				})
		)
	},

	follow(userId : number) {
		return instance.post(`follow/${userId}`)
	},

	unfollow(userId : number) {
		return instance.delete(`follow/${userId}`)
	},

	// from profileContainer
	getProfile(userId : number) {
		console.warn("Obsolete method. Now getProfileAPI")
		return getProfileAPI.getProfile(userId)
		//instance.get(`profile/`+ userId)
	},

	
}


// Группа запросов на сервер для Profile--------------------------
export const getProfileAPI = {
	getProfile(userId : number) {
		return instance.get(`profile/` + userId)
	},
	getStatus(userId : number) {
		return instance.get(`profile/status/` + userId)
	},
	updateStatus(status : string) {
		return instance.put(`profile/status`, { status: status })
	},


	savePhoto(photoFile : any) {
		const formData = new FormData();
		formData.append("image", photoFile)
		return instance.put(`profile/photo`, 
									// Вторым параметром меняем тип отсылаемого файла
									formData,
									// 3-м настраиваем заголовки этого запроса
									{headers : {
										'Content-Type' : 'multipart/form-data'
									}});
	},

	saveProfile(profile : ProfileType) {
		return instance.put(`profile`, profile);
	},
}






// Группа запросов на сервер для login/logout/me-текущий пользователь-------------------------


// Типы для "authAPI"...................
export enum ResultCodesEnum {  //Тип "enum" для перечисления серверных кодов 
	Success=0,
	Error = 1,
}
export enum ResultCodesCaptchaEnum { 
	CaptchaIsRequired = 10
}


type MeResponceType ={  // Тип для "me()" в "authAPI"
	data : {id : number   // Тип для объекта data: {id : number, email: string, login : string}
			email: string
			login : string} 
	resultCode: ResultCodesEnum//Тип "enum" для перечисления серверных кодов(здесь применяем)
	messages: Array<string>
}
type LoginResponceType ={   // Тип для "login()" в "authAPI"
	data : {userId : number   // Тип для объекта data: {id : number, email: string, login : string}
	} 
	resultCode: ResultCodesEnum  | ResultCodesCaptchaEnum 
	messages: Array<string> 
}
// ................................
export const authAPI = {
	// from HeaderContainer------
	 //Типизируем Promis "me"
	
	me() {
		return instance.get<MeResponceType>(`auth/me`).then (res => res.data); //c then-ом твозврашаем конкретные нужные данные,безthen-все и технич-е тоже
	},
	login(email : string, password: string, rememberMe : boolean = false, captcha : null | string =null) {
		return instance.post<LoginResponceType>(`auth/login`, { email, password, rememberMe, captcha  })
		.then (res => res.data);
	},
	logout(email : string, password : string, rememberMe : boolean = false) {
		return instance.delete(`auth/login`);
	}

}




// Группа запросов на сервер для Security(CAPTHA)--------------------------

export const securityAPI = {
	// Сами придумал название ф-ции и в ней шлем запрос на сервер на Captch-у
	getCaptchaUrl() {
		return instance.get(`security/get-captcha-url`);
	},
}
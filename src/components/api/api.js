//Здесь все запросы на сервер-----------------------------------
//current user support--------------------------------------- 
import axios from 'axios';



//  Шаблон запроса на сервер (далее везде он используется при др. запросах)--------------------------
const instance = axios.create({
	withCredentials: true,
	header: { "API-KEY": "495ccbaa-f1de-49f2-aee6-bb202e0b4fca" },
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

	follow(userId) {
		return instance.post(`follow/${userId}`)
	},

	unfollow(userId) {
		return instance.delete(`follow/${userId}`)
	},

	// from profileContainer
	getProfile(userId) {
		console.warn("Obsolete method. Now getProfileAPI")
		return getProfileAPI.getProfile(userId)
		//instance.get(`profile/`+ userId)
	},

	
}



// Группа запросов на сервер для Profile--------------------------
export const getProfileAPI = {
	getProfile(userId) {
		return instance.get(`profile/` + userId)
	},
	getStatus(userId) {
		return instance.get(`profile/status/` + userId)
	},
	updateStatus(status) {
		return instance.put(`profile/status`, { status: status })
	},


	savePhoto(photoFile) {
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

	saveProfile(profile) {
		return instance.put(`profile`, profile);
	},
}






// Группа запросов на сервер для login/logout/me-текущий пользователь-------------------------
export const authAPI = {
	// from HeaderContainer
	me() {
		return instance.get(`auth/me`);
	},
	login(email, password, rememberMe = false) {
		return instance.post(`auth/login`, { email, password, rememberMe });
	},
	logout(email, password, rememberMe = false) {
		return instance.delete(`auth/login`, { email, password, rememberMe });
	}

}
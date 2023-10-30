import axios from 'axios';


const instance = axios.create({
	withCredentials : true,
	header : {"API-KEY" : "495ccbaa-f1de-49f2-aee6-bb202e0b4fca"},
	baseURL : `https://social-network.samuraijs.com/api/1.0/`,
});




export const usersAPI = {
	getUsers (currentPage = 1, pageSize = 10) {
		return(
			instance.get(`users?page=${currentPage}&count=${pageSize}`)
			.then (responce => {
				return responce.data
			})
		)
	},

	follow(userId) {
		return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
	},

	unfollow(userId){
		return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
	},

}


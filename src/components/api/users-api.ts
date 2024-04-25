// Ответ от сервера для странички "Users"-ы
import { GetItemsType, APIResponseType, instance } from './api';



// Группа запросов на сервер для USER--------------------------
export const usersAPI = {

	//Получить массив User-ов.......................
	requestUsers(currentPage = 1, pageSize = 10, term: string = "") {
		return (
			//Типизируем все запросы get, post, delete общим типом "GetItemsType"(смотрим какой О возвращает server и типизируем его)
			instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term }`)
				.then(Response => {
					return Response.data
				})
		)
	},

	//Получить состояние follow.......................
	follow(userId: number) {
		return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
	},

	//Получить состояние unfollow.......................
	unfollow(userId: number) {
		return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
	},
}
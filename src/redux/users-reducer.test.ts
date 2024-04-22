// Тестируем "follow/ unfollow"-и


//Любой тест состоит из 3 частей:
//1. исходные данные
//2. Какое-то действие
//3. ожидание от действия

import usersReducer, { InitialStateType, actions } from "./users-reducer";



//1. исходные данные---------------------------------------------------------
let state: InitialStateType;


beforeEach(()=>{  //Перед каждым прогоном заново бери начальный (не измененный "state")
	state ={
		users: [
			{id: 0, name: 'Ola', followed: false,
			photos: {small: null, large: null}, status: 'status 0'},
			{id: 1, name: 'Ola', followed: false,
			photos: {small: null, large: null}, status: 'status 1'},
			{id:2, name: 'Ola', followed: true,
			photos: {small: null, large: null}, status: 'status 2'},
			{id: 3, name: 'Ola', followed: true,
			photos: {small: null, large: null}, status: 'status 3'}
		],
		pageSize: 10,
		totalUsersCount: 0,
		currentPage: 1,
		isFetching: false,
		followingInProgress: []  //массив userId
		};
})
//-----------------------------------------------------------------------------------------------------------

//1test-----------------------------------------------------------------------------------------------------------
test("follow success", () => {

	//2. Какое-то действие---------------------------------------------------------
	//"usersReducer"-у нужны: state и action (подписываемся на user-а)
	
	const newState = usersReducer(state, actions.followSuccess(1))


	//3. ожидание от действия---------------------------------------------------------
	expect(newState.users[0].followed).toBeFalsy();  //ф-ция "expect" возвращает {объект}, кот. имеет метод "toBeFalsy"-остался false
	expect(newState.users[1].followed).toBeTruthy();  //ф-ция "expect" возвращает {объект}, кот. имеет метод "toBeFalsy"-остался false

})


//2test-----------------------------------------------------------------------------------------------------------
test("unfollow success", () => {

	const newState = usersReducer(state, actions.unfollowSuccess(3))


	expect(newState.users[2].followed).toBeTruthy ();
	expect(newState.users[3].followed).toBeFalsy();  

})
//-----------------------------------------------------------------------------------------------------------

// Тестируем "thunk"-и
//Делаем "mock" для "userAPI"
import { APIResponseType, ResultCodesEnum } from "../components/api/api";
import { usersAPI } from "../components/api/users-api";
import { actions, follow, unfollow } from "./users-reducer";


//---------------------------------------------------------------------------------------------------------
jest.mock("../components/api/users-api")	//Создаем фэйковый ответ от сервера"usersAPIMock"
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const dispatchMock = jest.fn();	//Создаем ф-цию заглушку для "dispatch"-а    "jest.fn" - стандартная ф-ция
const getStateMock = jest.fn();	//Создаем ф-цию заглушку для "getState"-а   

beforeEach(() => {	//Перед каждым прогоном теста делаем новые Mock, чтобы счетчики вызовов занулялись
	usersAPIMock.follow.mockClear();
	usersAPIMock.unfollow.mockClear();
	dispatchMock.mockClear();
	getStateMock.mockClear();
})
//---------------------------------------------------------------------------------------------------------



const result: APIResponseType = {	//Ответ от сервера
	resultCode: ResultCodesEnum.Success,
	messages: [],
	data: {}
}

//1 test---------------------------------------------------------------------------------------------------------------------------------------
//1.Вызвываем "thunk"-у и 2.Передаем в нее "dispatch"

test("Success followed thunk", async () => {

	const thunk = follow(1);
	
	usersAPIMock.follow.mockReturnValue(Promise.resolve(result));


	// "ignore"- чтобы test не прогонялся  
	//дождемся ответа от "thunk"-и



	await thunk(dispatchMock, getStateMock, {})		//thunk принимает 3 объекта:(dispatchMock, getStateMock, {доп.аргументы})

	//"toHaveBeenCalledTimes(3)" стандатн. сколько раз был вызван "dispatch"
	//(3) раза, считаем в "thunk"-е
	expect(dispatchMock).toHaveBeenCalledTimes(3)
	//"toHaveBeenNthCalledWith" -вызван опеределенный вызов 1-ый раз с данным объектом(стоит после запятой)
	expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
	expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
	expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false,1))
})
//---------------------------------------------------------------------------------------------------------------------------------------

test("Success unfollowed thunk", async () => {

	const thunk = unfollow(1);
	
	usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

	await thunk(dispatchMock, getStateMock, {})	

	expect(dispatchMock).toHaveBeenCalledTimes(3)
	expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
	expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
	expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false,1))
})



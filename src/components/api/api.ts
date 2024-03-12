//Это DAl (Data Access Layer) - уровень. 
//Здесь все ЗАПРОСЫ НА СЕРВЕР-----------------------------------------
//current user support--------------------------------------- 
import axios from 'axios';
import { UserType } from '../../types/types';



//  Шаблон запроса на сервер (далее везде он используется при др. запросах)--------------------------
export const instance = axios.create({
	// чтобы прилипла Coocke
	withCredentials: true,
	headers: { "API-KEY": "495ccbaa-f1de-49f2-aee6-bb202e0b4fca" },
	baseURL: `https://social-network.samuraijs.com/api/1.0/`,
});

//Типы--------------------------------------------------------------
export enum ResultCodesEnum {  //Тип "enum" для перечисления серверных кодов 
	Success = 0,
	Error = 1,
}
export enum ResultCodesCaptchaEnum {
	CaptchaIsRequired = 10
}

//Общий тип для получения массива данных GNERIC
export type GetItemsType = {
	items: Array<UserType>
	totalCount: number
	error: string | null
}

// Делаем общий Тип-Generic для всех "Response"...................
export type APIResponseType<D = {}, RC = ResultCodesEnum> = { //D={}- по умолчанию пустой  RC=ResultCodesEnum- по умолчанию"ResultCodesEnum"
	data: D            // Тип для объекта data: разное
	resultCode: RC     //Тип "enum" для перечисления серверных кодов(здесь применяем)
	messages: Array<string>
}




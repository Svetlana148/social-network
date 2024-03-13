import {getAuthUserData} from './auth-reducer';
import { InferActionsTypes } from './redux-store';

//const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'; 

// Для каждого Объекта создаем тип

// Типизируем initialState----------------------------------------------------
let initialState = {
	initialized: false,
};
// Тип для initialState
export type InitialStateType = typeof initialState
// ----------------------------------------------------
//Автоматически выведет типы actions-ов (InferActionsTypes-общий тип из "redux-store.ts")
type ActionsType = InferActionsTypes<typeof actions>






// Типизируем что ф-ция получает(в скобках) и возвращает(после скобок) 
const appReducer = (state = initialState, action:any) : InitialStateType =>{
	switch(action.type){
		
		case 'app/INITIALIZED_SUCCESS':

				return {
					...state,
					initialized : true,
				};

		default:
			return(state);
	}
}; 
export default appReducer;





// ActionCreator  Post-----------------------------------------
//---------------------------------------------------------------------------------------------
//Авто ведение типизации
//Все АС упакуем в 1 Объект "actions"
export const actions = {
	initializedSuccess : () =>({type : 'app/INITIALIZED_SUCCESS'} as const)   //Даем  названия const-ам в соотв-и с  Redux-Ducks "app/..."
}



//---------------------------------------------------------------------------------------------

	// Типизируем AC - initializedSuccess
	// type InitializedSuccessActionType ={
	// 	type : typeof INITIALIZED_SUCCESS //там не может быть ничего кроме 'INITIALIZED_SUCCESS'
	// };
// Типизируем что ф-ция возвращает(после скобок) 
// export const initializedSuccess = () : InitializedSuccessActionType =>({type : INITIALIZED_SUCCESS});


// export const toggleIsFetching = (isFetching)=>{
// 	return {type : TOGGLE_IS_FETCHING, isFetching:isFetching};
// };


// ------------THUNK Creators-----------------------------------------------------------------

export const  initializeApp = ()=>(dispatch:any)=>{
	let promise = dispatch(getAuthUserData());
	promise.then(( )=> {
		dispatch(actions.initializedSuccess());
	}) 
};



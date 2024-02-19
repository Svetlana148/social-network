import {getAuthUserData} from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

// Для каждого Объекта создаем тип
// Тип для initialState
export type InitialStateType = {
	initialized: boolean,
};
// Типизируем initialState
let initialState : InitialStateType = {
	initialized: false,
};




// Типизируем что ф-ция получает(в скобках) и возвращает(после скобок) 
const appReducer = (state = initialState, action:any) : InitialStateType =>{
	switch(action.type){
		
		case INITIALIZED_SUCCESS:

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

	// Типизируем AC - initializedSuccess
	type InitializedSuccessActionType ={
		type : typeof INITIALIZED_SUCCESS //там не может быть ничего кроме 'INITIALIZED_SUCCESS'
	};
// Типизируем что ф-ция возвращает(после скобок) 
export const initializedSuccess = () : InitializedSuccessActionType =>({type : INITIALIZED_SUCCESS});


// export const toggleIsFetching = (isFetching)=>{
// 	return {type : TOGGLE_IS_FETCHING, isFetching:isFetching};
// };


// ------------THUNK Creators-----------------------------------------------------------------

export const  initializeApp = ()=>(dispatch:any)=>{
	let promise = dispatch(getAuthUserData());
	promise.then(( )=> {
		dispatch(initializedSuccess());
	}) 
};



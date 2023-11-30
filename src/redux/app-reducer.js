import {getAuthUserData} from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


let initialState = {
	initialized: false,
};



const appReducer = (state = initialState, action)=>{
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

export const initializedSuccess = ()=>({type : INITIALIZED_SUCCESS});


// export const toggleIsFetching = (isFetching)=>{
// 	return {type : TOGGLE_IS_FETCHING, isFetching:isFetching};
// };


// ------------THUNK Creators-----------------------------------------------------------------

export const  initializeApp = ()=>(dispatch)=>{
	let promise = dispatch(getAuthUserData());
	promise.then(( )=> {
		dispatch(initializedSuccess());
	}) 
};



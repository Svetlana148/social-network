const ADD_MESSAGE = 'ADD-MESSAGE'
// const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'


//-----------------------------------------------------------------------------------------
// 2 Типа для уточнения initialState
type DialogType = {
	id : number
	name : string
}
type MessageType = {
	id : number
	message : string
}

let initialState = {
	dialogsData: [
		{ id: 1, name: "Ola" },
		{ id: 2, name: 'Masha' },
		{ id: 3, name: 'Katy' },
		{ id: 4, name: 'Lula' },
		{ id: 5, name: 'Berta' },
		{ id: 6, name: 'Boska' }
	] as Array <DialogType>,  // 1 Место уточнения initialState
	messagesData: [
		{ id: 1, message: 'Hallo' },
		{ id: 2, message: 'Tchudfg' },
		{ id: 3, message: 'Gut' }
	] as Array <MessageType>,  // 2 Место уточнения initialState,
};

// Тип для initialState------------------------------------
export type InitialStateType = typeof initialState;
//-----------------------------------------------------------------------------------------



const dialogsReducer = (state = initialState, action : any) : InitialStateType=>{

	switch(action.type){
		case ADD_MESSAGE:
			let newMessage = {
				id: 4, 
				message: action.newMessageText
			};
		
			return {
				...state,
				// newMessageText : (''),
				messagesData : [...state.messagesData,newMessage]
			};

			
		// case UPDATE_NEW_MESSAGE:
		// 		return {
		// 			...state,
		// 			newMessageText : action.newText,
		// 		};	
			

		default:
			return state;
	}
};
export default dialogsReducer;
	

// Message -----------------------------------------

type addMessageActionCreatorType ={ //Типизация для addMessageActionCreator
	type : typeof ADD_MESSAGE
	newMessageText : string
}
export const addMessageActionCreator = (newMessageText : string) : addMessageActionCreatorType=>{
	return {type : ADD_MESSAGE, newMessageText}
}

// export const updateNewMessageTextActionCreator = (text)=>{
// 	return {type : UPDATE_NEW_MESSAGE, newText : text}
// }
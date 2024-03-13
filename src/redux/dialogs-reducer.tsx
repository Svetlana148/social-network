import { InferActionsTypes } from "./redux-store"


// initialState  ----------------------------------------------------------------------------------------
// 2 Типа для уточнения initialState
type DialogType = { //Для Dialog-ов
	id : number
	name : string
}
type MessageType = {  //Для Message-ей
	id : number
	message : string
}
// Тип для initialState
export type InitialStateType = typeof initialState;
// initialState
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
//-----------------------------------------------------------------------------------------

//Упакуем все AC-ры в 1 Объект "actions" -------
export const actions = {
	addMessageActionCreator : (newMessageText : string)=>{return {type : 'ADD-MESSAGE', newMessageText} as const
	}
}

type ActionsType = InferActionsTypes<typeof actions>	// Типизируем все "actions"



const dialogsReducer = (state = initialState, action : ActionsType) : InitialStateType=>{

	switch(action.type){
		case 'ADD-MESSAGE':
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
	
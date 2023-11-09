const ADD_MESSAGE = 'ADD-MESSAGE'
// const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'



let initialState = {
	dialogsData: [
		{ id: 1, name: "Ola" },
		{ id: 2, name: 'Masha' },
		{ id: 3, name: 'Katy' },
		{ id: 4, name: 'Lula' },
		{ id: 5, name: 'Berta' },
		{ id: 6, name: 'Boska' }
	],
	messagesData: [
		{ id: 1, message: 'Hallo' },
		{ id: 2, message: 'Tchudfg' },
		{ id: 3, message: 'Gut' }
	],
	// what is changing
	//newMessageText: `You message`
}




const dialogsReducer = (state = initialState, action)=>{

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
export const addMessageActionCreator = (newMessageText)=>{
	return {type : ADD_MESSAGE, newMessageText}
}

// export const updateNewMessageTextActionCreator = (text)=>{
// 	return {type : UPDATE_NEW_MESSAGE, newText : text}
// }
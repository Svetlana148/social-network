const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'



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
	newMessageText: `You message`
}




const dialogsReducer = (state = initialState, action)=>{

	switch(action.type){
		case ADD_MESSAGE:
			let newMessage = {
				id: 4, 
				message: state.newMessageText
			};
		
			state.messagesData.push(newMessage);

			state.newMessageText=('');
			return state;

		case UPDATE_NEW_MESSAGE:	
			state.newMessageText = action.newText;
			return state;

		default:
			return state;
	}
}
export default dialogsReducer;
	

// Message -----------------------------------------
export const addMessageActionCreator = ()=>{
	return {type : 'ADD-MESSAGE'}
}

export const updateNewMessageTextActionCreator = (text)=>{
	return {type : 'UPDATE-NEW-MESSAGE', newText : text}
}
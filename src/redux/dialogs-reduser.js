const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'

const dialogsReducer = (state, action)=>{
	if (action.type === ADD_MESSAGE){
		let newMessage = {
						id: 4, 
						message: this._state.dialogsPage.newMessageText
					};
				
					state.messagesData.push(newMessage);
					state.newMessageText=('');
	} else
	if (action.type === UPDATE_NEW_MESSAGE){
		state.newMessageText = action.newText;
	}
	return state;

}

export default dialogsReducer;
	

// Message -----------------------------------------
export const addMessageActionCreator = ()=>{
	return {type : 'ADD-MESSAGE'}
}

export const updateNewMessageTextActionCreator = (text)=>{
	return {type : 'UPDATE-NEW-MESSAGE', newText : text}
}
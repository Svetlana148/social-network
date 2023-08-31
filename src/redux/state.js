let store = {

	_state : {

		profilePage:{
			postsData : [
			{ id: 1, message: 'Солнце', likesCount: '1' },
			{ id: 2, message: 'Hjiolpoiu', likesCount: '23' },
			{ id: 3, message: '12342345', likesCount: '78' }
			],
			// what is changing
			newPostText : 'Hallo everybody' 	},
	
	
		dialogsPage:{
			dialogsData : [
				{ id: 1, name: "Ola" },
				{ id: 2, name: 'Masha' },
				{ id: 3, name: 'Katy' },
				{ id: 4, name: 'Lula' },
				{ id: 5, name: 'Berta' },
				{ id: 6, name: 'Boska' }
			],
			messagesData : [
			{id: 1, message: 'Hallo'},
			{id: 2, message: 'Tchudfg'},
			{id: 3, message: 'Gut'}
			],
			// what is changing
			newMessageText : `You message`  
		},
		sidebar:{
			frendsData : [
				{ id: 1, name: 'Lula' },
				{ id: 2, name: 'Berta' },
				{ id: 3, name: 'Boska' }
			]
		},
	
	},
	_callSubscriber (){},



	getState(){
		return this._state;
	},
	subscribe (observer){
		this._callSubscriber= observer;
		},

	dispatch(action){
		// Post -----------------------------------------
		if (action.type === 'ADD-POST'){
			let newPost = {
				id: 4, 
				message: this._state.profilePage.newPostText, 
				likesCount: '0'
			};
		
			this._state.profilePage.postsData.push(newPost);
			this._state.profilePage.newPostText=('');
			this._callSubscriber(this._state);
		} else
		if (action.type === 'UPDATE-NEW-POST'){
			this._state.profilePage.newPostText = action.newText;
			this._callSubscriber(this._state);
		} else

		// Message -----------------------------------------
		if (action.type === 'ADD-MESSAGE'){
			let newMessage = {
							id: 4, 
							message: this._state.dialogsPage.newMessageText
						};
					
						this._state.dialogsPage.messagesData.push(newMessage);
						this._state.dialogsPage.newMessageText=('');
						this._callSubscriber(this._state);
		} else
		if (action.type === 'UPDATE-NEW-MESSAGE'){
			this._state.dialogsPage.newMessageText = action.newText;
			this._callSubscriber(this._state);
		}
	},
}



// ActionCreator -----------------------------------------
// Post -----------------------------------------
export const addPostActionCreator = ()=>{
	return {type : 'ADD-POST'}
}

export const updateNewPostTextActionCreator = (text)=>{
	return {type : 'UPDATE-NEW-POST', newText : text}
}

// Message -----------------------------------------
export const addMessageActionCreator = ()=>{
	return {type : 'ADD-MESSAGE'}
}

export const updateNewMessageTextActionCreator = (text)=>{
	return {type : 'UPDATE-NEW-MESSAGE', newText : text}
}

	

export default store;
//window.store = store ;




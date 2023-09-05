const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST = 'UPDATE-NEW-POST'


let initialState = {
	postsData: [
		{ id: 1, message: 'Солнце', likesCount: '1' },
		{ id: 2, message: 'Hjiolpoiu', likesCount: '23' },
		{ id: 3, message: '12342345', likesCount: '78' }
	],
	// what is changing
	newPostText: 'Hallo everybody'
};





const profileReducer = (state = initialState, action)=>{
	switch(action.type){
		case ADD_POST:
			let newPost = {
				id: 4, 
				message: state.newPostText, 
				likesCount: '0'
			};
			state.postsData.push(newPost);
			state.newPostText=('');
			return(state);

		case UPDATE_NEW_POST:
			state.newPostText = action.newText;
			return(state);

		default:
			return(state);
	}
}; 


export default profileReducer;

// ActionCreator  Post-----------------------------------------

export const addPostActionCreator = ()=>{
	return {type : 'ADD-POST'}
}

export const updateNewPostTextActionCreator = (text)=>{
	return {type : 'UPDATE-NEW-POST', newText : text}
}
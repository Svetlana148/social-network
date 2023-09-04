const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST = 'UPDATE-NEW-POST'

const profileReducer = (state, action)=>{


	
	if (action.type === ADD_POST){
		let newPost = {
			id: 4, 
			message: this._state.profilePage.newPostText, 
			likesCount: '0'
		};
	
		state.postsData.push(newPost);
		state.newPostText=('');
	} else
	if (action.type === UPDATE_NEW_POST){
		state.newPostText = action.newText;
	}; 



	return state;
}
export default profileReducer;

// ActionCreator -----------------------------------------
// Post -----------------------------------------
export const addPostActionCreator = ()=>{
	return {type : 'ADD-POST'}
}

export const updateNewPostTextActionCreator = (text)=>{
	return {type : 'UPDATE-NEW-POST', newText : text}
}
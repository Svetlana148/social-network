import {usersAPI} from '../components/api/api';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST = 'UPDATE-NEW-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';



let initialState = {
	postsData: [
		{ id: 1, message: 'Солнце', likesCount: '1' },
		{ id: 2, message: 'Hjiolpoiu', likesCount: '23' },
		{ id: 3, message: '12342345', likesCount: '78' }
	],

	newPostText : 'Hallo everybody',
	profile : null
};





const profileReducer = (state = initialState, action)=>{
	switch(action.type){
		case ADD_POST:{

			let newPost = {
				id: 4, 
				message: state.newPostText, 
				likesCount: '0'
			};


			return {
				...state,
				postsData : [...state.postsData,newPost],
				newPostText : '',
			};

		}



		case UPDATE_NEW_POST:{
			// let stateCopy = {...state};
			// stateCopy.newPostText = action.newText;
			// return(stateCopy);

			return {
				...state,
				newPostText : action.newText,
			};


		}


		case SET_USER_PROFILE:{

			return {...state, profile : action.profile};

		}
		

		default:
			return(state);
	}
}; 


export default profileReducer;

// ActionCreator  Post-----------------------------------------


export const addPostActionCreator = ()=>{
	return {type : ADD_POST}
};

export const updateNewPostTextActionCreator = (text)=>{
	return {type : UPDATE_NEW_POST, newText : text}
};

export const setUserProfile = (profile)=>{
	return {type : SET_USER_PROFILE, profile}
};



// ------------THUNK-----------------------------------------------------------------

export const getUserProfile = (userId)=>(dispatch)=>{
	usersAPI.getProfile(userId).then (responce =>{
		dispatch(setUserProfile(responce.data));
	})
}

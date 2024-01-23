import {usersAPI, getProfileAPI} from '../components/api/api';
import { stopSubmit } from 'redux-form';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTOS_SUCCESS = 'SAVE_PHOTOS_SUCCESS';


let initialState = {
	postsData: [
		{ id: 1, message: 'Солнце', likesCount: '1' },
		{ id: 2, message: 'Hjiolpoiu', likesCount: '23' },
		{ id: 3, message: '12342345', likesCount: '78' }
	],

	// newPostText : 'Hallo everybody',
	profile : null,
	status : "",
};





const profileReducer = (state = initialState, action)=>{
	switch(action.type){
		case ADD_POST:{

			let newPost = {
				id: 4, 
				message: action.newPostText, 
				likesCount: '0'
			};


			return {
				...state,
				postsData : [...state.postsData,newPost],
			};

		}


		case SET_USER_PROFILE:{
			return {...state, profile : action.profile};
		}
		

		case SET_STATUS:{
			return {...state, status : action.status};
		}

		case DELETE_POST:{
			return {...state, posts : state.posts.filter(p=> p.id != action.postId)};
		}

		case SAVE_PHOTOS_SUCCESS:{
			// Делаем коптю profile и photos меняем на те, которые в action 
			return {...state, profile : {...state.profile, photos : action.photos}};
		}

		default:
			return(state);
	}
}; 


export default profileReducer;



// ActionCreator  Post-----------------------------------------

export const addPostActionCreator = (newPostText)=>{
	return {type : ADD_POST, newPostText}
};

// export const updateNewPostTextActionCreator = (text)=>{
// 	return {type : UPDATE_NEW_POST, newText : text}
// };

export const setUserProfile = (profile)=>{
	return {type : SET_USER_PROFILE, profile}
};

export const setStatus = (status)=>{
	return {type : SET_STATUS, status}
};

export const deletePost = (postId)=>{
	return {type : DELETE_POST, postId}
};

export const savePhotoSuccess= (photos)=>{
	return {type : SAVE_PHOTOS_SUCCESS, photos}
};




// ------------THUNK-----------------------------------------------------------------

export const getUserProfile = (userId)=>async (dispatch)=>{
	let response = await usersAPI.getProfile(userId)
		dispatch(setUserProfile(response.data));
}



export const getStatus = (userId)=>async(dispatch)=>{
	let response = await getProfileAPI.getStatus(userId)
		dispatch(setStatus(response.data));
}


export const updateStatus = (status)=>async (dispatch)=>{
	let response = await getProfileAPI.updateStatus(status)
		if (response.data.resultCode === 0){
		dispatch(setStatus(status));
		}
}

export const savePhoto = (file) => async (dispatch)=>{
	let response = await getProfileAPI.savePhoto(file)
		if (response.data.resultCode === 0){
		dispatch(savePhotoSuccess(response.data.data.photos));
		}
}


export const saveProfile = (profile) => async (dispatch, getState)=>{
	const userId = getState().auth.userId;
	let response = await getProfileAPI.saveProfile(profile)
		if (response.data.resultCode === 0){
		dispatch(getUserProfile(userId));
		}
		else{
			//messages[0] Возьмем нулевое сообщение---------------------------------------------
			//let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"

			// Высветится общая ошибка
			dispatch(stopSubmit("edit-profile", {_error : response.data.messages[0]}));

			// Подсветится конкретное поле с ошибкой
			// dispatch(stopSubmit("edit-profile", {"contacts" : {"facebook" : response.data.messages[0]}}));

			return Promise.reject (response.data.messages[0]);
		}
}
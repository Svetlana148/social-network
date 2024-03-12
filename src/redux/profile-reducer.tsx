import { ProfileAPI} from '../components/api/profile-api';
// import {usersAPI} from '../components/api/users-api';
import { stopSubmit } from 'redux-form';
import { PostType, ProfileType, PhotosType,  } from '../types/types';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTOS_SUCCESS = 'SAVE_PHOTOS_SUCCESS';


let initialState = {
	postsData: [
		{ id: 1, message: 'Солнце', likesCount: 1 },
		{ id: 2, message: 'Hjiolpoiu', likesCount: 23 },
		{ id: 3, message: '12342345', likesCount: 78 }
	] as Array<PostType>,

	profile : null as ProfileType | null,
	status : "",
	newPostText: "",
};

export type InitialStateType = typeof initialState;



const profileReducer = (state = initialState, action : any) : InitialStateType=>{
	switch(action.type){
		case ADD_POST:{

			let newPost = {
				id: 4, 
				message: action.newPostText, 
				likesCount: '0'
			};


			return {
				...state,
				postsData : [...state.postsData,newPost] as Array<PostType>,
			};

		}


		case SET_USER_PROFILE:{
			return {...state, profile : action.profile};
		}
		

		case SET_STATUS:{
			return {...state, status : action.status};
		}

		// case DELETE_POST:{
		// 	return {...state, posts : state.posts.filter(p=> p.id != action.postId)};
		// }

		case SAVE_PHOTOS_SUCCESS:{
			// Делаем копию profile и photos меняем на те, которые в action 
			return {...state, profile : {...state.profile, photos : action.photos} as ProfileType};
		}

		default:
			return(state);
	}
}; 


export default profileReducer;



// ActionCreator  Post-----------------------------------------

type AddPostActionCreatorType ={ //Типизимруем addPostActionCreator
	type : typeof ADD_POST
	newPostText : string
}
export const addPostActionCreator = (newPostText: string) : AddPostActionCreatorType=>{
	return {type : ADD_POST, newPostText}
};


// export const updateNewPostTextActionCreator = (text)=>{
// 	return {type : UPDATE_NEW_POST, newText : text}
// };
//--------------------------------------------------------------------------
type SetUserProfileType ={ //Типизимруем setUserProfile
	type : typeof SET_USER_PROFILE
	profile : ProfileType
}
export const setUserProfile = (profile: ProfileType) : SetUserProfileType=>{
	return {type : SET_USER_PROFILE, profile}
};
//--------------------------------------------------------------------------

type SetStatusType ={ //Типизимруем setStatus
	type : typeof SET_STATUS
	status : string
}

export const setStatus = (status: string) :SetStatusType=>{
	return {type : SET_STATUS, status}
};
//--------------------------------------------------------------------------
type DeletePostType ={ //Типизимруем deletePost
	type : typeof DELETE_POST
	postId : number
}
export const deletePost = (postId : number) : DeletePostType=>{
	return {type : DELETE_POST, postId}
};

//--------------------------------------------------------------------------
type SavePhotoSuccessType ={ //Типизимруем savePhotoSuccess
	type : typeof SAVE_PHOTOS_SUCCESS
	photos : PhotosType
}

export const savePhotoSuccess= (photos : PhotosType) : SavePhotoSuccessType =>{
	return {type : SAVE_PHOTOS_SUCCESS, photos}
};




// ------------THUNK-----------------------------------------------------------------

//Запрос на получение профайла какого-то User-а
export const getUserProfile = (userId : number)=>async (dispatch : any)=>{
	let data = await ProfileAPI.getProfile(userId)
		dispatch(setUserProfile(data));
}


//Запрос на получение Status-а какого-то User-а
export const getStatus = (userId : number)=>async(dispatch : any)=>{
	let data = await ProfileAPI.getStatus(userId)
		dispatch(setStatus(data));
}

//Запрос на получение обновление Status-а нас как User-а
export const updateStatus = (status : string)=>async (dispatch : any)=>{
	try{
		let data = await ProfileAPI.updateStatus(status)
			if (data.resultCode === 0){
			dispatch(setStatus(status));
			}
		}catch(error){
		}
}


export const savePhoto = (file : any) => async (dispatch : any)=>{
	let data = await ProfileAPI.savePhoto(file)
		if (data.resultCode === 0){
		dispatch(savePhotoSuccess(data.data.photos));
		}
}


export const saveProfile = (profile : ProfileType) => async (dispatch : any, getState : any)=>{
	const userId = getState().auth.userId;
	let data = await ProfileAPI.saveProfile(profile)
		if (data.resultCode === 0){
		dispatch(getUserProfile(userId));
		}
		else{
			//messages[0] Возьмем нулевое сообщение---------------------------------------------
			//let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"

			// Высветится общая ошибка
			dispatch(stopSubmit("edit-profile", {_error : data.messages[0]}));

			// Подсветится конкретное поле с ошибкой
			// dispatch(stopSubmit("edit-profile", {"contacts" : {"facebook" : response.data.messages[0]}}));

			return Promise.reject (data.messages[0]);
		}
}
import { ProfileAPI} from '../components/api/profile-api';
import { FormAction, stopSubmit } from 'redux-form';
import { PostType, ProfileType, PhotosType,  } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';


//  initialState  --------------------------------------------------------------
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
//--------------------------------------------------------------

// 4. Типизируем "ActionsType"-ом action-ы в "profileReducer"
const profileReducer = (state = initialState, action : ActionsType) : InitialStateType=>{
	switch(action.type){
				// 5. Меняем const-ы здесь и в АС на 'ADD-POST' в ковычках 
		case 'PROFILE/ADD-POST':{

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


		case 'PROFILE/SET-USER-PROFILE':{
			return {...state, profile : action.profile};
		}
		

		case 'PROFILE/SET-STATUS':{
			return {...state, status : action.status};
		}

		// case 'PROFILE/DELETE_POST':{
		// 	return {...state, posts : state.posts.filter(p=> p.id != action.postId)};
		// }

		case 'PROFILE/SAVE_PHOTOS_SUCCESS':{
			// Делаем копию profile и photos меняем на те, которые в action 
			return {...state, profile : {...state.profile, photos : action.photos} as ProfileType};
		}

		default:
			return(state);
	}
}; 
export default profileReducer;



// ActionCreator  Post-----------------------------------------

// 1. Упаковываем все АС в Объект "actions"------------------------
export const actions = {
	//Ключ(название АС) : значение (сам АС)
	addPostActionCreator : (newPostText: string)=>{return {type : 'PROFILE/ADD-POST', newPostText} as const},
	setUserProfile : (profile: ProfileType)=>{return {type : 'PROFILE/SET-USER-PROFILE', profile}	as const},
	setStatus : (status: string) =>{return {type : 'PROFILE/SET-STATUS', status}as const},
	deletePost : (postId : number)=>{return {type : 'PROFILE/DELETE_POST', postId}	as const},
	savePhotoSuccess: (photos : PhotosType) =>{return {type : 'PROFILE/SAVE_PHOTOS_SUCCESS', photos} as const}
}
//--------------------------------------------------------------------------
// 2. Типизируем все "actions"
type ActionsType = InferActionsTypes<typeof actions>	
//--------------------------------------------------------------------------

// 3. Типизируем все Thunk-и
type ThunkType = BaseThunkType<ActionsType | FormAction>  //"FormAction" из 'redux-form'-мы, чтобы добавить в dispatch "Sabmit"//"FormAction" из 'redux-form'-мы, чтобы добавить в dispatch "Sabmit"




// ------------THUNK-----------------------------------------------------------------

//Запрос на получение профайла какого-то User-а
export const getUserProfile = (userId : number) : ThunkType =>async (dispatch)=>{
	let data = await ProfileAPI.getProfile(userId)
		dispatch(actions.setUserProfile(data));
}


//Запрос на получение Status-а какого-то User-а
export const getStatus = (userId : number) : ThunkType=>async(dispatch : any)=>{
	let data = await ProfileAPI.getStatus(userId)
		dispatch(actions.setStatus(data));
}

//Запрос на получение обновление Status-а нас как User-а
export const updateStatus = (status : string) : ThunkType=>async (dispatch)=>{
	try{
		let data = await ProfileAPI.updateStatus(status)
			if (data.resultCode === 0){
			dispatch(actions.setStatus(status));
			}
		}catch(error){
		}
}


export const savePhoto = (file : File) : ThunkType => async (dispatch)=>{  //"File" из DOM-объекта
	let data = await ProfileAPI.savePhoto(file)
		if (data.resultCode === 0){
		dispatch(actions.savePhotoSuccess(data.data.photos));
		}
}


export const saveProfile = (profile : ProfileType) : ThunkType => async (dispatch, getState)=>{
	const userId = getState().auth.userId;
	let data = await ProfileAPI.saveProfile(profile)
		if (data.resultCode === 0){
			if(userId !=null){				//Если User есть
				dispatch(getUserProfile(userId));
			} else {
				throw new Error("userId can't be null");  //Вывести сообщение об ошибке, если нету User-а
			}
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
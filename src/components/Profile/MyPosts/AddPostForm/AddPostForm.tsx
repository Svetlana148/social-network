//Добавляет новый Post в Profile
//Вызывается в MyPostsContainer.tsx

import React from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
// import s from '../Profile.module.css';


//Контейнеры :(2. profileInfo "onSubmit (ф-ция saveProfile (formData из Redux))" (1. ProfileDataForm "сама форма")))




//-----------------------------------------------------------------------------------------
//Какие данные собирает  форма(что вводит пользователь)
export type AddPostFormType = {
	newPostText: string
}



type MapDispatchPropsType = {  
		addPost: (newPostText: string) => void
}
//-----------------------------------------------------------------------------------------








// 1. Осн. компонента с формой-------------------------------------------------------------------

//(initialValues:any, profile:any, onSubmit: (formData: any) => void)


export default function AddPostForm (props: MapDispatchPropsType){
// const AddPostForm = ({handleSubmit, profile, error}) =>{

// "useForm" Generik  Что можно делать с формой и Значения полей формы по умолчанию
	// {register - регистрация, handleSubmit - сбор данных в форме, formState- состояние формы(тут ошибки)}-возможности работы с формой
	const { register, handleSubmit, formState: { errors } } = useForm<AddPostFormType>({	})




//  Submit----------------------------------------------------------------
	//Удачный Submit
	const submit : SubmitHandler<AddPostFormType > = (formData) =>{ //Ф-ция обработки с новым Post-ом
		props.addPost(formData.newPostText);
	}

	//НЕ удачный Submit
	const error : SubmitErrorHandler<AddPostFormType> = data =>{
	}
//----------------------------------------------------------------





	return (
		<form onSubmit={handleSubmit(submit, error)}> 

				<div><button>Save</button></div>

				{/* Покажем ошибку с указанием в каком поле она сделана */}
				{/* {error && <div className={style.formSummaryError}>
					{error}
				</div>} */}



				{/* Поля формы */}
				<div>
					<b>Add post</b> : <input type='textarea' {...register('newPostText', 
																							{maxLength:  {value: 20, message: 'Password exceeds 20 symbols'}})} />
					
					<button>Remove</button>																		
				</div>
		</form>
	)
}
//Форма поиска User-а в "Users.tsx"

import React from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';


//Контейнеры :(2. profileInfo "onSubmit (ф-ция saveProfile (formData из Redux))" (1. UserSearchForm "сама форма")))




//-----------------------------------------------------------------------------------------
//Какие данные собирает  форма(что вводит пользователь)
export type UserSearchFormType = {
	userSearch: string
}



type MapDispatchPropsType = {  
		// addPost: (newPostText: string) => void
}
//-----------------------------------------------------------------------------------------








// 1. Осн. компонента с формой-------------------------------------------------------------------

//(initialValues:any, profile:any, onSubmit: (formData: any) => void)


export default function UserSearchForm (props: MapDispatchPropsType){
// const AddPostForm = ({handleSubmit, profile, error}) =>{

// "useForm" Generik  Что можно делать с формой и Значения полей формы по умолчанию
	// {register - регистрация, handleSubmit - сбор данных в форме, formState- состояние формы(тут ошибки)}-возможности работы с формой
	const { register, handleSubmit, formState: { errors } } = useForm<UserSearchFormType>({	})




//  Submit----------------------------------------------------------------
	//Удачный Submit
	const submit : SubmitHandler<UserSearchFormType > = (formData) =>{ //Ф-ция обработки поиска User-а
		// props.addPost(formData.newPostText);
	}

	//НЕ удачный Submit
	const error : SubmitErrorHandler<UserSearchFormType> = data =>{
	}
//----------------------------------------------------------------





	return (
		<form onSubmit={handleSubmit(submit, error)}> 


				{/* Покажем ошибку с указанием в каком поле она сделана */}
				{/* {error && <div className={style.formSummaryError}>
					{error}
				</div>} */}



				{/* Поля формы */}
				<div>
					<b>User Search</b> : <input type='input' {...register('userSearch', 
																							{maxLength:  {value: 20, message: ' exceeds 20 symbols'}})} />
					
					<button>Search</button>																		
				</div>
		</form>
	)
}
//Форма поиска User-а в "Users.tsx"

import React from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { FilterType } from '../../redux/users-reducer';


//Контейнеры :(2. UserSearchForm "onSubmit (ф-ция requestUsers (formData из Redux))" (1. UserSearchForm "сама форма")))




//-----------------------------------------------------------------------------------------

//FilterType - Какие данные собирает  форма(что вводит пользователь)


//Что передаем в ф-ию с формой(а передаем ф-цию-обработчик)
type UserSearchFormPropsType = {  
	onFilterChanged : (filter: FilterType) => void
}
//-----------------------------------------------------------------------------------------





// 1. Осн. компонента с формой-------------------------------------------------------------------

const UserSearchForm: React.FC <UserSearchFormPropsType> = (props) => {

// "useForm" Generik  Что можно делать с формой и Значения полей формы по умолчанию
	// {register - регистрация, handleSubmit - сбор данных в форме, formState- состояние формы(тут ошибки)}-возможности работы с формой
	const { register, handleSubmit, formState: { errors } } = useForm<FilterType>({
		defaultValues: {              //передаем дополнительные параметры
			term: ""
		}
	})




//  Submit----------------------------------------------------------------
	//Удачный Submit
	const submit : SubmitHandler<FilterType > = (formData) =>{ //Ф-ция обработки поиска User-а
		props.onFilterChanged(formData);
	}

	//НЕ удачный Submit
	const error : SubmitErrorHandler<FilterType> = data =>{
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
					<b>User Search</b> : <input type='input' {...register('term', 
																							{maxLength:  {value: 20, message: ' exceeds 20 symbols'}})} />
					
					<button>Search</button>																		
				</div>
		</form>
	)
}

export default UserSearchForm
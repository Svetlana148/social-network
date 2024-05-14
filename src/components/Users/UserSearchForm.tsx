//Форма поиска User-а в "Users.tsx"

import React from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { FilterType } from '../../redux/users-reducer';
import { useSelector } from 'react-redux';
import { getUsersFilter } from '../../redux/users-selectors';


//Контейнеры :(2. UserSearchForm "onSubmit (ф-ция requestUsers (formData из Redux))" (1. UserSearchForm "сама форма")))




//-----------------------------------------------------------------------------------------

//FilterType - Какие данные собирает  форма(что вводит пользователь)


//Что передаем в ф-ию с формой(а передаем ф-цию-обработчик)
type UserSearchFormPropsType = {  
	onFilterChanged : (filter: FilterType) => void
}


type FriendFormType =   
	"true" | "false" | "null"


//Какие типы будут в "Submit"-е (не FilterType)
type FormType = {  
	term : string,
	friend: FriendFormType
}





//-----------------------------------------------------------------------------------------





// 1. Осн. компонента с формой-------------------------------------------------------------------

const UserSearchForm: React.FC <UserSearchFormPropsType> = (props) => {

//Получаем ранее введенное значение "filter"-а  и далее это в "initialState"	
const filter = useSelector(getUsersFilter)


// "useForm" Generik  Что можно делать с формой и Значения полей формы по умолчанию
	// {register - регистрация, handleSubmit - сбор данных в форме, formState- состояние формы(тут ошибки)}-возможности работы с формой
	const { register, handleSubmit, reset, formState: { errors } } = useForm<FormType>({
		defaultValues: {              //передаем дополнительные параметры
			term: filter.term,
			friend: String(filter.friend) as FriendFormType
		}
	})




//  Submit----------------------------------------------------------------
	//Удачный Submit
	const submit : SubmitHandler<FormType > = (formData) =>{ //Ф-ция обработки поиска User-а
		const filter:FilterType = {
			term: formData.term,
			friend: formData.friend === 'null' ? null    :     formData.friend === 'true' ? true     :    false
		}

		props.onFilterChanged(filter);
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
				<div>
					
				</div>


				{/* Поля формы */}
				<div>
					<b>User Search</b> : <input type='input' {...register('term', 
																							{maxLength:  {value: 20, message: ' exceeds 20 symbols'}})} />
					
					{/* select - поле выбора----------------------------------------------*/}
					<select {...register("friend")}>
					<option value="null">All</option>
					<option value="true">Only followed</option>
					<option value="false">Only unfollowed</option>
					</select>

					
					<button>Search</button>																		
				</div>
		</form>
	)
}

export default UserSearchForm
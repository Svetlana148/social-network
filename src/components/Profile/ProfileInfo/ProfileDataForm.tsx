//Форма в "Моем профайле" (редактирование данных моего профиля): fullName, lookingForAJob, My professional skills, About me, Contacts[]

import React from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { ContactsType, ProfileType } from '../../../types/types';
import s from '../Profile.module.css';
import { InitialStateType } from '../../../redux/profile-reducer';


//Контейнеры :(2. profileInfo "onSubmit (ф-ция "saveProfile" (formData из Redux))" (1. ProfileDataForm "сама форма")))
// 2. profileInfo снабжает (1. ProfileDataForm) чем:    	"saveProfile-ом"-ф-цией  callback-ом




//Какие данные собирает  форма(что вводит пользователь)
interface IProfileDataEditForm {
	fullName : string
	lookingForAJob : boolean | null
	lookingForAJobDescription : string
	aboutMe  : string
   contacts : ContactsType
}


// 1. Осн. компонента с формой-------------------------------------------------------------------


type ProfileDataFormPropsType = {
	initialValues:ProfileType
	saveProfile: (formData: ProfileType) => void
}



//initialValues - весь profile
export default function ProfileDataForm({initialValues, saveProfile}:ProfileDataFormPropsType) {
// const ProfileDataForm = ({handleSubmit, profile, error}) =>{

// "useForm" Generik  Что можно делать с формой и Значения полей формы по умолчанию
	// {register - регистрация, handleSubmit - сбор данных в форме, formState- состояние формы(тут ошибки)}-возможности работы с формой

	const { register, handleSubmit, formState: { errors } } = useForm<IProfileDataEditForm>({
		defaultValues: {              //передаем дополнительные параметры
			fullName : initialValues.fullName,
			lookingForAJob : initialValues.lookingForAJob,
			lookingForAJobDescription : initialValues.lookingForAJobDescription,
			aboutMe : initialValues.aboutMe,
			contacts : initialValues.contacts
      }
		})

//  Submit----------------------------------------------------------------
	//Удачный Submit
	const submit : SubmitHandler<IProfileDataEditForm > = (formData) =>{
		debugger
		let updatedProfile: ProfileType = {
			...initialValues, fullName : formData.fullName, 
									lookingForAJob : formData.lookingForAJob   ?? false,	
									lookingForAJobDescription : formData.lookingForAJobDescription,
									aboutMe : formData.aboutMe,
									contacts : formData.contacts
		}
		// initialValues.fullName = formData.fullName;
		// initialValues.lookingForAJob = formData.lookingForAJob   ?? false;
		// initialValues.lookingForAJobDescription= formData.lookingForAJobDescription;
		// initialValues.aboutMe = formData.aboutMe;
		// initialValues.contacts = formData.contacts;
		saveProfile(updatedProfile);
	}

	//НЕ удачный Submit
	const error : SubmitErrorHandler<IProfileDataEditForm > = data =>{
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
				<b>Full name</b> : <input type='input' {...register('fullName', {
																					maxLength:  {value: 20, message: 'Password exceeds 20 symbols'},
																					minLength:  {value: 4, message: 'Password shorter 4 symbols'}
																					})} />
				</div>


				<div>
					<b>Looking for a job</b> : <input type='checkbox' {...register('lookingForAJob', )} />
					{/* {createForm("", "lookingForAJob", [], Element, "input", { type: "checkbox" })} */}
				</div>

				<div>
					<b>My professional skills</b> : <input type='textarea' {...register('lookingForAJobDescription', )} />
					{/* {createForm("My professional skills", "lookingForAJobDescription", [], Element, "textarea")} */}
				</div>

				<div>
					<b>About me</b> : <input type='textarea' {...register('aboutMe')} />
				</div>



				<div>
					<b>Contacts</b> : 

						<div className = {s.contact}>
							<div>
								<b>github : <input type='input' {...register('contacts.github')} /></b>
							</div>
							<div>
								<b>vk : <input type='input' {...register('contacts.vk')} /></b>
							</div>
							<div>
								<b>facebook : <input type='input' {...register('contacts.facebook')} /></b>
							</div>
							<div>
								<b>instagram : <input type='input' {...register('contacts.instagram')} /></b>
							</div>
							<div>
								<b>twitter : <input type='input' {...register('contacts.twitter')} /></b>
							</div>
							<div>
								<b>website : <input type='input' {...register('contacts.website')} /></b>
							</div>
							<div>
								<b>youtube : <input type='input' {...register('contacts.youtube')} /></b>
							</div>
							<div>
								<b>mainLink : <input type='input' {...register('contacts.mainLink')} /></b>
							</div>
						</div>
						
				</div>

		</form>
	)
}
import React from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import s from '../FormsControls/FormsControls.module.css'
// import './LoginForm .css'


// 1. Тип для данных из формы
interface ILoginForm {
	captchaUrl : string | null
	email : string
	password : string
	rememberMe : boolean | null
}


function LoginForm () {

  // "useForm" Generik  Что можно делать с формой и Значения полей формы по умолчанию
	// {register - регистрация, handleSubmit - сбор данных в форме, formState- состояние формы(тут ошибки)}-возможности работы с формой
	const { register, handleSubmit, formState: {errors}  } = useForm<ILoginForm>({
      defaultValues: {              //передаем дополнительные параметры
			captchaUrl : null,
			email : "",
			password : "",
      }
   })

//  Submit----------------------------------------------------------------
	//Удачный Submit
	const submit : SubmitHandler<ILoginForm > = data =>{

	}

	//НЕ удачный Submit
	const error : SubmitErrorHandler<ILoginForm > = data =>{
		
	}
//----------------------------------------------------------------



	return (
		<>
		{/* Обработчик формы --------------------------------*/}
		{/* На входе Удачный и НЕ удачный Submit*/}
			<form onSubmit={handleSubmit(submit, error)}>   
				<div>
					<input type='text' {...register('email', {required: "Email Address is required", 
																			pattern: {
																				value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
																				message: 'Incorrect Email' 
																			}})} 
						className={errors.email? s.formSummaryError :""} aria-invalid={errors.email? true :false} placeholder="email"/>
						{ errors.email && 
							<span className={s.formSummaryError}>{ errors.email?.message }</span>
						}
				</div>
				
				<div>
					<input type='password' {...register('password', {required: "Password is required", 
																					maxLength:  {value: 20, message: 'Password exceeds 20 symbols'},
																					minLength:  {value: 8, message: 'Password shorter 8 symbols'}
																					})} placeholder="Password"/>
					{ errors.password && 
							<span className={s.formSummaryError}>{ errors.password?.message }</span>
						}
				</div>
				

				<div>
					<input type='checkbox' {...register('rememberMe')}/>
					remember me
				</div>
				
				
				<div>
				<button>Login</button>
				</div>
			</form> 
		</>
	)
}
export default LoginForm
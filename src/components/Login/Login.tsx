import React from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStateType } from '../../redux/redux-store';

import s from '../FormsControls/FormsControls.module.css'
// import './LoginForm .css'



// Контейнеры : (2 Login (1 LoginForm))
// 2 Login снабжает (1 LoginForm)) чем: 	"captchaUrl"







// 1. LoginForm ----------------------------------------------------------------------------------
//Какие данные собирает  форма(что вводит пользователь)
interface ILoginForm {
	captcha : string
	email : string
	password : string
	rememberMe : boolean | null
}

//Что получает к-та "LoginForm"
type LoginFormPropsType = {
	captchaUrl : string | null,
	loginSubmit: (formData: ILoginForm) =>void
}

export function LoginForm (props: LoginFormPropsType) {

  // "useForm" Generik  Что можно делать с формой и Значения полей формы по умолчанию
	// {register - регистрация, handleSubmit - сбор данных в форме, formState- состояние формы(тут ошибки)}-возможности работы с формой
	const { register, handleSubmit, formState: {errors}  } = useForm<ILoginForm>({
      defaultValues: {              //передаем дополнительные параметры
			captcha : "",
			email : "",
			password : "",
      }
   })

//  Submit----------------------------------------------------------------
	//Удачный Submit
	const submit : SubmitHandler<ILoginForm > = (formData) =>{
		props.loginSubmit(formData);
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
																					minLength:  {value: 5, message: 'Password shorter 5 symbols'}
																					})} placeholder="Password"/>
					{ errors.password && 
							<span className={s.formSummaryError}>{ errors.password?.message }</span>
						}
				</div>
				

				<div>
					<input type='checkbox' {...register('rememberMe')}/>
					remember me
				</div>

				{/* Раздел для Captch-и--------------------------------------------- */}
				{props.captchaUrl && <img src = {props.captchaUrl} alt="captcha"/>}
				{props.captchaUrl && <input type='input' {...register('captcha', {required: "Captcha is required"} )} placeholder="Symbol from image"/>}
				{/* --------------------------------------------- */}

				
				<div>
				<button>Login</button>
				</div>
			</form> 
		</>
	)
}





//-----------------------------------------------------------------------------------------
// 2. Контейнер Login (LoginForm))
//  Login снабжает к-ту  чем: 	"captchaUrl"



export const LoginPage : React.FC = () => {
	
	//Используем "useSelector( наш селектор)" для получения данных из "state"-а не через "props"-ы	
	const captchaUrl = useSelector((state: AppStateType)=>state.auth.captchaUrl)
	const isAuth = useSelector((state: AppStateType)=>state.auth.isAuth)

	//const dispatch = useDispatch()
	const dispatch: AppDispatch  =  useDispatch()
	const loginSubmit = (formData: ILoginForm) =>{
		dispatch(login(formData.email, formData.password, formData.rememberMe ?? false, formData.captcha));
	}


	if (isAuth) {
		//Navigate вместо Redirect----------------------------------------------------
		return <Navigate to={("/Profile")} />
	}

	return (
		<div>
			<h1>Login </h1>
			<LoginForm captchaUrl={captchaUrl}  loginSubmit = {loginSubmit}/>
		</div>
	)
}

//----------------------------------------------------------------------------------

export default LoginPage






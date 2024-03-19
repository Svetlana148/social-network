import React from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
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
			captchaUrl : null
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
					<input type='text' {...register('email', {required: "Email Address is required"})} aria-invalid={errors.email? true :false}/>
					{ errors.email && <span>error</span>}
				</div>
				{/* <div>
					<Field placeholder={"Email"} name={"email"}  validate={[required]} component={Element} typeElement = {"input"}/>
				</div> */}

				<div>
					<input type='password' {...register('password', {required: true})}/>
				</div>
				{/* <div>
					<Field placeholder={"Password"} name={"password"}  validate={required}  type={"password"} component={Element} typeElement="input" />
				</div> */}

				<div>
					<input type='checkbox' {...register('rememberMe')}/>
					remember me
				</div>
				{/* {createForm(null, "rememberMe", [], Element, "input", { type: "checkbox" }, "remember me")} */}
				
				
				<div>
				<button>Login</button>
				</div>
			</form> 
		</>
	)
}

		

export default LoginForm
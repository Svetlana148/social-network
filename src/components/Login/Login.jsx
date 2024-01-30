import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Element, createForm } from '../FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../utils/Validators/validators';
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import s from '../FormsControls/FormsControls.module.css';


// Контейнеры : 4 connect(3 Login (2 LoginReduxForm (1 LoginForm)))


// 1. Осн. компонента с формой-------------------------------------------------------------------
const LoginForm = ({ handleSubmit, error, captchaUrl }) => {

	return (
		<form onSubmit={handleSubmit}>

			{createForm("Email", "email", [required], Element, "input")}
			{/* <div>
				<Field placeholder={"Email"} name={"email"}  validate={[required]} component={Element} typeElement = {"input"}/>
			</div> */}

			{createForm("Password", "password", [required], Element, "input", { type: "password" })}
			{/* <div>
				<Field placeholder={"Password"} name={"password"}  validate={required}  type={"password"} component={Element} typeElement="input" />
			</div> */}

			{createForm(null, "rememberMe", [], Element, "input", { type: "checkbox" }, "remember me")}
			{/* <div>
				<Field name={"rememberMe"}   type={"checkbox"}  component={Element} typeElement = "input"/>remember me
			</div> */}

			{/* Раздел для Captch-и--------------------------------------------- */}
			{captchaUrl && <img src = {captchaUrl} />}
			{captchaUrl && createForm("Symbol from image", "captcha", [required], Element, "input", {}) }
			{/* --------------------------------------------- */}


			{error && <div className={s.formSummaryError}>
				{error}
			</div>}
			<div>
				<button>Login</button>
			</div>
		</form>
	)
}


// 2. Оборачиваем Осн. компоненту hoc-ом из Redux-form
// hoc снабжает к-ту "handleSubmit"-ом из  Redux-form  и уникальным именем форму---------------------------------

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)
//------------------------------------------------------------------------------


// 3. Контейнер Login (LoginReduxForm (LoginForm))
//  Login снабжает к-ту "onSubmit"-ом из  Redux-form чтобы отправить форму в Store---------------------------------

const Login = (props) => {
	const onSubmit = (formData) => {
		//"login" is here callback from connect(thunkCreater)------------------------------------
		// Отправляем эти props-ы в login(здесь login - thunkCreater из auth-reducer-а)
		//Здесть просто captcha, т.к. это просто поле для ввода captcha-и
		props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
	}

	if (props.isAuth) {
		//Navigate вместо Redirect----------------------------------------------------
		return <Navigate to={("/Profile")} />
	}

	return (
		<div>
			<h1>Login </h1>
			<LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
		</div>
	)
}

//4. Контейнер connect снабжает "login"-ом - это thunkCreater------------------------------------
const mapStateToProps = (state) => ({
	captchaUrl: state.auth.captchaUrl,
	isAuth: state.auth.isAuth
});


export default connect(mapStateToProps, { login })(Login);
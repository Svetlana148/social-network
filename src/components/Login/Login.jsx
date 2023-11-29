import React from 'react';
import {formReducer} from '../../redux/redux-store';
import { Field, reduxForm } from 'redux-form';
import {Element} from '../FormsControls/FormsControls';
import { required, maxLengthCreator} from '../../utils/Validators/validators';
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import s from '../FormsControls/FormsControls.module.css';


//MainComponent
const LoginForm = (props) => {
	return(
		<form onSubmit ={props.handleSubmit}>
			<div>
				<Field placeholder={"Email"} name={"email"}  validate={required} component={Element} typeElement = "input"/>
			</div>

			<div>
				<Field placeholder={"Password"} name={"password"}  validate={required}  type={"password"} component={Element} typeElement='input' />
			</div>

			<div>
				<Field name={"rememberMe"}   type={"checkbox"}  component={Element} typeElement = "input"/>remember me
			</div>

			{props.error && <div className={s.formSummaryError}>
				{props.error}
			</div>}
			<div>
				<button>Login</button>
			</div>
		</form>
	)
}


//Оборачиваем эту форму hok-ом from Redux-form---------------------------------
//containerComponent send from Redux-form "handleSubmit" to MainComponent(LoginForm)
// a unique name fo the form

const LoginReduxForm = reduxForm({form : 'login'})(LoginForm)
//------------------------------------------------------------------------------



const Login = (props) => {
	const onSubmit = (formData) => {
		//login is here callback from connect(thunkCreater)------------------------------------
		props.login(formData.email, formData.password, formData.rememberMe);
	}

	if (props.isAuth){
		//Navigate вместо Redirect----------------------------------------------------
		return <Navigate to={("/Profile")}/>
	}

	return(
		<div>
			<h1>Login </h1>
			<LoginReduxForm onSubmit = {onSubmit}/>
		</div>
	)
}

const mapStateToProps = (state) =>({
	isAuth: state.auth.isAuth
});

//login is here thunkCreater------------------------------------
export default connect(mapStateToProps, {login})(Login);
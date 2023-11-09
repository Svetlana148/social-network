import React from 'react';
import {formReducer} from '../../redux/redux-store';
import { Field, reduxForm } from 'redux-form'

//Mai nComponent
const LoginForm = (props) => {
	return(
		<form onSubmit ={props.handleSubmit}>
			<div>
				<Field placeholder={"Login"} name={"login"} component={"input"}/>
			</div>
			<div>
				<Field placeholder={"Password"} name={"password"} component={"input"} />
			</div>
			<div>
				<Field component={"input"} name={"rememberMe"} type={"checkbox"} />
			</div>
			<div>
				<button>Login</button>
			</div>
		</form>
	)
}


//containerComponent send from Redux-form "handleSubmit" to MainC 
const LoginReduxForm = reduxForm({
	// a unique name fo the form
	form : 'login'
})(LoginForm)




const Login = (props) => {
	const onSubmit = (formData) => {
		console.log(formData);
	}


	return(
		<div>
			<h1>Login </h1>
			<LoginReduxForm onSubmit = {onSubmit}/>
		</div>
	)
}

export default Login;
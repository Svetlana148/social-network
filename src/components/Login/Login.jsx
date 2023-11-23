import React from 'react';
import {formReducer} from '../../redux/redux-store';
import { Field, reduxForm } from 'redux-form';
import {Element} from '../FormsControls/FormsControls';
import { required, maxLengthCreator} from '../../utils/Validators/validators';


//MainComponent
const LoginForm = (props) => {
	return(
		<form onSubmit ={props.handleSubmit}>
			<div>
				<Field placeholder={"Login"} name={"login"}  validate={required} component={Element} typeElement = "input"/>
			</div>

			<div>
				<Field placeholder={"Password"} name={"password"}  validate={required} component={Element} typeElement='input' />
			</div>

			<div>
				<Field name={"rememberMe"}   type={"checkbox"}  component={Element} typeElement = "input"/>remember me
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
import React from 'react';
import s from './FormsControls.module.css';
import { Field, reduxForm } from 'redux-form';



//Container for Textarea---------------------------------------------
export const Textarea = ({input, meta, ...props}) =>{
	let haveError = meta.touched && meta.error;
	return (
		<div className={s.formControl + " " + (haveError ? s.error : " ")}>
			<div>
				<textarea {...input} {...props}/>
			</div>
				{ haveError && <span>{meta.error}</span>}
		</div>
	)
}


//Container for Input---------------------------------------------
export const Input = ({input, meta, ...props}) =>{
	let haveError = meta.touched && meta.error;
	return (
		<div className={s.formControl + " " + (haveError ? s.error : " ")}>
			<div>
				<input {...input} {...props}/>
			</div>
				{ haveError && <span>{meta.error}</span>}
		</div>
	)
}

//Container Universal  for Input and Textarea to check Errors(FormControl)---------------------------------------------

export const Element = ({input, meta, ...props}) =>{
	let haveError = meta.touched && meta.error;

	return (
		<div className={s.formControl + " " + (haveError ? s.error : " ")}>
			<div>
				<props.typeElement {...input} {...props} />
			</div>
				{ haveError && <span>{meta.error}</span>}
		</div>
	)
}


export const createForm = (placeholder, name, validate, component, typeElement, props={}, text="") =>(
	<div>
	<Field placeholder={placeholder} name={name}  validate={validate} 
	component={component} typeElement = {typeElement} {...props}/>{text}
	</div> 
)


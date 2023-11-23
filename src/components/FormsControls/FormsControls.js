import React from 'react';
import s from './FormsControls.module.css';



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

//Container Universal---------------------------------------------

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


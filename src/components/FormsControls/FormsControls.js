import React from 'react';
import s from './FormsControls.module.css';




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
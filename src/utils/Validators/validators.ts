import React from 'react';

export type FieldValidatorType = (value : string) => string | undefined

export const required : FieldValidatorType = value => {
	if (value) return undefined;
	return "Field is required";
}



// Больше не нужно с React-Hook-FORM-ом
export const maxLengthCreator = (maxLength : number) : FieldValidatorType => (value )=> {
	if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
	return undefined;
}
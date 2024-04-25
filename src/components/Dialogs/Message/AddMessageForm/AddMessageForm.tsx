//Отрисовываем форму "ввода Message" (для "Dialogs.tsx") и при удачном Submit-е добавляет этот Message для "Dialogs.tsx"

import React from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import s from "../../../FormsControls/FormsControls.module.css";
import { AddMessageActionCreatorType } from "../../../../redux/dialogs-reducer";




const maxLength50 =  50;
//----------------------------------------------------------------------------------

//Какие данные собирает  форма(что вводит пользователь)

interface IAddMessageForm {
	newMessageText: string
}


interface IPropsAddMessageForm {		//Что передаем в ф-ию с формой(ф-цию-обработчик)
	addMessageActionCreator: AddMessageActionCreatorType
}



export function AddMessageForm (props: IPropsAddMessageForm	) {

	const { register, handleSubmit, formState: {errors}  } = useForm<IAddMessageForm>({
      defaultValues: {              //передаем дополнительные параметры
			newMessageText: ""
      }
   })


//  Submit----------------------------------------------------------------
	//Удачный Submit
	const submit : SubmitHandler<IAddMessageForm > = (formData) =>{
		props.addMessageActionCreator(formData.newMessageText);
	}
	

	//НЕ удачный Submit
	const error : SubmitErrorHandler<IAddMessageForm > = data =>{
	}
//----------------------------------------------------------------

	return (
		<>
			{/* Обработчик формы --------------------------------*/}
			{/* На входе Удачный и НЕ удачный Submit*/}
			<form onSubmit={handleSubmit(submit, error)}>   
				<div>
					<input type='textarea' {...register('newMessageText', {required: "Message is required", 
																					maxLength:  {value: maxLength50, message: `Message ${maxLength50} symbols`},
																					})} placeholder="Enter your message"/>
					{ errors.newMessageText && 
							<span className={s.formSummaryError}>{ errors.newMessageText?.message }</span>
					}
				</div>

				<div>
					<button>Send</button>
				</div>
			</form> 

		</>
	);
}

export default AddMessageForm;















import React from "react";
// import s from "./Message.module.css";
import { Field, reduxForm } from 'redux-form';
import { required} from '../../../../utils/Validators/validators';
import { Textarea} from '../../../FormsControls/FormsControls';
import { maxLengthCreator} from '../../../../utils/Validators/validators';



const maxLength50 =  maxLengthCreator(50);



export const AddMessageForm = (props) =>{
	return(
		<form onSubmit ={props.handleSubmit}>
			<div>
				<Field component={Textarea} 
						name={"newMessageText"} 
						validate={[ required, maxLength50]}
						placeholder={"Enter your message"}
				/>
			</div>

			<div>
				<button>Send</button>
			</div>
		</form>
	);
}

// export default AddMessageForm;
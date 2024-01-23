import React, {useState}  from 'react';
import { Field, reduxForm } from 'redux-form';
import { createForm, Element} from '../../FormsControls/FormsControls';



// Аналогично в Login.jsx
// Контейнеры : 4 connect(3 Login (2 LoginReduxForm (1 LoginForm)))

//Контейнеры :(3. profileInfo "on Submit (ф-ция saveProfile (formData из Redux))" (2. ProfileDataReduxForm "handleSubmit"(1. ProfileDataForm "сама форма")))

// 1. Осн. компонента с формой-------------------------------------------------------------------
const ProfileDataForm = ({handleSubmit}) =>{
	return <form onSubmit={handleSubmit}>
		<div><button onClick={()=>{}}>Save</button></div>
		<div>
			<b>Full name</b> : {createForm("Full name", "fullName", [], Element, "input")}
		</div>
		
			
		<div>
			<b>Looking for a job</b> : {createForm("", "lookingForAJob", [], Element, "input", {type: "checkbox"})}
		</div>	
		{
			<div>
				<b>My professional skills</b> : {createForm("My professional skills", "lookingForAJobDescription", [], Element, "textarea")}
			</div>
		}
		<div>
			<b>About me</b> : {createForm("About me", "aboutMe", [], Element, "textarea")}
		</div>
	</form>
}

// 2. Оборачиваем Осн. компоненту hoc-ом из Redux-form
// hoc с набжает к-ту "handleSubmit"-ом из  Redux-form  и уникальным именем форму---------------------------------
const ProfileDataReduxForm = reduxForm({ form: 'edit-profile' })(ProfileDataForm)



export default ProfileDataReduxForm;
//Меняет "Status" в "Profil"-е
//Используея внутренний "State" "Redux"-а

import React, {useState, useEffect, ChangeEvent} from 'react';

//import s from './ProfileStatus.module.css';


type PropsType = {  
	status: string
	updateStatus: (status: string)=>void
}





const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
	
	//В [0] сидит editMode, в [1] ф-ция, меняющая editMode
	let [editMode, setEditMode] = useState(false); //Дает LockalState в "editMode"  и ф-цию, которая его меняет "setEditMode"
	let [status, setStatus] = useState(props.status);

	useEffect (() =>{
		setStatus(props.status);
		}, [props.status]
	);

	const activateEditMode = () =>{
	setEditMode(true);
	}

	const deactivateEditMode = () =>{
		setEditMode(false);

		// отправляем status на сервак
		props.updateStatus(status);
		}
	

	//"(e: ChangeEvent<HTMLInputElement>)" - стандартная из 'react'-а
	const onStatusChange = (e: ChangeEvent<HTMLInputElement>) =>{
		setStatus(e.currentTarget.value);
		}
	




		return (
			<div> 
				{!editMode &&
					<div>
						<b>Status : </b>
						<span onDoubleClick={activateEditMode}>{props.status || "----------"}</span>
					</div>			
				}


				{editMode &&
					<div>
						<input  onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}
						/>
					</div>			
				}

			</div>
		); 
	
}
export default ProfileStatusWithHooks;
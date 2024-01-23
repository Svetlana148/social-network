import React, {useState, useEffect} from 'react';

//import s from './ProfileStatus.module.css';



const ProfileStatusWithHooks = (props) => {
	
	//В [0] сидит editMode, в [1] ф-ция, меняющая editMode
	let [editMode, setEditMode] = useState(false);
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
	


	const onStatusChange = (e) =>{
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
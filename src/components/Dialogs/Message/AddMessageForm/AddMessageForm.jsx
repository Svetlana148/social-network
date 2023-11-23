import React from "react";
import s from "./Message.module.css";

const AddMessageForm=(props)=>{

	return(
		<div>
			<div className="message">
				{props.message}
			</div>

			
		</div>

	)
}



export default AddMessageForm;
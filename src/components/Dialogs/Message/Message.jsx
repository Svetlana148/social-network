import React from "react";
import s from "./Message.module.css";




const Message=(props)=>{
	return(
		<div className="message">
			{props.message}
			<div>
				<textarea></textarea>
			</div>

			<div>
				<button onClick={()=>{alert('Hello')}}>Send</button>
			</div>
		</div>

	)
}



export default Message;
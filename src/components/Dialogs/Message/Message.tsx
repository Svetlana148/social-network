//Отрисовываем сообщения

import React from "react";
// import s from "./Message.module.css";


//Типизация для "Message"-а
export type PropsType = {
	message: string
}


const Message:React.FC<PropsType>=(props)=>{

	return(
		<div>
			<div className="message">
				{props.message}
			</div>
		</div>
	)
}
export default Message;
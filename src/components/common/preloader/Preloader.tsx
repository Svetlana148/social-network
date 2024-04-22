//Крутилка для показа пока что-то грузится

import React from 'react';
import preloaderImg from '../../../img/preloader.gif';

//Типизация для "Preloader"-а
export type PropsType = {
}

let Preloader: React.FC<PropsType> = (props)=>{
	return(
	<div style = {{backgroundColor : 'white'}}>
	<img src={preloaderImg} alt=''/>
	</div>
	)
};

export default Preloader;
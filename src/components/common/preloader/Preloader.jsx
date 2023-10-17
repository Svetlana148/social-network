import React from 'react';
import preloaderImg from '../../../img/preloader.gif';

let Preloader = (props)=>{
	return(
	<div style = {{backgroundColor : 'white'}}>
	<img src={preloaderImg} alt=''/>
	</div>
	)
};

export default Preloader;
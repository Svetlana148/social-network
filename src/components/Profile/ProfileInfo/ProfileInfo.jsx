import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
	return (
		<div>
			<div className={s.img1}>
				<img src='https://img.freepik.com/free-photo/tropical-beach_74190-188.jpg' alt='' />
			</div>			


			<div className={s.discription}> ava  discription</div>
		</div>
	); 
}
export default ProfileInfo;
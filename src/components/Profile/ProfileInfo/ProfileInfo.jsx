import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/Preloader';
import ProfileStatus from './ProfileStatus';


const ProfileInfo = (props) => {

	if (!props.profile){
		return <Preloader />
	}

	return (
		<div>
			<div className={s.img1}>
				<img src='https://img.freepik.com/free-photo/tropical-beach_74190-188.jpg' alt='' />
			</div>			


			<div className={s.discription}> 
				<img src={props.profile.photos.large} alt='' />
				<ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
			</div>
		</div>
	); 
}
export default ProfileInfo;
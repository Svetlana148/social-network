import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/Preloader';
// import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks.jsx';
import userPhoto from '../../../assets/img/User.png';



const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {

	if (!profile){
		return <Preloader />
	}

	const onMainPhotoSelected = (e)=>{
		if (e.target.files.length){
			savePhoto(e.target.files[0]);
		}
	}

	return (
		<div>
			<div className={s.img1}>
				<img src='https://img.freepik.com/free-photo/tropical-beach_74190-188.jpg' alt='' />
			</div>			


			<div className={s.discription}> 
			{/* avatar eingestellt wird*/}
				<img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt='' />

				{/* Если ты владелец этого профайла, то показать кнопку для выбора фотки */}
				{isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
				
				<ProfileStatusWithHooks status={status} updateStatus={updateStatus }/>
				
			</div>
		</div>
	); 
}
export default ProfileInfo;
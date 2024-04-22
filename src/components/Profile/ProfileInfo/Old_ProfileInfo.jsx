import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileDataForm from './ProfileDataForm';
import ProfileStatusWithHooks from './ProfileStatusWithHooks.jsx';
import userPhoto from '../../../assets/img/User.png';






const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

	let [editMode, setEditMode] = useState(false); //Дает LockalState в "editMode"  и ф-цию, которая его меняет "setEditMode"

	if (!profile) {
		return <Preloader />
	}

	const onMainPhotoSelected = (e) => {
		if (e.target.files.length) {
			savePhoto(e.target.files[0]);
		}
	}

	// then ф-ция только для того, чтобы выключать EditMode 
	// только когда все сохранилось на сервер, т.е. не было ошибок
	// к этому в profile-reducer.js надо дописать Promise.reject (response.data.messages[0]);
	const onSubmit = (formData) => {
		saveProfile(formData).then(
			() => { setEditMode(false); }
		);
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
				{isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}



				{/* Если Edit Mode, то показать форму для изменения профиля */}
				{editMode ?
					<ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} /> :
					<ProfileData goToEditMode={() => { setEditMode(true) }} profile={profile} isOwner={isOwner} />}



				<ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
			</div>
		</div>
	);
}


{/* Inf about My Profile ----------------------*/ }
const ProfileData = ({ profile, isOwner, goToEditMode }) => {
	return <div>
		{isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
		<div>
			<b>Full name</b> : {profile.fullName}
		</div>
		<div>
			<b>Looking for a job</b> : {profile.lookingForAJob ? "yes" : "no"}
		</div>
		{/* {profile.lookingForAJob &&
			<div>
				<b>My professional skills</b> : {profile.lookingForAJobDescription}
			</div>
		} */}

		<div>
			<b>My professional skills</b> : {profile.lookingForAJobDescription}
		</div>
		<div>
			<b>About me</b> : {profile.aboutMe}
		</div>
		<div>

			{/* Object.keys пробегает по массиву (*) и делает из него массив строк
			далее полученный массив пробегаем map-ом
			contactValue = {profile.contacts[key]   читаем значение св-ва с этим ключом */}
			<b>Contacts</b> : {Object.keys(profile.contacts).map(key => {
				return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
			})}
		</div>
	</div>
}





const Contact = ({ contactTitle, contactValue }) => {
	return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}


export default ProfileInfo;
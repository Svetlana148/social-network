import React from 'react';
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { ProfileType } from '../../types/types';
// import Post from './MyPosts/Post/Post'


type PropsType = {  //Из  "ProfileInfo.tsx"
	profile : ProfileType | null
	status : string
	updateStatus : (status : string)=>void
	isOwner : boolean
	savePhoto : (file : File)=>void
	saveProfile : (formData:ProfileType)=>Promise<any>
}

const Profile: React.FC<PropsType> = (props) => {

	return (
		<div>
			<ProfileInfo 
			savePhoto = {props.savePhoto}
			isOwner = {props.isOwner} 
			profile = {props.profile} 
			status = {props.status}
			updateStatus = {props.updateStatus}
			saveProfile = {props.saveProfile}
			/> 
			<MyPostsContainer/>

		</div>
	);
}
export default Profile;
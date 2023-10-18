import React from 'react';
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer.jsx';
import ProfileInfo from './ProfileInfo/ProfileInfo.jsx';
// import Post from './MyPosts/Post/Post.jsx'


const Profile = (props) => {

	return (
		<div>
			<ProfileInfo profile = {props.profile}/>
			<MyPostsContainer store = {props.store}/>

		</div>
	);
}
export default Profile;
import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts.jsx';
import ProfileInfo from './ProfileInfo/ProfileInfo.jsx';
import Post from './MyPosts/Post/Post.jsx'


const Profile = () => {


	let postsData = [
		{ id: 1, message: 'Mope', likesCount: '1' },
		{ id: 2, message: 'Hjiolpoiu', likesCount: '23' },
		{ id: 3, message: '12342345', likesCount: '78' },
	]
	



	return (
		<div>
			<ProfileInfo />
			<MyPosts postsData = {postsData} />

		</div>
	);
}
export default Profile;
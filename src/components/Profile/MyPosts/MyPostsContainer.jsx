import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';



const MyPostsContainer = (props) => {

	let state = props.store.getState();

// onChange-----------------------------------------
	let onPostChange = (text)=>{
		let action = updateNewPostTextActionCreator(text); // делаем action
		props.store.dispatch(action)                             // dispatch - обрабатываем
	} 
// addPost-----------------------------------------
	let addPost = ()=>{
		props.store.dispatch(addPostActionCreator());           // делаем action  и обрабатываем
	}
// -----------------------------------------

	return (
		<MyPosts updateNewPostText = {onPostChange} addPost={addPost} postsData = {state.profilePage.postsData} newPostText = {state.profilePage.newPostText}/>
	)

}
export default MyPostsContainer;
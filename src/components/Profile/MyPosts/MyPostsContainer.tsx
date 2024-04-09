import React from 'react';
import {actions} from '../../../redux/profile-reducer';
import MyPosts, { DispatchPropsType, MapsPropsType } from './MyPosts';
import {connect} from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';






let mapStateToProps = (state: AppStateType)=>{
	return {
		postsData : state.profilePage.postsData,
		// newPostText : state.profilePage.newPostText,
	}
};

// типы для connect-а  :  TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState-основной глоб.State 
const MyPostsContainer = connect<MapsPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, 
																												{addPost: actions.addPostActionCreator})(MyPosts)
																												// {addPost - св-во : actions.addPostActionCreator - значение}

export default MyPostsContainer;
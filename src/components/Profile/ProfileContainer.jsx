import React from 'react';
// import s from './Profile.module.css';
// import MyPostsContainer from './MyPosts/MyPostsContainer.jsx';
import Profile from './Profile.jsx';
import axios from 'axios';
import {connect} from 'react-redux';
import {setUserProfile} from '../../redux/profile-reducer.js';




class ProfileContainer extends React.Component{

	componentDidMount(){
		axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
		.then (responce =>{
			this.props.setUserProfile(responce.data);
			});
	}

	render(){
		return (
			<div>
				<Profile {...this.props} profile = {this.props.profile} />
			</div>
		);
	}
}


let mapStateToProps = (state)=>({
	profile : state.profilePage.profile
});

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);
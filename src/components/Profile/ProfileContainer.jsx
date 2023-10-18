import React from 'react';
// import s from './Profile.module.css';
// import MyPostsContainer from './MyPosts/MyPostsContainer.jsx';
import Profile from './Profile.jsx';
import axios from 'axios';
import {connect} from 'react-redux';
import {setUserProfile} from '../../redux/profile-reducer.js';
// import {withRouter} from 'react-router-dom';
import { useParams } from 'react-router-dom'; 




export function withRouter(Children){
	return(props)=>{

		const match  = {params: useParams()};
		return <Children {...props}  match = {match}/>
	}
}







class ProfileContainer extends React.Component{

	componentDidMount(){
		debugger
		
		let userId = this.props.match.params.userId;
		axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+ userId)
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

let WithUrlDataContainerComponent = withRouter(ProfileContainer);




let mapStateToProps = (state)=>({
	profile : state.profilePage.profile
});

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);
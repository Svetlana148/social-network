import React from 'react';
// import s from './Profile.module.css';
// import MyPostsContainer from './MyPosts/MyPostsContainer.jsx';
import Profile from './Profile.jsx';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUserProfile} from '../../redux/profile-reducer.js';
import {Navigate} from 'react-router-dom';
import { useParams } from 'react-router-dom'; 
import {withAuthRedirect} from '../hok/withAuthRedirect.js';
import { compose } from 'redux';



export function withRouter(Children){
	return(props)=>{

		const match  = {params: useParams()};
		return <Children {...props}  match = {match}/>
	}
}







class ProfileContainer extends React.Component{

	componentDidMount(){

		
		let userId = this.props.match.params.userId;
		if (!userId){
			userId=2;
		}
		
		this.props.getUserProfile(userId);
	}

	render(){
		

		return (
			<div>
				<Profile {...this.props} profile = {this.props.profile} />
			</div>
		);
	}
}

// HOK---------------------------------------------------
//let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

// ---------------------------------------------------

//let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);


let mapStateToProps = (state)=>({
	profile : state.profilePage.profile,
	
});

//export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);

export default compose(
	connect(mapStateToProps, {getUserProfile}),
	withRouter,
	withAuthRedirect
)(ProfileContainer);
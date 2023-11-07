import React from 'react';
// import s from './Profile.module.css';
// import axios from 'axios';
// import {Navigate} from 'react-router-dom';
// import {withAuthRedirect} from '../hok/withAuthRedirect.js';

import Profile from './Profile.jsx';
import {connect} from 'react-redux';
import {getUserProfile, getStatus, updateStatus} from '../../redux/profile-reducer.js';
import { useParams } from 'react-router-dom'; 
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
			userId=30195;
		}
		
		this.props.getUserProfile(userId);
		this.props.getStatus(userId);
	}


	render(){
		return (
			<div>
				<Profile {...this.props} profile = {this.props.profile} status = {this.props.status} updateStatus = {this.props.updateStatus}/>
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
	status : state.profilePage.status,
	
});

//export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);

export default compose(
	connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
	withRouter,
	//withAuthRedirect
)(ProfileContainer);
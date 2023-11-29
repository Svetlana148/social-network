import React from 'react';
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
			userId=this.props.authorizedUserId;
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


let mapStateToProps = (state)=>({
	profile : state.profilePage.profile,
	status : state.profilePage.status,
	authorizedUserId : state.auth.userId,
	isAuth : state.auth.isAuth
	
});

//export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);

export default compose(
	connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
	withRouter,
)(ProfileContainer);
import React from 'react';
import Profile from './Profile.jsx';
import {connect} from 'react-redux';
import {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile} from '../../redux/profile-reducer';
// import { useParams } from 'react-router-dom'; 
import { compose } from 'redux';
import {  useLocation, useNavigate, useParams } from "react-router-dom";
 import { useEffect } from "react";




// export function withRouter(Children){
// 	return(props)=>{

// 		const match  = {params: useParams()};
// 		return <Children {...props}  match = {match}/>
// 	}
// }



class ProfileContainer extends React.Component{

	refreshProfile(){
		// match мы получаем из withRouter
		let userId = this.props.match.params.userId;
		// Если нету userId
		if (!userId){
			// тогда берем userId из автризации
			userId=this.props.authorizedUserId;
			// если и в авторизации нету userId тогда логинимся
			if (!userId){
				this.props.history.push("/Login")
			}
		}
		this.props.getUserProfile(userId);
		this.props.getStatus(userId);
	}


	componentDidMount(){
		this.refreshProfile()
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		// если пришли новые params
		if (this.props.match.params.userId != prevProps.match.params.userId){
			this.refreshProfile()
		}
	}


	render(){
		return (
			<div>
				{/* Если нету userId, то это наш профайл и я владелец */}
				<Profile {...this.props} 				
				isOwner = {!this.props.match.params.userId} 
				profile = {this.props.profile} 
				status = {this.props.status} 
				updateStatus = {this.props.updateStatus}
				savePhoto = {this.props.savePhoto}
				saveProfile ={this.props.saveProfile}
				/>
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



function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();

		useEffect(() => {
		if (!props.isAuth) {
			navigate("/login");
		}
		}, [props.isAuth, navigate]);

		const match  = {params: useParams()};

		return (
			<Component
			{...props}
			router={{ location, navigate, params }} 
			match = {match}
			/>
		);
	}

	return ComponentWithRouterProp;
	}



// compose применяет к к-те последовательно разные HOC (High_Order_Component)// HOC - ф-ция, кот. принимает 1 к-ту, а возвращает контейнерную к-ту над входящей, стобы дать первой к-те какие-то данные
// HOC - ф-ция, кот. принимает 1 к-ту, а возвращает контейнерную к-ту над входящей, стобы дать первой к-те какие-то данные
export default compose(
	connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
	withRouter,
)(ProfileContainer);
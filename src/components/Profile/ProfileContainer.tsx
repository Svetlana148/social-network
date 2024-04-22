//Контейнер для снабжения к-ты "Profile"-а данными

import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile} from '../../redux/profile-reducer'
import { compose } from 'redux';
import { NavigateFunction, useLocation, useNavigate, useParams  } from "react-router-dom";
import { useEffect } from "react";
import { AppStateType } from '../../redux/redux-store.js';
import { ProfileType } from '../../types/types';


// Контейнеры : (2 compose (1 ProfileContainer))
// 2 compose снабжает (1 ProfileContainer)) чем: 	
//			из "State"-а : 			profile, status, authorizedUserId, isAuth
//			ф-циями  callback-ами:	"{getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}"
//			навигацией:					"withRouter-ом"



//Типизируем "ProfileContainer". Для этого типизируем составляющие:-----------------------------------------------------------
//Типизируем "mapStateToProps"
type MapPropsType = ReturnType<typeof mapStateToProps> //Говорит, сто так делать не надо для "MapPropsType"

//Типизируем "mapDispatchToProps"
type DispatchPropsType = {
	getUserProfile: (userId: number)=>void
	getStatus: (userId: number)=>void
	updateStatus: (status: string)=>void
	savePhoto: (file : File)=>void
	saveProfile: (profile : ProfileType)=>Promise<any>
}


//Типизация для "WithRouter"-а
type PathParamsType = {
	userId: string,
	navigate: NavigateFunction
}

// Your component own properties
// type PropsType = RouteComponentProps<PathParamsType> & {
// 	someString: string,
// }
//-----------------------------------------------------------------------------------------------
type PropsType = MapPropsType & DispatchPropsType & PathParamsType




class ProfileContainer extends React.Component<PropsType>{

	refreshProfile(){


		
		// match мы получаем из withRouter
		let userId: number | null = +this.props.userId;
		// Если нету userId
		if (!userId){
			// тогда берем userId из автризации
			userId=this.props.authorizedUserId;
			// если и в авторизации нету userId тогда логинимся
			if (!userId){
				this.props.navigate("/Login")
			}
		}

		if (!userId){
			console.error("UserId should exist")
		} else{
		this.props.getUserProfile(userId);	//Запрос на получение профайла какого-то User-а
		this.props.getStatus(userId);
		}
	}


	componentDidMount(){
		this.refreshProfile()
	}

	componentDidUpdate(prevProps: PropsType, prevState: PropsType){
		// если пришли новые params
		if (this.props.userId !== prevProps.userId){
			this.refreshProfile()
		}
	}


	render(){
		return (
			<div>
				{/* Если нету userId, то это наш профайл и я владелец */}
				<Profile {...this.props} 				
				isOwner = {!this.props.userId} 
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


let mapStateToProps = (state: AppStateType)=>({
	profile : state.profilePage.profile,
	status : state.profilePage.status,
	authorizedUserId : state.auth.userId,
	isAuth : state.auth.isAuth
	
});


//Ф-ция, создающая обрачиваЮЩУЮ к-ту
function withRouter<WCP extends MapPropsType&DispatchPropsType> (WrappedComponent: React.ComponentType<WCP>) { //"WrappedComponent" - обораЧИВАЕМАЯ к-та
	
	//ОборачиваЮЩАЯ к-та, дает оборачивАЕМОЙ к-те: "location", "navigate", "params"  + "userId ", "navigate"
	function ComponentWithRouterProp(props: MapPropsType & DispatchPropsType) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();

		useEffect(() => {
		if (!props.isAuth) {
			navigate("/login");
		}
		}, [props.isAuth, navigate]);

		const match  = {params: useParams()};
		let userId = match.params.userId;

		return (
			<WrappedComponent
			{...props as WCP}
			router={{ location, navigate, params }} 
			userId = {userId}
			navigate = {navigate}
			/>
		);
	}

	return ComponentWithRouterProp;
	}



// compose применяет к к-те последовательно разные HOC (High_Order_Component)// HOC - ф-ция, кот. принимает 1 к-ту, а возвращает контейнерную к-ту над входящей, стобы дать первой к-те какие-то данные
// HOC - ф-ция, кот. принимает 1 к-ту, а возвращает контейнерную к-ту над входящей, стобы дать первой к-те какие-то данные
export default compose<React.ComponentType>(
	connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
	withRouter,
)(ProfileContainer);
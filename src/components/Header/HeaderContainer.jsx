import React from 'react';
import Header from './Header';

import {getAuthUserData, toggleIsFetching} from '../../redux/auth-reducer';
import axios from 'axios';
import {connect} from 'react-redux';
import Preloader from '../common/preloader/Preloader.jsx';






class HeaderContainer extends React.Component {


	componentDidMount(){

		this.props.getAuthUserData();

		// this.props.toggleIsFetching(true);
		// authAPI.me().then (responce =>{
		// 	// this.props.toggleIsFetching(false)
		// 		if (responce.data.resultCode === 0){
		// 			let {id, email, login} = responce.data.data;
		// 			this.props.setAuthUsersData(id, email, login);
		// 		}
		// });
	}

	
	render(){

		return <>
			{this.props.isFetching ? <Preloader /> : null}
			<Header {...this.props}	/>
		</>
	}
}

let mapStateToProps = (state)=>{
	return{
		isAuth : state.auth.isAuth,
		login : state.auth.login,
	}
}

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);
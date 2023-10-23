import React from 'react';
import Header from './Header';

import {setAuthUsersData, toggleIsFetching} from '../../redux/auth-reducer';
import axios from 'axios';
import {connect} from 'react-redux';
import Preloader from '../common/preloader/Preloader.jsx';





class HeaderContainer extends React.Component {


	componentDidMount(){
		// this.props.toggleIsFetching(true);
		axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, 
							{withCredentials : true})
		.then (responce =>{
			// this.props.toggleIsFetching(false);
			if (responce.data.resultCode === 0){
				let {id, email, login} = responce.data.data;
				this.props.setAuthUsersData(id, email, login);}
			});
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
		
	}
}

export default connect(mapStateToProps, {setAuthUsersData})(HeaderContainer);
import React from 'react';
import Header from './Header';

import { logout, toggleIsFetching } from '../../redux/auth-reducer';
import axios from 'axios';
import { connect } from 'react-redux';
import Preloader from '../common/Preloader/Preloader.jsx';






class HeaderContainer extends React.Component {

	// Перенесли в APP.js
	// componentDidMount(){
	// 	this.props.getAuthUserData();
	// }


	render() {

		return <>
			{this.props.isFetching ? <Preloader /> : null}
			<Header {...this.props} />
		</>
	}
}

let mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth,
		login: state.auth.login,
	}
}

export default connect(mapStateToProps, { logout })(HeaderContainer);
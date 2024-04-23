
import React from 'react';
import Header, { PropsType } from './Header';
import { logout } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';

// Контейнеры : (2  connect (1 HeaderContainer))
// 2 connect снабжает (1 HeaderContainer)) чем: 	
//			из "State"-а : 			isAuth
//			ф-циями  callback-ами:	"login", "{logout}"



class HeaderContainer extends React.Component<PropsType> {

	render() {

		return <>
			{/* {this.props.isFetching ? <Preloader /> : null} */}
			<Header {...this.props} />
		</>
	}
}

let mapStateToProps = (state:AppStateType) => {
	return {
		isAuth: state.auth.isAuth,
		login: state.auth.login,
	}
}

export default connect(mapStateToProps, { logout })(HeaderContainer);
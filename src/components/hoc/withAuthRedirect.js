import React from "react";
import { Navigate } from "react-router-dom";
import {connect} from 'react-redux';




let mapStateToPropsForRedirect = (state)=>({
	isAuth : state.auth.isAuth
});




// Перенаправляет при Login-е
export const withAuthRedirect = (Component)=>{
	// check Login ---------------------------------
	class RedirectComponent extends React.Component{
		render() {
			if (!this.props.isAuth) return <Navigate to={("/Login")}/>
			return <Component {...this.props} />
		}
	}
	// provide pice of State ------------------------------------------------------------
	let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);


	return ConnectedAuthRedirectComponent;
}



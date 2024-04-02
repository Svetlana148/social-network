// Если не залогинены, то в этом HOC ПЕРЕНАПРАВЛЯЕМ на Login
import React from "react";
import { Navigate } from "react-router-dom";
import {connect} from 'react-redux';
import { AppStateType } from "../../redux/redux-store";




let mapStateToPropsForRedirect = (state: AppStateType)=>({
	isAuth : state.auth.isAuth
});

type MapPropsType = {
	isAuth : boolean
}
type DispatchPropsType = {
}


// Перенаправляет при Login-е
// Оборачиваем передаваемую К-ту Redirect-ом
//с наполнением-props-ами-"WCP"

export function withAuthRedirect<WCP extends {}> (WrappedComponent: React.ComponentType<WCP>){
	// check Login ---------------------------------
	const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
		let {isAuth, ...restProps} = props   //Забираем из props-ов "isAuth"

			if (!isAuth) return <Navigate to={("/Login")}/>
			return <WrappedComponent {...restProps as WCP} />
	}
	// provide pice of State ------------------------------------------------------------
	let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);


	return ConnectedAuthRedirectComponent;
}



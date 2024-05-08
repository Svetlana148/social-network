import React from 'react';
// import s from './Users.module.css';
import {Users} from './Users';
import { useSelector } from 'react-redux';
import Preloader from '../common/Preloader/Preloader';
import { getIsFetching } from '../../redux/users-selectors';


type usersPagePropsType = {
	pageTitle: string
}

const UsersPage : React.FC<usersPagePropsType> = (props) =>{

	const isFetching = useSelector(getIsFetching)

	return <>
			<h2>{props.pageTitle}</h2>
			{isFetching ? <Preloader /> : null}
			<Users />
		</>
}

export default UsersPage;
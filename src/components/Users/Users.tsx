import React, {FC} from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User.jsx';
import { UserType } from '../../types/types';
// import styles from './Users.module.css';
// import userPhoto from '../../img/User.png';
// import {NavLink} from  'react-router-dom';
// import {usersAPI} from '../api/api.js';



//Типизируем Props-сы к-ты Users
type PropsType ={
	totalUsersCount : number
	pageSize : number
	currentPage : number
	//Ф-ция, кот. не принимает ничего и возвращает  void. Это callback
	onPageChanged : (pageNumber : number)=>void 
	users : Array<UserType> 
	followingInProgress : Array<number>
	follow : ()=>void 
	unfollow : ()=>void 

	
}

// Users  : React.FC<PropsType>  or     Users  : FC<PropsType> & import React, {FC} from 'react';
let Users : FC<PropsType> = ({totalUsersCount, 
									pageSize, 
									currentPage, 
									onPageChanged, 
									users, 
									...props})=>{
return (
		<div>
			{/* Вызываем компоненту с постраничным выводом объектов группой	по pageSize штук-------------------------------- */}
			<Paginator totalItemsCount={totalUsersCount} 
							pageSize={pageSize} currentPage={currentPage}
							onPageChanged={onPageChanged}/>
				

			<div>

				{users.map(u => <User user={u}
											followingInProgress = {props.followingInProgress}
											key={u.id}
											follow={props.follow}
											unfollow={props.unfollow}
											/>	
					)
				}	
			</div>		
		</div>
	);
};


export default Users;

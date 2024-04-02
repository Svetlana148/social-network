import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../img/User.png';
import {NavLink} from  'react-router-dom';
// import Paginator from '../common/Paginator/Paginator';
// import {usersAPI} from '../api/users-api';
import { UserType } from '../../types/types';

//Типизируем "props-ы" для к-ты "User"
type PropsType = {
	user: UserType
	followingInProgress:  Array<number>
	follow : (userId: number) => void
	unfollow : (userId: number) => void
}

let User: React.FC<PropsType> = ({user, followingInProgress, follow, unfollow})=>{

return (
	<div>
		<span>
			<div>
				<NavLink to = {'/profile/' +user.id}>
				{/* userPhoto - заглушка */}
					<img src={user.photos.small !=null ? user.photos.small : userPhoto} className={styles.usersPhoto} alt="" />
				</NavLink>
			</div>
			<div>

				{/* ----------------------------------------------------------- */}

				{user.followed 
				
				? <button disabled={followingInProgress.some(id => id === user.id)} 
								onClick={()=>{unfollow(user.id);
										// props.toggleFollowingProgress (true, u.id);
					// usersAPI.follow (user.id)
												
				}}>


				unfollow</button> 
				: <button disabled={followingInProgress.some(id => id === user.id)} onClick={()=>{follow(user.id);
					// props.toggleFollowingProgress (true, user.id);
					// usersAPI.unfollow (user.id)

					}}>
					follow</button>
				}
			</div>
		</span>

		<span>
			<span>
				<div>{user.name}</div>
				<div>{user.status}</div>
			</span>
			<span>
				<div>{"user.location.country"}</div>
				<div>{"user.location.city"}</div>
			</span>
		</span>
	</div>
	)
};

export default User;
